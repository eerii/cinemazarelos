use std::time::Duration;

use axum::{
    extract::{Form, MatchedPath, Request, State},
    response::Html,
    routing::{get, post},
    Router,
};
use dotenvy_macro::dotenv;
use serde::Deserialize;
use tower_http::{timeout::TimeoutLayer, trace::TraceLayer};

use self::analytics::Analytics;
use crate::{db::RepoPeliculas, SharedState};

mod analytics;
mod blog;
mod novidades;
mod paxinas;
mod peliculas;

// Poderíamos utilizar github como CDN para assets (posters e imaxes)
// Isto permite non ter que facer un build se só se engaden assets
pub const GITHUB_CDN: bool = false;
pub const CDN_URL: &str = if cfg!(debug_assertions) || !GITHUB_CDN {
    "/assets"
} else {
    "https://raw.githubusercontent.com/eerii/cinemazarelos/main/assets"
};

// ·······
// Routers
// ·······

pub fn router() -> Router {
    let state = SharedState::default();

    // TODO: 404 gatetes

    let api = Router::new()
        .route("/ping", get(noop))
        .route("/clear/cache", get(clear_cache))
        .route(
            "/subscribe/email",
            post(registrar_correo),
        )
        .route(
            "/peliculas/carrousel",
            get(peliculas::carrousel),
        )
        .route(
            "/peliculas/calendario",
            get(peliculas::calendario),
        )
        .route(
            "/peliculas/lista",
            get(peliculas::lista),
        )
        .route("/novidades", get(novidades::novidades))
        .with_state(state.clone());

    Router::new()
        .route("/", get(paxinas::inicio))
        .route("/sobre_nos", get(paxinas::sobre_nos))
        .route(
            "/cine_barato",
            get(paxinas::cine_barato),
        )
        .route("/peliculas", get(paxinas::peliculas))
        .route(
            "/peliculas/:pelicula",
            get(peliculas::detalles_pelicula),
        )
        .route("/blog", get(blog::lista_blog))
        .route(
            "/blog/:articulo",
            get(blog::artigo_blog),
        )
        .nest("/api", api)
        .with_state(state)
        .layer((
            TraceLayer::new_for_http()
                .make_span_with(|req: &Request| {
                    let method = req.method();
                    let uri = req.uri();

                    let matched_path = req
                        .extensions()
                        .get::<MatchedPath>()
                        .map(|matched_path| matched_path.as_str());

                    tracing::debug_span!("request", %method, %uri, matched_path)
                })
                .on_failure(()),
            TimeoutLayer::new(Duration::from_secs(10)),
            Analytics::new(dotenv!("API_ANALYTICS").into()),
        ))
}

// ···············
// Funcións soltas
// ···············

// Non fai nada
async fn noop() {}

// Limpa o caché da base de datos
async fn clear_cache(State(state): State<SharedState>) {
    let mut state = state.write().await;
    state.db.clear_cache().await;
}

// Rexistrar o correo electrónico
#[derive(Deserialize, Debug)]
struct InputCorreo {
    email: String,
}

async fn registrar_correo(
    State(state): State<SharedState>,
    Form(input): Form<InputCorreo>,
) -> Html<String> {
    let email = input.email;

    // TODO: Mejor verificación
    if email.is_empty() {
        return Html("O correo está vacío".into());
    }

    if !email.contains('@') {
        return Html("O correo debe conter un '@'".into());
    }

    let mut state = state.write().await;
    match state.db.insert_email(email).await {
        Ok(_) => Html("Correo rexistrado".into()),
        Err(e) => match e {
            sqlx::Error::Database(e) if e.is_unique_violation() => {
                Html("O correo xa está rexistrado".into())
            },
            _ => Html(format!(
                "Error desconocido ó rexistrar o correo: {}",
                e
            )),
        },
    }
}

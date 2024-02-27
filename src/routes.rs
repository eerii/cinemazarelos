use std::time::Duration;

use axum::{
    extract::{MatchedPath, Request, State},
    routing::get,
    Router,
};
use dotenvy_macro::dotenv;
use tower_http::{timeout::TimeoutLayer, trace::TraceLayer};

use self::analytics::Analytics;
use crate::{db::RepoPeliculas, SharedState};

mod analytics;
mod blog;
mod novidades;
mod paxinas;
mod peliculas;

// Utilizamos github como CDN para assets (posters e imaxes)
// Isto permite non ter que facer un build se só se engaden assets
pub const CDN_URL: &str = if cfg!(debug_assertions) {
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
        .route("/peliculas", get(paxinas::peliculas))
        .route("/blog", get(blog::lista_blog))
        .route(
            "/blog/:articulo",
            get(blog::artigo_blog),
        )
        .nest("/api", api)
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
pub async fn noop() {}

// Limpa o caché da base de datos
pub async fn clear_cache(State(state): State<SharedState>) {
    let mut state = state.write().await;
    state.db.clear_cache().await;
}

// TODO: Suscribirse por correo (usar debouncer para non sobrecargar bd)

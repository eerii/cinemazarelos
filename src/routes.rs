use axum::{extract::State, routing::get, Router};

use crate::{db::RepoPeliculas, SharedState};

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
        .route("/blog/:articulo", get(blog::blog))
        .nest("/api", api)
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

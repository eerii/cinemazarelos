use axum::{
    extract::State,
    routing::{get, put},
    Router,
};

use crate::{db::RepoPeliculas, SharedState};

mod novidades;
mod paxinas;
mod peliculas;

// Para a páxina web de producción utilizamos github como CDN para non pagar a
// bandwidth do servidor. Se só usamos imaxes pequenas poderíamos plantealo
// deixalo como local tamén en producción.
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
        .route("/clear/cache", put(clear_cache))
        .route(
            "/peliculas/carrousel",
            get(peliculas::carrousel),
        )
        .route(
            "/peliculas/calendario",
            get(peliculas::calendario),
        )
        .route("/novidades", get(novidades::novidades))
        .with_state(state.clone());

    Router::new()
        .route("/", get(paxinas::inicio))
        .route("/sobre_nos", get(paxinas::sobre_nos))
        .nest("/api", api)
}

// ···············
// Funcións soltas
// ···············

// Limpa o caché da base de datos
pub async fn clear_cache(State(state): State<SharedState>) {
    let mut state = state.write().await;
    state.db.clear_cache().await;
}

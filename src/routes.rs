use axum::{
    extract::State,
    routing::{get, put},
    Router,
};

use crate::{db::RepoPeliculas, SharedState};

pub mod paxinas;
pub mod peliculas;

// ·······
// Routers
// ·······

pub fn router() -> Router {
    let state = SharedState::default();

    let api = Router::new()
        .route("/clear/cache", put(clear_cache))
        .route("/peliculas", get(peliculas::peliculas))
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

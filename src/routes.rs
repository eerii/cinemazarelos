use axum::{
    extract::State,
    routing::{get, put},
    Router,
};

use crate::{db::RepoPeliculas, SharedState};

pub mod inicio;
pub mod peliculas;

// ·······
// Routers
// ·······

pub fn router() -> Router {
    let state = SharedState::default();

    let api = Router::new()
        .route("/clear/cache", put(clear_cache))
        .with_state(state.clone());

    Router::new()
        .route("/", get(inicio::inicio))
        .route("/peliculas", get(peliculas::peliculas))
        .nest("/api", api)
        .with_state(state) // TODO: Borrar esto ó mover peliculas
}

// ···············
// Funcións soltas
// ···············

// Limpa o caché da base de datos
pub async fn clear_cache(State(state): State<SharedState>) {
    let mut state = state.write().await;
    state.db.clear_cache().await;
}

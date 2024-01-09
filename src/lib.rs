use std::sync::Arc;

use db::Conexion;
use tokio::sync::RwLock;

mod db;
pub mod routes;

// TODO: Xestión de errores decente

// State

#[derive(Default)]
pub struct AppState {
    pub db: Conexion,
}

#[derive(Clone, Default)]
pub struct SharedState(Arc<RwLock<AppState>>);

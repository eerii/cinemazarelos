use std::sync::Arc;

use db::Conexion;
use tokio::sync::RwLock;
use tracing_subscriber::{fmt::time::OffsetTime, layer::SubscriberExt, util::SubscriberInitExt};

mod db;
pub mod routes;

// TODO: Xestión de errores decente (anyhow)

// State

#[derive(Default)]
pub struct AppState {
    pub db: Conexion,
}

pub type SharedState = Arc<RwLock<AppState>>;

// Logs

pub fn init_tracing() {
    let timer = time::format_description::parse("[hour]:[minute]:[second]").unwrap_or_default();
    let offset = time::UtcOffset::current_local_offset().unwrap_or(time::UtcOffset::UTC);
    let timer = OffsetTime::new(offset, timer);

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "cinemazarelos=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer().compact().with_timer(timer))
        .init();
}

use std::{fmt::Display, str::FromStr, sync::Arc};

use db::Conexion;
use serde::{de, Deserialize, Deserializer};
use tokio::sync::RwLock;
use tracing_subscriber::{fmt::time::OffsetTime, layer::SubscriberExt, util::SubscriberInitExt};

mod db;
pub mod routes;

// TODO: Xestión de errores decente (anyhow)
// TODO: Adaptacións para o móvil

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

    let level = if cfg!(debug_assertions) {
        "cinemazarelos=debug,tower_http=debug"
    } else {
        "cinemazarelos=info,tower_http=info"
    };

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| level.into()),
        )
        .with(tracing_subscriber::fmt::layer().compact().with_timer(timer))
        .init();
}

// Serde utils

pub fn empty_string_as_none<'de, D, T>(de: D) -> Result<Option<T>, D::Error>
where
    D: Deserializer<'de>,
    T: FromStr,
    T::Err: Display,
{
    let opt = Option::<String>::deserialize(de)?;
    match opt.as_deref() {
        None | Some("") => Ok(None),
        Some(s) => FromStr::from_str(s).map_err(de::Error::custom).map(Some),
    }
}

use axum::{routing::get, Router};
use cinemazarelos::{
    routes::{
        home::{hello, home},
        peliculas::peliculas,
    },
    SharedState,
};
use shuttle_axum::ShuttleAxum;
use tower_http::services::ServeDir;

#[shuttle_runtime::main]
async fn main() -> ShuttleAxum {
    let router = Router::new()
        .route("/", get(home))
        .route("/peliculas", get(peliculas))
        .route("/hello/:name", get(hello))
        .nest_service("/static", ServeDir::new("static/"))
        .with_state(SharedState::default());

    Ok(router.into())
}

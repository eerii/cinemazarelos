use axum::{routing::get, Router};
use cinemazarelos::{
    routes::{
        home::{hello, home},
        peliculas::peliculas,
    },
    SharedState,
};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(home))
        .route("/peliculas", get(peliculas))
        .route("/hello/:name", get(hello))
        .nest_service("/static", ServeDir::new("static/"))
        .with_state(SharedState::default());

    let listener = TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();
    println!("Servidor activo en http://{}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

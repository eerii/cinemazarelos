use axum::{http::Request, routing::get, Router};
use cinemazarelos::{
    routes::{inicio::inicio, peliculas::peliculas},
    SharedState,
};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(inicio))
        .route("/peliculas", get(peliculas))
        .nest_service("/static", ServeDir::new("static/"))
        .with_state(SharedState::default());

    #[cfg(debug_assertions)]
    let app = {
        fn not_htmx<T>(req: &Request<T>) -> bool {
            !req.headers().contains_key("hx-request")
        }
        app.layer(tower_livereload::LiveReloadLayer::new().request_predicate(not_htmx))
    };

    let listener = TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!(
        "Servidor activo en http://{}",
        listener.local_addr().unwrap()
    );
    axum::serve(listener, app).await.unwrap();
}

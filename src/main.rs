use axum::{http::Request, routing::get, Router};
use cinemazarelos::{
    init_tracing,
    routes::{inicio::inicio, peliculas::peliculas},
    SharedState,
};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use tracing::info;

#[tokio::main]
async fn main() {
    // Imprimimos os logs
    init_tracing();

    // Rutas da aplicación
    let app = Router::new()
        .route("/", get(inicio))
        .route("/peliculas", get(peliculas))
        .nest_service("/static", ServeDir::new("static/"))
        .with_state(SharedState::default());

    // Ferramentas para debug
    #[cfg(debug_assertions)]
    let app = {
        fn not_htmx<T>(req: &Request<T>) -> bool {
            !req.headers().contains_key("hx-request")
        }
        app.layer(tower_livereload::LiveReloadLayer::new().request_predicate(not_htmx))
    };

    // Lanzar o servidor
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    info!(
        "Servidor activo en http://{}",
        listener.local_addr().unwrap()
    );
    axum::serve(listener, app).await.unwrap();
}

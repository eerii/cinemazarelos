use cinemazarelos::{init_tracing, routes::router, shutdown_signal};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use tracing::info;

#[tokio::main]
async fn main() {
    // Imprimimos os logs
    init_tracing();

    // Rutas da aplicación
    let app = router().nest_service("/assets", ServeDir::new("assets/"));

    // Ferramentas para debug
    #[cfg(debug_assertions)]
    let app = {
        fn not_htmx<T>(req: &axum::http::Request<T>) -> bool {
            !req.headers().contains_key("hx-request")
        }
        app.layer(tower_livereload::LiveReloadLayer::new().request_predicate(not_htmx))
    };

    // Lanzar o servidor
    let listener = TcpListener::bind("0.0.0.0:3000")
        .await
        .expect("Fallo ó crear o servidor");

    info!(
        "Servidor activo en http://{}",
        listener
            .local_addr()
            .expect("Fallo obtendo o enderezo do servidor")
    );

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("Fallo executando o servidor");
}

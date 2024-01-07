use std::env;

use axum::{Router, routing::get, response::Html};
use dotenv::dotenv;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    dotenv().ok(); 

    let app = Router::new().route("/", get(handler));

    let listener = TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("running on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<String> {
    let prueba = env::var("PRUEBA").unwrap_or("default".into());
    Html(format!("<h1>Hello, {prueba}</h1>"))
}

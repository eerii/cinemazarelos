use std::env;

use axum::{Router, routing::get, response::Html};
use dotenv::dotenv;
use shuttle_axum::ShuttleAxum;

#[shuttle_runtime::main]
async fn main() -> ShuttleAxum {
    dotenv().ok(); 

    let app = Router::new().route("/", get(handler));

    Ok(app.into())
}

async fn handler() -> Html<String> {
    let prueba = env::var("PRUEBA").unwrap_or("default".into());
    Html(format!("<h1>Hello, {prueba}</h1>"))
}

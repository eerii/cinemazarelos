use std::env;

use askama::Template;
use axum::{Router, routing::get, extract::Path, response::Html};
use dotenv::dotenv;
use shuttle_axum::ShuttleAxum;

#[shuttle_runtime::main]
async fn main() -> ShuttleAxum {
    dotenv().ok(); 

    let mut router = Router::new().route("/", get(home)).route("/:name", get(hello));

    if cfg!(debug_assertions) {
        router = router.layer(tower_livereload::LiveReloadLayer::new());
    }

    Ok(router.into())
}

async fn home() -> Html<&'static str> {
    Html("<h1>Hey there c:</h1>")
}

#[derive(Template)]
#[template(path = "index.html")]
struct HelloTemplate {
    name: String,
    other: String,
}

async fn hello(Path(name): Path<String>) -> HelloTemplate {
    HelloTemplate { name, other: env::var("PRUEBA").unwrap_or("Default".into()) }
}

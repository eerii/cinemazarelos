use askama::Template;
use axum::{extract::Path, response::Html};

pub async fn home() -> Html<&'static str> {
    Html("<h1>Hey there c:</h1>")
}

#[derive(Template)]
#[template(path = "hello.html")]
pub struct HelloTemplate {
    name: String,
}

pub async fn hello(Path(name): Path<String>) -> HelloTemplate {
    HelloTemplate { name }
}

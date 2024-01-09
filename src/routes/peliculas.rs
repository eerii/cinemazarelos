use axum::{extract::State, response::Html};

use crate::{db::RepoPeliculas, SharedState};

pub async fn peliculas(State(state): State<SharedState>) -> Html<String> {
    // TODO: Move to template

    let mut state = state.0.write().await;
    let peliculas = state.db.list().await;

    let mut list = String::new();
    for p in peliculas {
        let year = match p.year {
            Some(year) => format!("{}", year),
            None => String::from("----"),
        };
        list = format!("{}<li>{} ({}), de {}</li>", list, p.titulo, year, p.director);
    }

    let html = format!("<h1>Peliculas</h1><ul>{}</ul>", list);

    Html(html)
}

use askama::Template;
use axum::extract::State;

use crate::{
    db::{Pelicula, RepoPeliculas},
    SharedState,
};

#[derive(Template)]
#[template(path = "peliculas.html")]
pub struct TemplatePeliculas {
    peliculas: Vec<Pelicula>,
}

pub async fn peliculas(State(state): State<SharedState>) -> TemplatePeliculas {
    let mut state = state.0.write().await;
    let peliculas = state.db.list().await;

    TemplatePeliculas { peliculas }
}

use askama::Template;
use axum::extract::{State, Query};
use serde::Deserialize;

use crate::{
    empty_string_as_none,
    db::{Pelicula, RepoPeliculas},
    SharedState,
};

#[derive(Template)]
#[template(path = "peliculas.html")]
pub struct TemplatePeliculas {
    peliculas: Vec<Pelicula>,
}

#[derive(Debug, Deserialize)]
pub struct Params {
    #[serde(default, deserialize_with = "empty_string_as_none")]
    n: Option<usize>,
}

pub async fn peliculas(State(state): State<SharedState>, Query(params): Query<Params>) -> TemplatePeliculas {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    if let Some(n) = params.n {
        peliculas.truncate(n);
    }

    TemplatePeliculas { peliculas }
}

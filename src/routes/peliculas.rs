
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

    // Ordeamos por data e eleximos as n últimas películas
    peliculas.sort_by(|a, b| b.fecha_ciclo.cmp(&a.fecha_ciclo));
    if let Some(n) = params.n {
        peliculas.truncate(n);
    }

    // Obtemos os enlaces dos posters
    for pelicula in &mut peliculas {
        if let Some(poster) = pelicula.poster.as_mut() {
            let year = 23;
            *poster = format!("https://raw.githubusercontent.com/eerii/cinemazarelos/main/assets/posters/{}{}/{}.webp", year, year + 1, poster);
        }
    }

    TemplatePeliculas { peliculas }
}

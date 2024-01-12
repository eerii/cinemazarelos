use askama::Template;
use axum::extract::{Query, State};
use chrono::{Datelike, Days, Local};
use serde::Deserialize;
use time::Date;

use super::CDN_URL;
use crate::{
    db::{Pelicula, RepoPeliculas},
    empty_string_as_none, SharedState,
};

// ·········
// Peliculas
// ·········

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

pub async fn carrousel(
    State(state): State<SharedState>,
    Query(params): Query<Params>,
) -> TemplatePeliculas {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data e eleximos as n últimas películas
    peliculas.sort_by(|a, b| b.fecha_ciclo.cmp(&a.fecha_ciclo));
    if let Some(n) = params.n {
        peliculas.truncate(n);
    }

    // Obtemos os enlaces dos posters
    for pelicula in &mut peliculas {
        let Some(poster) = pelicula.poster.as_mut() else { continue };
        let Some(curso) = pelicula.fecha_ciclo else { continue };
        let curso = curso.year() % 100 - if (curso.month() as i32) < 7 { 1 } else { 0 };

        *poster = format!(
            "{}/posters/{}{}/{}.webp",
            CDN_URL,
            curso,
            curso + 1,
            poster
        );
    }

    TemplatePeliculas { peliculas }
}

// ··········
// Calendario
// ··········

#[derive(Template)]
#[template(path = "calendario.html")]
pub struct TemplateCalendario {
    peliculas: Vec<Pelicula>,
}

pub async fn calendario(State(state): State<SharedState>) -> TemplateCalendario {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data
    peliculas.sort_by(|a, b| a.fecha_ciclo.cmp(&b.fecha_ciclo));

    // Eleximos as películas que aínda non foron
    // TODO: Eliminar checked_sub_days, é só para probar as pelis pasadas
    let hoxe = Local::now().checked_sub_days(Days::new(320)).unwrap();
    let hoxe = Date::from_ordinal_date(hoxe.year(), hoxe.ordinal() as u16).unwrap();
    peliculas.retain(|p| p.fecha_ciclo.is_some() && p.fecha_ciclo.unwrap() > hoxe);

    TemplateCalendario { peliculas }
}

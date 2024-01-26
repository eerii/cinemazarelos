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

const LISTA_N_PELICULAS: usize = 8;

pub fn engadir_poster(peliculas: &mut Vec<Pelicula>) {
    for pelicula in peliculas {
        let Some(poster) = pelicula.poster.as_mut() else { continue };
        let Some(curso) = pelicula.fecha_ciclo else { continue };
        let curso = curso.year() % 100 - if (curso.month() as i32) < 7 { 1 } else { 0 };

        *poster = format!(
            "{}/posters/{}{}/min/{}.webp",
            CDN_URL,
            curso,
            curso + 1,
            poster
        );
    }
}


// ·····
// Lista
// ·····

#[derive(Template)]
#[template(path = "componentes/lista_peliculas.html")]
pub struct TemplateListaPeliculas {
    peliculas: Vec<Pelicula>,
    paxina: Option<usize>,
}

#[derive(Debug, Deserialize)]
pub struct ParamsLista {
    #[serde(default, deserialize_with = "empty_string_as_none")]
    paxina: Option<usize>,
}

pub async fn lista(
    State(state): State<SharedState>,
    Query(params): Query<ParamsLista>,
) -> TemplateListaPeliculas {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Calculamos a seguinte páxina
    let paxina = params.paxina.unwrap_or(0);
    let seguinte = if peliculas.len() >= (paxina + 1) * LISTA_N_PELICULAS {
        Some(paxina + 1)
    } else {
        None
    };
    // Ordeamos por data e eliximos as n películas
    peliculas.sort_by(|a, b| b.fecha_ciclo.cmp(&a.fecha_ciclo));
    peliculas = peliculas
        .into_iter()
        .skip(paxina * LISTA_N_PELICULAS)
        .take(LISTA_N_PELICULAS)
        .collect();

    // Obtemos os enlaces dos posters
    engadir_poster(&mut peliculas);

    TemplateListaPeliculas { peliculas, paxina: seguinte }
}

// ·········
// Carrousel
// ·········

#[derive(Template)]
#[template(path = "componentes/carrousel_peliculas.html")]
pub struct TemplateCarrouselPeliculas {
    peliculas: Vec<Pelicula>,
}

#[derive(Debug, Deserialize)]
pub struct ParamsCarrousel {
    #[serde(default, deserialize_with = "empty_string_as_none")]
    n: Option<usize>,
}

pub async fn carrousel(
    State(state): State<SharedState>,
    Query(params): Query<ParamsCarrousel>,
) -> TemplateCarrouselPeliculas {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data e eleximos as n últimas películas
    peliculas.sort_by(|a, b| b.fecha_ciclo.cmp(&a.fecha_ciclo));
    if let Some(n) = params.n {
        peliculas.truncate(n);
    }

    // Obtemos os enlaces dos posters
    engadir_poster(&mut peliculas);

    TemplateCarrouselPeliculas { peliculas }
}

// ··········
// Calendario
// ··········

#[derive(Template)]
#[template(path = "componentes/calendario_peliculas.html")]
pub struct TemplateCalendarioPeliculas {
    peliculas: Vec<Pelicula>,
}

pub async fn calendario(State(state): State<SharedState>) -> TemplateCalendarioPeliculas {
    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data
    peliculas.sort_by(|a, b| a.fecha_ciclo.cmp(&b.fecha_ciclo));

    // Eleximos as películas que aínda non foron
    // TODO: Eliminar checked_sub_days, é só para probar as pelis pasadas
    let hoxe = Local::now().checked_sub_days(Days::new(320)).unwrap();
    let hoxe = Date::from_ordinal_date(hoxe.year(), hoxe.ordinal() as u16).unwrap();
    peliculas.retain(|p| p.fecha_ciclo.is_some() && p.fecha_ciclo.unwrap() > hoxe);

    TemplateCalendarioPeliculas { peliculas }
}

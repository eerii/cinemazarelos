use askama::Template;
use axum::extract::{Query, State};
use chrono::{Datelike, Local};
use serde::Deserialize;
use time::Date;

use super::CDN_URL;
use crate::{
    db::{Pelicula, RepoPeliculas},
    empty_string_as_none, SharedState,
};

const LISTA_N_PELICULAS: usize = 8;
const NOMES_MESES: [&str; 12] = [
    "xan", "feb", "mar", "abr", "mai", "xuñ", "xul", "ago", "set", "out", "nov", "dec",
];

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
    meses: [&'static str; 12],
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
    // TODO: Popup con detalles das películas

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

    TemplateListaPeliculas {
        peliculas,
        paxina: seguinte,
        meses: NOMES_MESES,
    }
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
    // TODO: Carrousel interactivo

    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data
    peliculas.sort_by(|a, b| a.fecha_ciclo.cmp(&b.fecha_ciclo));

    // Eliminamos as peliculas mais antigas que hoxe
    let hoxe = Local::now();
    let hoxe = Date::from_ordinal_date(hoxe.year(), hoxe.ordinal() as u16).unwrap();
    let mut peliculas_seguintes = peliculas.clone();
    peliculas_seguintes.retain(|p| p.fecha_ciclo.is_some() && p.fecha_ciclo.unwrap() >= hoxe);

    // Ordeamos por data e eleximos as n últimas películas
    if let Some(n) = params.n {
        // Se non hai suficientes en peliculas seguintes, engadimos as pasadas
        peliculas = if peliculas_seguintes.len() < n {
            let n = n - peliculas_seguintes.len();
            peliculas.sort_by(|a, b| b.fecha_ciclo.cmp(&a.fecha_ciclo));
            peliculas.retain(|p| p.fecha_ciclo.is_some() && p.fecha_ciclo.unwrap() < hoxe);
            peliculas.truncate(n);
            let mut p = peliculas_seguintes;
            p.extend(peliculas);
            p
        } else {
            peliculas_seguintes
        };
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
    meses: [&'static str; 12],
}

pub async fn calendario(State(state): State<SharedState>) -> TemplateCalendarioPeliculas {
    // TODO: Engadir ó calendario

    let mut state = state.write().await;
    let mut peliculas = state.db.list().await;

    // Ordeamos por data
    peliculas.sort_by(|a, b| a.fecha_ciclo.cmp(&b.fecha_ciclo));

    // Eleximos as películas que aínda non foron
    let hoxe = Local::now();
    let hoxe = Date::from_ordinal_date(hoxe.year(), hoxe.ordinal() as u16).unwrap();
    peliculas.retain(|p| p.fecha_ciclo.is_some() && p.fecha_ciclo.unwrap() > hoxe);

    TemplateCalendarioPeliculas {
        peliculas,
        meses: NOMES_MESES,
    }
}

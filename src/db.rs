use std::{time::{Duration, SystemTime}, env};

use chrono::{DateTime, Local};
use sqlx::{postgres::PgPoolOptions, query_as, Pool, Postgres, types::{time::Date, Uuid}};
use tracing::{debug, info};

const CACHE_DURATION: Duration = Duration::from_secs(6 * 60 * 60);

// Estructuras

#[derive(Debug, Clone)]
pub struct Pelicula {
    // TODO: Reordear tabla
    pub id: Option<i64>,
    pub titulo: String,
    pub director: String,
    pub poster: Option<Uuid>,
    pub fecha: Option<Date>,
    pub presentado_por: Option<Vec<String>>,
    pub duracion: Option<i32>,
    pub idioma: Option<String>,
    pub sinopsis: Option<String>,
    pub trigger_warnings: Option<String>,
    pub year: Option<i32>,
    pub sinopsis_es: Option<String>,
    pub cartel_por: Option<String>,
}

// Caché de datos

#[derive(Debug, Clone)]
struct CacheLine<T: Default> {
    valid_until: SystemTime,
    data: T,
}

impl<T: Default> CacheLine<T> {
    fn new(duration: Duration, data: T) -> Self {
        CacheLine {
            valid_until: SystemTime::now() + duration,
            data,
        }
    }

    fn get(&self) -> Option<&T> {
        if self.valid_until > SystemTime::now() {
            Some(&self.data)
        } else {
            None
        }
    }
}

impl<T: Default> Default for CacheLine<T> {
    fn default() -> Self {
        CacheLine {
            valid_until: SystemTime::UNIX_EPOCH,
            data: Default::default(),
        }
    }
}

#[derive(Debug, Default, Clone)]
struct Cache {
    peliculas: CacheLine<Vec<Pelicula>>,
}

// Conexión a base de datos

#[derive(Debug, Default, Clone)]
pub struct Conexion {
    pool: Option<Pool<Postgres>>,
    cache: Cache,
}

// Funcións da base de datos

pub trait RepoPeliculas {
    async fn get(&mut self) -> &Pool<Postgres>;
    async fn list(&mut self) -> Vec<Pelicula>;
}

impl RepoPeliculas for Conexion {
    async fn get(&mut self) -> &Pool<Postgres> {
        if self.pool.is_none() {
            self.pool = Some(
                PgPoolOptions::new()
                    .connect(&env::var("DATABASE_URL").expect("DATABASE_URL non especificada"))
                    .await
                    .expect("Fallo ó conectar ca base de datos"),
            );
        }
        self.pool.as_ref().unwrap()
    }

    async fn list(&mut self) -> Vec<Pelicula> {
        if let Some(cache) = self.cache.peliculas.get().cloned() {
            debug!("Usando cache para a lista de películas");
            return cache;
        }

        let peliculas = query_as!(
            Pelicula,
            "SELECT * FROM peliculas"
        )
        .fetch_all(self.get().await)
        .await
        .expect("Fallo obtendo as películas");

        self.cache.peliculas = CacheLine::new(CACHE_DURATION, peliculas);
        let fecha: DateTime<Local> = self.cache.peliculas.valid_until.into();
        info!(
            "Cache creado para a lista de películas, válido ata {}",
            fecha.format("%Y-%m-%d %H:%M:%S")
        );

        self.cache.peliculas.get().cloned().unwrap()
    }
}

use std::{
    env,
    time::{Duration, SystemTime},
};

use serde::{Deserialize, Serialize};
use sqlx::{
    postgres::PgPoolOptions,
    query_as,
    types::{time::Date, Uuid},
    Pool, Postgres,
};
use tracing::{debug, warn};

const CACHE_DURATION: Duration = Duration::from_secs(6 * 60 * 60);

// Estructuras

#[derive(Debug, Serialize, Deserialize, Clone)]
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

#[derive(Debug, Serialize, Deserialize, Clone)]
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
            debug!("A caché expirou ou non existe");
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

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Cache {
    peliculas: CacheLine<Vec<Pelicula>>,
}

impl Cache {
    fn write(&mut self, f: impl FnOnce(&mut Self)) {
        f(self);
        if let Ok(data) = bitcode::serialize(&self) {
            if std::fs::write(".cache", data).is_ok() {
                debug!("Gardouse o caché da base de datos");
            } else {
                warn!("Error al escribir en .cache");
            }
        }
    }
}

impl Default for Cache {
    fn default() -> Self {
        if let Ok(data) = std::fs::read(".cache") {
            if let Ok(cache) = bitcode::deserialize(&data) {
                debug!("Cargouse o caché dende o disco");
                return cache;
            }
        }

        Cache {
            peliculas: CacheLine::default(),
        }
    }
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
            debug!("Usando caché para a lista de películas");
            return cache;
        }

        let peliculas = query_as!(Pelicula, "SELECT * FROM peliculas")
            .fetch_all(self.get().await)
            .await
            .expect("Fallo obtendo as películas");

        self.cache
            .write(|cache| cache.peliculas = CacheLine::new(CACHE_DURATION, peliculas));

        self.cache.peliculas.get().cloned().unwrap()
    }
}

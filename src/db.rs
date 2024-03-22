use std::time::{Duration, SystemTime};

use dotenvy_macro::dotenv;
use serde::{Deserialize, Serialize};
use sqlx::{
    postgres::{PgPoolOptions, PgQueryResult},
    query_as,
    types::time::Date,
    FromRow, Pool, Postgres,
};
use tracing::{debug, warn};

const CACHE_DURATION: Duration = Duration::from_secs(6 * 60 * 60);

// Estructuras

#[derive(Debug, Serialize, Deserialize, Clone, FromRow)]
pub struct Pelicula {
    pub id: Option<i64>,
    pub titulo: String,
    pub director: String,
    pub poster: Option<String>,
    pub publicacion: Option<i16>,
    pub duracion: Option<i16>,
    pub idioma: Option<String>,
    pub sinopsis_gl: Option<String>,
    pub sinopsis_es: Option<String>,
    pub trigger_warnings: Option<String>,
    pub fecha_ciclo: Option<Date>,
    pub cartel_por: Option<Vec<String>>,
    pub presentado_por: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize, Clone, FromRow)]
pub struct Email {
    pub email: String,
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

    fn clear(&mut self) {
        std::fs::remove_file(".cache").ok();
        *self = Self::default();
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
    async fn clear_cache(&mut self);

    async fn pelicula(&mut self, id: i64) -> Option<Pelicula>;
    async fn list(&mut self) -> Vec<Pelicula>;

    async fn insert_email(&mut self, email: String) -> Result<PgQueryResult, sqlx::Error>;
}

impl RepoPeliculas for Conexion {
    async fn get(&mut self) -> &Pool<Postgres> {
        if self.pool.is_none() {
            self.pool = Some(
                PgPoolOptions::new()
                    .connect(dotenv!("DATABASE_URL"))
                    .await
                    .expect("Fallo ó conectar ca base de datos"),
            );
        }
        self.pool.as_ref().unwrap()
    }

    async fn clear_cache(&mut self) {
        self.cache.clear();
        debug!("Limpouse a caché da base de datos");
    }

    async fn pelicula(&mut self, id: i64) -> Option<Pelicula> {
        if let Some(cache) = self.cache.peliculas.get().cloned() {
            return cache.into_iter().find(|p| p.id == Some(id));
        }

        query_as::<_, Pelicula>("SELECT * FROM peliculas WHERE id = $1")
            .bind(id)
            .fetch_optional(self.get().await)
            .await
            .unwrap()
    }

    async fn list(&mut self) -> Vec<Pelicula> {
        if let Some(cache) = self.cache.peliculas.get().cloned() {
            return cache;
        }

        let peliculas = query_as::<_, Pelicula>("SELECT * FROM peliculas")
            .fetch_all(self.get().await)
            .await
            .expect("Fallo obtendo as películas");

        self.cache
            .write(|cache| cache.peliculas = CacheLine::new(CACHE_DURATION, peliculas));

        self.cache.peliculas.get().cloned().unwrap()
    }

    async fn insert_email(&mut self, email: String) -> Result<PgQueryResult, sqlx::Error> {
        let pool = self.get().await;
        sqlx::query("INSERT INTO emails (email) VALUES ($1)")
            .bind(email)
            .execute(pool)
            .await
    }
}

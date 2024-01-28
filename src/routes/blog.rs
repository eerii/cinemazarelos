use std::collections::HashMap;

use askama::Template;
use axum::extract::Path;
use chrono::NaiveDate;
use gray_matter::{engine::YAML, Matter};
use serde::Deserialize;
use tracing::warn;

const BLOG_PATH: &str = "assets/blog";

// TODO: Permitir extensión html

// ·····
// Lista
// ·····

#[derive(Template)]
#[template(path = "paxinas/blog.html")]
pub struct TemplateListaBlog {
    artigos: HashMap<String, String>,
}

pub async fn lista_blog() -> TemplateListaBlog {
    let mut artigos = HashMap::new();

    // Obtemos a lista de articulos no directorio blog
    let Ok(dir) = std::fs::read_dir(BLOG_PATH) else {
        return TemplateListaBlog { artigos };
    };

    for d in dir {
        let Ok(d) = d else { continue };
        let Ok(nome) = d.file_name().into_string() else { continue };
        if !nome.ends_with(".md") {
            continue;
        }

        // Leemos o arquivo e procesamos a frontmatter para obter o título
        let Ok(contido) = std::fs::read_to_string(d.path()) else {
            continue;
        };
        let Some(matter) = Matter::<YAML>::new().parse(&contido).data else {
            continue;
        };

        let slug = nome.trim_end_matches(".md").to_string();
        let titulo = matter["titulo"].as_string().unwrap_or(slug.clone());

        artigos.insert(titulo, slug);
    }

    TemplateListaBlog { artigos }
}

// ······
// Artigo
// ······

#[derive(Template)]
#[template(path = "paxinas/artigo_blog.html")]
pub struct TemplateArtigoBlog {
    datos: DatosArtigo,
    contido: Option<String>,
}

#[derive(Deserialize, Default)]
struct DatosArtigo {
    titulo: String,
    autores: Option<String>,
    data: Option<NaiveDate>,
    categorias: Vec<String>,
}

pub async fn artigo_blog(Path(artigo): Path<String>) -> TemplateArtigoBlog {
    let Ok(contido) = std::fs::read_to_string(format!("{}/{}.md", BLOG_PATH, artigo)) else {
        return TemplateArtigoBlog {
            datos: DatosArtigo {
                titulo: "Artigo non encontrado".into(),
                ..Default::default()
            },
            contido: None,
        };
    };

    let mut datos = DatosArtigo::default();

    let matter = Matter::<YAML>::new().parse(&contido);
    if let Some(matter) = matter.data.as_ref() {
        match matter.deserialize() {
            Ok(d) => datos = d,
            Err(e) => {
                warn!(
                    "Erro ao deserializar datos do artigo: {:?}",
                    e
                );
            },
        }
    }

    TemplateArtigoBlog {
        datos,
        contido: Some(matter.content),
    }
}

use askama::Template;
use axum::extract::Path;
use chrono::NaiveDate;
use gray_matter::{engine::YAML, Matter};
use serde::Deserialize;
use tracing::warn;

const BLOG_PATH: &str = "blog";

#[derive(Template)]
#[template(path = "paxinas/artigo_blog.html")]
pub struct TemplateArtigoBlog {
    datos: DatosArtigo,
    contido: Option<String>,
}

#[derive(Deserialize, Debug, Default)]
struct DatosArtigo {
    titulo: String,
    autores: Option<String>,
    data: Option<NaiveDate>,
}

pub async fn blog(Path(artigo): Path<String>) -> TemplateArtigoBlog {
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

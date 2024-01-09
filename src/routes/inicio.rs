use askama::Template;

#[derive(Template)]
#[template(path = "inicio.html")]
pub struct TemplateInicio;

pub async fn inicio() -> TemplateInicio {
    TemplateInicio {}
}

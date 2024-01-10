use askama::Template;

#[derive(Template)]
#[template(path = "inicio.html")]
pub struct TemplateInicio;

pub async fn inicio() -> TemplateInicio {
    TemplateInicio {}
}

#[derive(Template)]
#[template(path = "sobre_nos.html")]
pub struct TemplateSobreNos;

pub async fn sobre_nos() -> TemplateSobreNos {
    TemplateSobreNos {}
}

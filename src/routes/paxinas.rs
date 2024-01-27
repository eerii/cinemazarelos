use askama::Template;

// TODO: Email/formulario de contacto
// TODO: Mapa/cómo chegar
// TODO: Fotos do centro
// TODO: Lista de fanzines

#[derive(Template)]
#[template(path = "paxinas/inicio.html")]
pub struct TemplateInicio;

pub async fn inicio() -> TemplateInicio {
    TemplateInicio {}
}

#[derive(Template)]
#[template(path = "paxinas/sobre_nos.html")]
pub struct TemplateSobreNos;

pub async fn sobre_nos() -> TemplateSobreNos {
    // TODO: Lista de persoas (fotos?) colaboradoras do ciclo
    TemplateSobreNos {}
}

#[derive(Template)]
#[template(path = "paxinas/peliculas.html")]
pub struct TemplatePeliculas;

pub async fn peliculas() -> TemplatePeliculas {
    TemplatePeliculas {}
}

use askama::Template;

#[derive(Template)]
#[template(path = "componentes/novidades.html")]
pub struct TemplateNovidades;

pub async fn novidades() -> TemplateNovidades {
    TemplateNovidades {}
}

# CineMazarelos

Web do ciclo de cine da Facultade de Filosofía USC

## Qué editar? 📝

Para editar o proxecto debes de ser colaboradore de GitHub (crea unha conta e solicita acceso a @eerii ou @LopezGolan). Podes facer cambios no teu equipo ou usar a páxina web https://github.dev/eerii/cinemazarelos.

TODO: Explicar git

### Nivel 1: Engadir novas películas

TODO: Explicar base de datos

1. Modificar base de datos (coma un excel)
2. Engadir posters a `assets/posters/[CURSO]`
3. Copiar o nome de arquivo, por exemplo `02_irma_vep`, **sen** a extensión (antes do punto), e pegalo na columna _poster_ da base de datos

**Importante:** Non se verán os cambios ata que a páxina volva a ser actualizada. Por agora este é un proceso manual que realizará @eerii. Mandaráme unha notificación cada vez que fagades cambios

### Nivel 2: Crear ou editar unha nova páxina estática

Dentro de `templates` está todo o código html da web. Aínda que non é exactamente html tradicional, pois ten soporte para plantillas, podedes seguir estes exemplos para non perderse:

- Copiar `templates/sobre_nos.html` para facer unha nova páxina con texto e imaxes. Editar só entre as liñas marcadas por `{% block content %}` e `{% endblock %}`.
- Editar `templates/novidades.html` para cambiar o que se ve na columna dereita da páxina de inicio. Agora mesmo está o anuncio do fanzine.

### Nivel 3: Crear unha nova api ou páxina dinámica

TODO: Explicar backend

<a href="https://htmx.org/">
    <img src='assets/created_with.webp' width='250'>
</a>
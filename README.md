# CineMazarelos 🍿

Web do ciclo de cine da Facultade de Filosofía USC

## Qué editar? 📝

Para editar o proxecto necesitas unha conta de [github](https://github.com). Este é un software de control de versións que contén todo o código da web.

1. Crear unha nova conta ([guía](https://docs.github.com/es/get-started/quickstart/creating-an-account-on-github#signing-up-for-a-new-personal-account))
2. Solicitar acceso a [@eerii](https://github.com/eerii) ou [@LopezGolan](https://github.com/LopezGolan)) indicando o teu nombre de usuario ou correo electrónico
3. Recibirás unha notificación por correo cunha invitación, preme no botón de aceptar

Unha vez sexas colaboradore podes facer cambios no repositorio.

### Explicación de Git

Seguro que estás familiarizade cando fas un traballo en gardar o documento múltiples veces (TraballoV1.docx, TraballoV2.docx, TraballoFinal.docx, TraballoAgoraSi.docx, TraballoFINAL!!!.docx...) para non perder o progreso. Git fai o mesmo, pero algo máis ordeado.

O _repositorio_ do proxecto non é mais cun cartafol compartido. Cada vez que fagas un cambio de un ou máis arquivos que sexa significativo faráse un _commit_ para gardalo. Isto é unha versión separada, poidendo ver todo o historial de cambios [aquí](https://github.com/eerii/cinemazarelos/commits/main/). Este _commit_ ten unha mensaxe que describe os cambios e un autor asociado (ti).

Vamos a poñer un exemplo. Imaxina que engado os posters para tres novas películas, e quero _contribuír_ estes cambios ó proxecto. Farei un _commit_ ó que lle podo chamar "assets: engadir posters 🎨". Agora aparecerá na lista de cambios para todo o mundo. Ademáis, nese momento comezará un proceso que recreará a páxina web e fara unha nova versión automáticamente (aínda que pode tardar uns minutos).

Hai dúas maneiras de traballar no repositorio. Unha de elas é facelo localmente, descargando o repositorio co botón verde _"<> Code"_, e editalo no teu ordenador, por exemplo con [VS Code](https://code.visualstudio.com/). Se non queres instalar nada temos acceso a un editor web [nesta ligazón](https://github.dev/eerii/cinemazarelos). Vamos a ver como utilizalo.

![Editor](https://github.com/eerii/cinemazarelos/assets/22449369/19dffca2-46f2-4f3c-95ee-4e31cbd6bf75)

Na barra lateral temos varias opcións. A primeira é o explorador de arquivos, aquí temos tódalas carpetas e arquivos do proxecto. Podemos facer click en calqueira para abrilo. Tamén podemos arrastrar arquivos aquí para subilos, por exemplo, novas imaxes.

![Xestor de cambios](https://github.com/eerii/cinemazarelos/assets/22449369/382f58b6-4875-4e3b-a462-1a0b778c1cc7)

O outro apartado importante é o terceiro, o que parece unha árbore. Este é o panel no que traballaremos con git. Cando cambiemos todo o que queiramos, veremos unha lista de arquivos modificados. Revisamos que estén ben, escribimos unha mensaxe curta describindo o que fixemos, e facemos click no botón verde _"Commit and Push"_. Listo! Xa están os cambios gardados no repositorio.

Un último detalle é cómo redactar as mensaxes. Hai que intentar que sexan no formato "tipo: descripción", con tipo sendo "assets" se só engadides contido (por exemplo, imaxes), "feat" se engadides código e "refactor" ou chore para tarefas de limpeza. Se queredes tamén podedes engadir un emoticono ó final da descripción! Este apartado non é obligatorio, eu periódicamente limparei as mensaxes para que queden todas ordeadas, pero así aforramos traballo e é máis fácil ver o que está a pasar.

Xa sabemos cómo entrar no repositorio, agora vexamos os cambios que podemos facer.

### Nivel 1: Engadir novas películas

Para almacear a táboa de películas estamos utilizando unha base de datos. É algo moi parecido a un excel, pero está feito para que o ordenador que executa a páxina web o poida entender mellor. A base de datos é PostgreSQL e está aloxada en [supabase](https://supabase.com/). 

1. Necesitarás solicitar acceso a [@eerii](https://github.com/eerii) ou [@LopezGolan](https://github.com/LopezGolan)) indicando o teu correo electrónico (neste caso **non** hai que crear unha conta antes)
2. Segue as instruccións no teu correo para rexistrarte
3. Verifica que tes acceso ó proxecto `cinemazarelos`

Unha vez esté todo listo podemos modificar a táboa de películas.

![Editor de tablas](https://github.com/eerii/cinemazarelos/assets/22449369/b79713cb-4edb-4a51-86bd-4a82a255d78e)

1. Facemos click no editor de tablas na barra lateral
2. Insertamos unha nova fila usando o botón verde _Insert_ e seleccionando _Insert row_
3. Enchemos a información tendo en conta
    - A maioría dos campos son autoexplicativos
    - Os campos `presentado_por` e `cartel_por` teñen que ter o formato: `["Nome Apelidos","Nome Apelidos"]`
    - Para os posters:
        1. Convertir a imaxe a webp ([enlace](https://cloudconvert.com/webp-converter)) e renomeala co número da sesión e o título en minúsculas e separado por barras (por exemplo, `02_irma_vep.webp`)
        2. Engadir a imaxe á carpeta `assets/posters/[CURSO]` usando o editor web e facer un commit. Se vas a engadir varios é mellor facer un só commit con todos. Verificar que está ben engadida
        3. Copiar o nome de arquivo **sen** a extensión (por exemplo `02_irma_vep`) e pegalo na columna _poster_

**Importante:** Non se verán os cambios ata que a páxina borre a caché. Isto sucede cada 6 horas, para facelo manualmente preme [este enlace](https://cinemazarelos.onrender.com/api/clear/cache) cando haxas cambiado todo.

### Nivel 2: Crear ou editar unha nova páxina estática

O seguinte paso é crear unha nova páxina ou artículo do blog, ou modificar unha existente. Dentro de `templates` está todo o código html da web. Aínda que non é exactamente html tradicional, pois ten soporte para plantillas, podedes seguir estes exemplos para non perderse:

- Editar `templates/componentes/novidades.html` para cambiar o que se ve na columna dereita da páxina de inicio. Agora mesmo está o anuncio do fanzine.
- Copiar `templates/paxinas/sobre_nos.html` para facer unha nova páxina con texto e imaxes. Editar só entre as liñas marcadas por `{% block content %}` e `{% endblock %}`. Nota: tamén hai que modificar `src/routes/paxinas.rs`, mellor avisar a [@eerii](https://github.com/eerii) se non sabes o que fas.

Os artículos do blog non utilizan html, usan markdown, unha linguaxe moito máis sencilla para facer texto formateado. É o mesmo no que está escrito este documento, podes velo en `README.md`. Nesta [ligazón](https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) tedes unha guía rápida de como utilizalo. Para crear ou editar un artículo do blog abre a carpeta `assets/blog` e mira os arquivos que ten. Nota: Esta funcionalidade aínda está en probas.

### Nivel 3: Crear unha nova api ou páxina dinámica

TODO: Explicar backend

<a href="https://htmx.org/">
    <img src='assets/created_with.webp' width='250'>
</a>

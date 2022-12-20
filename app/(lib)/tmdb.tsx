export type PeliculaTMDB = {
    titulo: string,
    year: number,
    sinopsis: string,
    puntuacion: number,
    idioma: string,
    duracion?: number,
}

const idiomas = {
    "en": "Inglés",
    "es": "Español",
    "fr": "Francés",
}

export const DatosPelicula = async ({ titulo, year }: { titulo: string, year: number }) : Promise<PeliculaTMDB | null> => {
    const init = {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${process.env.TMDB_KEY}`,
        },
    }

    // Buscar la película por título y año
    const req = await fetch( `https://api.themoviedb.org/3/search/movie?query=${encodeURI(titulo)}&year=${year}&page=1&language=es-ES`, init )

    if (!req.ok) {
        console.error("Error al obtener las peliculas")
        return null
    }

    const data = await req.json()
    if (data.total_results == 0) {
        console.error("No se encontraron peliculas")
        return null
    }

    const pelicula = data.results[0]

    // Obtener información extra como la duración
    const extra = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}?language=es-ES`, init)

    if (extra.ok) {
        const extra_data = await extra.json()
        pelicula.runtime = extra_data.runtime
    }

    return {
        titulo: pelicula.title,
        year: pelicula.release_date.split("-")[0],
        sinopsis: pelicula.overview,
        puntuacion: pelicula.vote_average,
        idioma: pelicula.original_language in idiomas ? idiomas[pelicula.original_language as keyof typeof idiomas] : pelicula.original_language,
        duracion: pelicula.runtime,
    }
}
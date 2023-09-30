export type PeliculaTMDB = {
    titulo: string,
    year: number,
    sinopsis_es: string,
    sinopsis?: string,
    puntuacion: number,
    idioma: string,
    duracion?: number,
}

const idiomas = {
    "en": "Inglés",
    "es": "Español",
    "fr": "Francés",
    "de": "Alemán",
    "jp": "Japonés",
    "it": "Italiano",
}

export const DatosPelicula = async ({ titulo, year }: { titulo: string, year: number }) : Promise<PeliculaTMDB | undefined> => {
    // TODO: Mirar a ver se arranxo isto
    return undefined;

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
        console.error("Error al obtener las peliculas de TMDB")
        return undefined
    }

    const data = await req.json()
    if (data.total_results == 0) {
        console.error("No se encontraron peliculas")
        return undefined
    }

    const pelicula = data.results[0]
    const resultado = {
        titulo: pelicula.title,
        year: pelicula.release_date.split("-")[0],
        puntuacion: pelicula.vote_average,
        idioma: pelicula.original_language in idiomas ? idiomas[pelicula.original_language as keyof typeof idiomas] : pelicula.original_language,
        sinopsis_es: pelicula.overview,
    }

    // Obtener información extra como la duración y la sinopsis en gallego si es posible
    const extra = await fetch(`https://api.themoviedb.org/3/movie/${pelicula.id}?language=gl-ES`, init)

    if (!extra.ok) {
        console.error(`Error al obtener los datos extra de ${pelicula.title} (${pelicula.release_date.split("-")[0]})`)
        return resultado
    }

    if (extra.ok) {
        const extra_data = await extra.json()

        return {
            ...resultado,
            sinopsis: extra_data.overview,
            duracion: extra_data.runtime,
        }
    }
}

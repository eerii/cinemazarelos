import ListaPeliculas from "../../(lib)/supabase/peliculas"
import Pelicula from "./pelicula"
import Estado from "./estado"

import style from "./carrousel.module.css"

export default async () => {
    const n = 3

    const peliculas = await ListaPeliculas({
        propiedades: "id, titulo, year, director, duracion, fecha, presentado_por, idioma, sinopsis, sinopsis_es",
        n: n, 
        poster: true, 
        orden: "fecha", 
        asc: false
    })

    return (<div className={style.carrousel}>
        <Estado n={n}>
            {peliculas.map((pelicula: any, index) => <Pelicula key={index} pelicula={pelicula}/>)}
        </Estado>
    </div>)
}
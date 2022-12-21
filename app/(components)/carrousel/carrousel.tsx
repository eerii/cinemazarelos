import ListaPeliculas from "../../(lib)/supabase/peliculas"
import Pelicula from "./pelicula"

import style from "./carrousel.module.css"

export default async () => {
    const peliculas = await ListaPeliculas({
        propiedades: "id, titulo, year, director, duracion, fecha, presentado_por, idioma, sinopsis, sinopsis_es",
        n: 3, 
        poster: true, 
        orden: "fecha", 
        asc: false
    })

    return (<div className={style.carrousel}>
        {peliculas.map((pelicula: any, index) => <Pelicula key={index} pelicula={pelicula} index={index}/>)}
    </div>)
}
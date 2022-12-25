import ListaPeliculas from "../../(lib)/supabase/peliculas"
import Pelicula from "./pelicula"
import Estado from "./estado"

import style from "./carrousel.module.css"

const Carrousel = async () => {
    const peliculas = await ListaPeliculas({
        propiedades: "id, titulo, year, director, duracion, fecha, presentado_por, idioma, sinopsis, sinopsis_es",
        n: 3,
        poster: true, 
        orden: "fecha", 
        asc: false
    })

    return (<Estado>
        {peliculas.map((pelicula: any, index) => <Pelicula key={index} pelicula={pelicula}/>)}
    </Estado>)
}

export default Carrousel
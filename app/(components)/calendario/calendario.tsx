import ListaPeliculas from "../../(lib)/supabase/peliculas"
import Pelicula from "./pelicula"

import Card from "../card/card"
import style from "./calendario.module.css"

const Calendario = async () => {
    const peliculas = await ListaPeliculas({
        propiedades: "id, titulo, fecha",
        poster: true, 
        orden: "fecha", 
        asc: false,
        future: true
    })

    return (<div>
        <h2 className={style.title}>Calendario</h2>
        <div className={style.calendario}>
            {
                peliculas?.length ?
                    peliculas.sort((a, b) => a.fecha < b.fecha ? -1 : 1).map((pelicula: any, index) => <Pelicula key={index} pelicula={pelicula}/>) :
                    <Card>
                        <h3 className={style.titulo_pelicula}>Non hai próximas sesións</h3>
                    </Card>
            }
        </div>
    </div>)
}

export default Calendario

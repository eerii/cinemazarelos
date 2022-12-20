import Peliculas from "../../(lib)/supabase/peliculas"
import Image from "next/image"

import style from "./carrousel.module.css"

export default async () => {
    const peliculas = await Peliculas({propiedades: "id, titulo, year, director, duracion, fecha, presentado_por, idioma, sinopsis, sinopsis_es", n: 5, poster: true, orden: "fecha", asc: false})

    return (
        <div >
            {
                peliculas ? 
                    peliculas.map((pelicula: any) =>
                    (<div key={pelicula.titulo} style={{ display: "flex", flexBasis: "1", flexWrap: "wrap", overflowY: "hidden" }}>
                        {"poster" in pelicula ?
                            <Image src={pelicula.poster.data?.publicUrl} alt={pelicula.titulo} width={210} height={297} className={style.placeholder_movie}/> :
                            <div className={style.placeholder_movie}/>}
                        <div style={{ textAlign: "justify", height: "300px", margin: "0 16px", flex: "1 1" }}>
                            <h3>{pelicula.titulo} ({pelicula.year})</h3>
                            <p>{pelicula.duracion} min - {pelicula.idioma} - {pelicula.director}</p>
                            <p>{pelicula.sinopsis}</p>
                            <h4>Fecha: {pelicula.fecha}</h4>
                            <p>Presentado por {pelicula.presentado_por.join(", ")}</p>
                        </div>
                    </div>)) : null
            }
        </div>
    )
}
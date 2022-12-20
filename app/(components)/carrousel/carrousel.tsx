import Peliculas from "../../(lib)/supabase/peliculas"
import Image from "next/image"

import style from "./carrousel.module.css"

export default async () => {
    const peliculas = await Peliculas({propiedades: "id, titulo, year, director, duracion, fecha, presentado_por, idioma, sinopsis", n: 5, poster: true, orden: "fecha", asc: false})

    return (
        <div style={{ display: "flex", flexBasis: "1", flexWrap: "wrap", overflowY: "hidden" }}>
            {
                peliculas ? (<>
                    {("poster" in peliculas[0] ?
                        <Image src={peliculas[0].poster.data.publicUrl} alt={peliculas[0].titulo} width={210} height={297} className={style.placeholder_movie}/> :
                        <div className={style.placeholder_movie}/>)}
                    <div style={{ textAlign: "justify", height: "300px", margin: "0 16px", flex: "1 1" }}>
                        <h3>{peliculas[0].titulo} ({peliculas[0].year})</h3>
                        <p>{peliculas[0].duracion} min - {peliculas[0].idioma}</p>
                        <p>{peliculas[0].director}</p>
                        <p>{peliculas[0].sinopsis}</p>
                        <h4>Fecha: {peliculas[0].fecha}</h4>
                        <ul>Presentado por: {peliculas[0].presentado_por.map((presentador: string) => <li key={presentador}>{presentador}</li>)}</ul>
                    </div>
                </>) : <div className={style.placeholder_movie}/>
            }
        </div>
    )
}
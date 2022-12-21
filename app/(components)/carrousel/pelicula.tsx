import Image from "next/image"

import style from "./carrousel.module.css"

const por_defecto = {
    titulo: "Título",
    year: "2023",
    duracion: 100,
    idioma: "Idioma",
    director: "Director",
    sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    fecha: "2023-01-01",
    presentado_por: ["Lorem ipsum"]
}

export default ({ pelicula: p, index }: { pelicula: any, index: number }) => {
    const pelicula = p ? p : por_defecto

    const Poster = () => {
        return (
            "poster" in pelicula ?
            <Image src={pelicula.poster.data?.publicUrl} alt={pelicula.titulo} width={300/Math.SQRT2} height={300} className={style.poster}/> :
            <div className={`${style.poster} ${style.placeholder}`}/>
        )
    }

    return (
        index == 0 ?
        <div className={style.pelicula_seleccionada}>
            <Poster/>
            <div className={style.descripcion}>
                <h3 className={style.elem} style={{marginTop: "16px"}}>{pelicula.titulo} ({pelicula.year})</h3>
                <p className={style.elem}>{pelicula.duracion} min - {pelicula.idioma} - {pelicula.director}</p>
                <p className={`${style.sinopsis} ${style.elem}`}>{pelicula.sinopsis}</p>
                <h4 className={style.elem}>Fecha: {pelicula.fecha}</h4>
                <p className={style.elem}>Presentado por {pelicula.presentado_por.join(", ")}</p>
            </div>
        </div> : 
        <Poster/>
    )
}
import Image from "next/image"

import style from "./carrousel.module.css"

const por_defecto = {
    titulo: "Título",
    year: "2023",
    duracion: 100,
    idioma: "Idioma",
    director: "Director",
    sinopsis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    fecha: "2023-01-01",
    presentado_por: ["Lorem ipsum"]
}

export type PropsPelicula = {
    pelicula: any,
}

const PeliculaCarrousel = ({ pelicula: p }: PropsPelicula) => {
    const pelicula = p ? p : por_defecto

    const Poster = () => (
        "poster" in pelicula ?
        <Image src={pelicula.poster.data?.publicUrl} alt={pelicula.titulo} width={300/Math.SQRT2} height={300} className={style.poster}/> :
        <div className={`${style.poster} ${style.placeholder}`}/>
    )

    const Info = () => (
        <div>
            <h3 className={style.elem} style={{marginTop: "1rem"}}>{pelicula.titulo} ({pelicula.year})</h3>
            <p className={style.elem}>{pelicula.duracion} min - {pelicula.idioma} - {pelicula.director}</p>
            <p className={style.elem}>Fecha: {pelicula.fecha}</p>
            <p className={style.elem}>Presentado por {pelicula.presentado_por.join(", ")}</p>
        </div>
    )

    const Sinopsis = () => (
        <p className={`${style.sinopsis} ${style.elem}`}>{pelicula.sinopsis}</p>
    )

    return (
        <div>
            <Poster/>
            <Info/>
            <Sinopsis/>
        </div>
    )
}

export default PeliculaCarrousel
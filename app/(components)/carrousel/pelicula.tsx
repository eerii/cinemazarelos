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
    presentado_por: ["Lorem ipsum", "Sit amet"],
    cartel_por: "Lorem ipsum"
}

export type PropsPelicula = {
    pelicula: any,
}

const PeliculaCarrousel = ({ pelicula: p }: PropsPelicula) => {
    const pelicula = p ? p : por_defecto

    const Poster = () => (
        pelicula?.poster?.data?.publicUrl ?
        <Image src={pelicula.poster.data?.publicUrl} alt={pelicula.titulo} width={301/Math.SQRT2} height={300} className={style.poster}/> :
        <div className={`${style.poster} ${style.placeholder}`}/>
    )

    const Info = () => (
        <div>
            <div className={style.titulo_fecha}>
                <div>
                    <h3 className={style.titulo}>{pelicula.titulo}</h3>
                    <p className={style.subtitulo}>{pelicula.duracion} min - {pelicula.idioma} - {pelicula.year}</p>
                </div>
                <p className={style.fecha}>{pelicula.fecha}</p>
            </div>
            <div className={style.divisor}/>
            <p className={style.sinopsis}>{pelicula.sinopsis}</p>
            <p className={style.creditos}>Presentado por {pelicula?.presentado_por?.join(", ")}</p>
            <p className={style.creditos}>Cartel por {pelicula.cartel_por}</p>
        </div>
    )

    return (
        <div>
            <Poster/>
            <Info/>
        </div>
    )
}

export default PeliculaCarrousel

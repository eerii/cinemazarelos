import style from "./calendario.module.css"

const PeliculaCalendario = (p: any) => {
    let pelicula = p.pelicula
    let fecha = new Date(Date.parse(pelicula.fecha))
    let dia = ("0" + fecha.getDate()).slice(-2)
    let mes = fecha.toLocaleString("gl", { month: "short" }).replace(".", "")

    return (
        <div className={style.dia}>
            <div className={style.fecha}>
                <p className={style.fecha_dia}>{dia}</p>
                <p className={style.fecha_mes}>{mes}</p>
            </div>
            <p className={style.titulo}>{pelicula.titulo}</p>
        </div>
    )
}

export default PeliculaCalendario

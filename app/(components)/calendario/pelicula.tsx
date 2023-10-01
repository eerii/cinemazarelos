import Card from "../card/card"
import style from "./calendario.module.css"

const PeliculaCalendario = (p: any) => {
    let pelicula = p.pelicula
    let fecha = new Date(Date.parse(pelicula.fecha))
    let dia = ("0" + fecha.getDate()).slice(-2)
    let mes = fecha.toLocaleString("gl", { month: "short" }).replace(".", "")

    return (
        <Card>
            <div className={style.fecha}>
                <p className={style.fecha_dia}>{dia}</p>
                <p className={style.fecha_mes}>{mes}</p>
            </div>
            <h3 className={style.titulo_pelicula}>{pelicula.titulo}</h3>
        </Card>
    )
}

export default PeliculaCalendario

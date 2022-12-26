import style from "./calendario.module.css"

const Calendario = () => {
    return (<div>
        <h2 className={style.title}>calendario</h2>
        <div className={style.calendario}>
            {Array.from({length: 31}, (_, i) => i + 1).map((dia, index) => <div key={index} className={style.dia}></div>)}
        </div>
    </div>)
}

export default Calendario
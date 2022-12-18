import style from "../styles/nav.module.css"
import Icon from "./icon"

const Navigation = () => {
    return <div className={style.nav}>
        <h1 className={style.logo}><span className={style.logo_alt}>CineMa</span>zarelos</h1>
        <div className={style.links}>
            <h3 className={style.item}>inicio</h3>
            <h3 className={style.item}>programación</h3>
            <h3 className={style.item}>sobre nosotres</h3>

            <Icon name="instagram" width="24px" style={{margin: "0 16px"}}/>
            <Icon name="film" width="24px"/>
            <Icon name="more-horizontal" width="24px" stroke-width="6px" style={{margin: "0 12px"}}/>
        </div>
    </div>
}

export default Navigation
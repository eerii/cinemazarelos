import style from "./card.module.css"

const Card = ({children} : {children: React.ReactNode}) => {
    return (<div className={style.card}>
        {children}
    </div>)
}

export default Card

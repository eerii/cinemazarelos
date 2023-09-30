import Carrousel from "./(components)/carrousel/carrousel"
import Calendario from "./(components)/calendario/calendario"
import UltimasReviews from "./(components)/reviews/ultimas_reviews"

import style from "./(styles)/main.module.css"

const Main = () => 
    <main>
        <Carrousel/>
        <div className={style.calendario_reviews}>
            <Calendario/>
            <UltimasReviews/>
        </div>
    </main>

export default Main

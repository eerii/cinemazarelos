import Image from "next/image"
import imaxe_fanzine from "../../../public/images/fanzine_01.webp"

import style from "./lateral.module.css"

const Fanzine = () => (<div>
    <h2 className={style.title}>Fanzine</h2>
    <div className={style.card}>
        <div className={style.content}>
            <p>Estamos moi emocionades de, por fin, poder compartir un pequeno adianto do que é o Fanzine do noso ciclo de cine!</p>
            <p>Poderedes atopar unha portada chulísima, os cartaces do ciclo do ano pasado e unha recopilación de textos escritos poles presentadores dos filmes!</p>
        </div>
        <div className={style.sep}/>
        <Image src={imaxe_fanzine} alt="Primeiro fanzine do cineclube" width={150}/>
    </div>
</div>)

export default Fanzine

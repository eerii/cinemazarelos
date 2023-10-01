import { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import imaxe_fanzine from "../public/images/fanzine_01.webp"

import Carrousel from "./(components)/carrousel/carrousel"
import Calendario from "./(components)/calendario/calendario"
import Card from "./(components)/card/card"
import Correo from "./(components)/correo"

import style from "./(styles)/main.module.css"

export const metadata: Metadata = {
    title: "CineMazarelos",
    description: "A web do ciclo de cine da facultade de Filosofía USC",
}

const Main = () => 
    <main>
        <Script id="theme-script">{`
            let theme = localStorage.getItem("theme");
            if (theme) { document.documentElement.setAttribute("data-theme", theme); }
        `}</Script>
        <Carrousel/>
        <div className={style.calendario_reviews}>
            <div>
                <Correo/>
                <Calendario/>
            </div>
            <div>
                <h2 className={style.title}>Fanzine</h2>
                <Card>
                    <div className={style.content}>
                        <p>Estamos moi emocionades de, por fin, poder compartir un pequeno adianto do que é o Fanzine do noso ciclo de cine!</p>
                        <p>Poderedes atopar unha portada chulísima, os cartaces do ciclo do ano pasado e unha recopilación de textos escritos poles presentadores dos filmes!</p>
                    </div>
                    <div className={style.sep}/>
                    <Image src={imaxe_fanzine} alt="Primeiro fanzine do cineclube" width={150}/>
                </Card>
            </div>
        </div>
    </main>

export default Main

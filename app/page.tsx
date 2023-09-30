import { Metadata } from "next"
import Script from "next/script"

import Carrousel from "./(components)/carrousel/carrousel"
import Calendario from "./(components)/calendario/calendario"
import Lateral from "./(components)/lateral/lateral"

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
            <Calendario/>
            <Lateral/>
        </div>
    </main>

export default Main

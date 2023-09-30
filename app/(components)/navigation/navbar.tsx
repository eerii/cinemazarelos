import Link from "next/link"

import EstadoNavBar from "./estado"
import style from "./nav.module.css"

import { InstagramIcon, FilmAffinityIcon, LetterboxdIcon } from "../icons/icons"

const NavBar = () => {
    return (<div className={style.nav}>
        <EstadoNavBar>
        <div className={style.mobile_wrapper}>
            <Link href="/"><h1 className={style.logo}><span className={style.logo_alt}>CineMa</span>zarelos</h1></Link>
            <h3 className={style.toggle}>menú</h3>
        </div>
        <div className={style.page_links}>
            <Link href="/"><h3>Inicio</h3></Link>
            <Link href="/"><h3>Fanzine</h3></Link>
            <Link href="/about"><h3>Sobre nosotres</h3></Link>
        </div>
        <div className={style.social_links}>
            <a href="https://www.instagram.com/cinemazarelos_usc" target="_blank" rel="noreferrer noopener" aria-label="Instagram"><InstagramIcon/></a>
            <a href="https://www.filmaffinity.com/es/userreviews.php?user_id=5661081" target="_blank" rel="noreferrer noopener" aria-label="Film Affinity"><FilmAffinityIcon/></a>
            <a href="https://letterboxd.com/cinemazarelos/" target="_blank" rel="noreferrer noopener" aria-label="LetterboxD"><LetterboxdIcon/></a>
        </div>
        </EstadoNavBar>
    </div>)
}

export default NavBar

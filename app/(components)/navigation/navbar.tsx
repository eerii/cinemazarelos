import Link from "next/link"

import style from "./nav.module.css"

import { InstagramIcon, FilmAffinityIcon, LetterboxdIcon } from "../icons/icons"

export default () => {
    return <div className={style.nav}>
        <Link href="/"><h1 className={style.logo}><span className={style.logo_alt}>CineMa</span>zarelos</h1></Link>
        <div className={style.links}>
            <Link href="/"><h3 className={style.item}>inicio</h3></Link>
            <Link href="/blog"><h3 className={style.item}>blog</h3></Link>
            <Link href="/about"><h3 className={style.item}>sobre nosotres</h3></Link>

            <a href="https://www.instagram.com/cinemazarelos_usc" target="_blank" rel="noopener" aria-label="Instagram"><InstagramIcon className={style.icon}/></a>
            <a href="https://www.filmaffinity.com/es/userreviews.php?user_id=5661081" target="_blank" rel="noopener" aria-label="Film Affinity"><FilmAffinityIcon className={style.icon}/></a>
            <a href="https://letterboxd.com/cinemazarelos/" target="_blank" rel="noopener" aria-label="LetterboxD"><LetterboxdIcon className={style.icon}/></a>
        </div>
    </div>
}
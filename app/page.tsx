import Carrousel from "./(components)/carrousel/carrousel"

import style from "./(styles)/home.module.css"

export default () => {
    return (
        <main className={style.background}>
            {/* @ts-expect-error Server Component */}
            <Carrousel/>
            
            <div className={style.placeholder_movie} style={{ width: "50%", height: "400px", margin: "16px", backgroundColor: "var(--theme-color-dark-background)" }}/>
        </main>
    )
}
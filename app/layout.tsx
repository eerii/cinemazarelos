import { Gazpacho, Tisa } from "./(styles)/font_styles"
import "./(styles)/themes.css"
import "./(styles)/global_styles.css"

import Navigation from "./(components)/navigation/navbar"
import Footer from "./(components)/footer"
import Analytics from "./(lib)/analytics"

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <html lang="es" className={`${Gazpacho.variable} ${Tisa.variable}`}>
            <body>
                <Navigation/>
                {children}
                <Footer/>
                <Analytics/>
            </body>
        </html>
    )
}

export default Layout
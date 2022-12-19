import { Gazpacho } from "../styles/font_styles"
import "../styles/themes.css"
import "../styles/global_styles.css"

import Navigation from "./nav/navbar"

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <html lang="es" className={Gazpacho.variable}>
            <body>
                <Navigation/>
                {children}

                <footer>
                    <div style={{ margin: "2%", paddingBottom: "8px" }}>
                        <p>Creado con amor polo equipo cinemazarelos da facultade de Filosofía USC</p>
                    </div>
                </footer>
            </body>
        </html>
    )
}

export default Layout
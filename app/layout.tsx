import { Gazpacho } from "../styles/font_styles"
import "../styles/themes.css"
import "../styles/global_styles.css"

import Navigation from "../components/navbar"

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <html lang="es" className={Gazpacho.variable}>
            <body>
                <Navigation/>
                {children}
            </body>
        </html>
    )
}

export default Layout
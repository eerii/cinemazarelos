import StyledRegistry from "../styles/style_registry"
import Themed from "../styles/theme_provider"
import GlobalStyle from "../styles/global_styles"

import Navigation from "../components/navbar"

const Layout = ({children} : {children: React.ReactNode}) =>
<html lang="es">
    <body>
        <StyledRegistry>
            <Themed>
                <GlobalStyle/>
                <Navigation/>
                {children}
            </Themed>
        </StyledRegistry>
    </body>
</html>

export default Layout
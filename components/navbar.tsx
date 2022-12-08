import { NavItem, NavLogo, NavLinks, NavStyle } from "../styles/nav_styles"

const Navigation = () => {
    return <NavStyle>
        <NavLogo>cinemazarelos</NavLogo>
        <NavLinks>
            <NavItem>Inicio</NavItem>
            <NavItem>Programación</NavItem>
            <NavItem>Noticias</NavItem>
        </NavLinks>
    </NavStyle>
}

export default Navigation
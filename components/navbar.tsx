"use client"

import { NavItem, NavLogo, NavLogoFirst, NavLinks, NavStyle } from "../styles/nav_styles"
import Icon from "./icon"

const Navigation = () => {
    return <NavStyle>
        <NavLogo><NavLogoFirst>CineMa</NavLogoFirst>zarelos</NavLogo>
        <NavLinks>
            <NavItem>inicio</NavItem>
            <NavItem>programación</NavItem>
            <NavItem>sobre nós</NavItem>

            <Icon name="instagram" width="24px" style={{margin: "0 16px"}}/>
            <Icon name="film" width="24px"/>
            <Icon name="more-horizontal" width="24px" stroke-width="6px" style={{margin: "0 12px"}}/>
        </NavLinks>
    </NavStyle>
}

export default Navigation
import { createGlobalStyle } from "styled-components"

import { Gazpacho } from "../styles/font_styles"

const GlobalStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        color: ${ props => props.theme.colors.main };
        background-color: ${ props => props.theme.colors.background };
        font-family: sans-serif;
    }

    h1, h2, h3, h4 {
        font-family: ${Gazpacho.style.fontFamily};
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`

export default GlobalStyle
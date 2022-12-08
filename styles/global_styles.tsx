import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        color: ${ props => props.theme.colors.main };
        background-color: ${ props => props.theme.colors.background };
        font-family: sans-serif;
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
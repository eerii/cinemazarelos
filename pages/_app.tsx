import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"

import GlobalStyle from "../styles/global_styles"
import { ThemeList } from "../styles/themes"

import Navigation from "../components/navbar"

/*
 *  Página principal de Next.js
 */

const App = ({ Component, pageProps }: AppProps) => {
    // Selección del tema
    //  - Si no hay tema en localStorage, se usa el tema principal
    //  - Si hay tema en localStorage, se usa ese tema (se puede utilizar el tema secreto)
    const [theme, setTheme] = useState("main");
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        theme && setTheme(theme);
    }, [])

    // Página principal (utiliza el gestor de temas de styled-components)
    return <>
        <ThemeProvider theme={ThemeList[theme]}>
            <GlobalStyle/>
            <Navigation/>
            <Component {...pageProps}/>
        </ThemeProvider>
    </>
}

export default App
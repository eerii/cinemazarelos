"use client"

import { ThemeProvider } from "styled-components"
import { ThemeList } from "../styles/themes"

const Themed = ({children} : {children: React.ReactNode}) => 
    <ThemeProvider theme={ThemeList.main}>
        {children as React.ReactElement}
    </ThemeProvider>

export default Themed
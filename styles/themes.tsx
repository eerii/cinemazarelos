import { DefaultTheme } from 'styled-components'

/*
 * Definición de los temas de la web
 * Utiliza styled-components, para añadir las definiciones de tipos ver ../styled.d.ts
 */

export const MainTheme: DefaultTheme = {
    colors: {
        main: '#f081c7',
        secondary: '#f5d47a',
        background: '#262d4a',
        dark_background: '#191c29',
    },
}

export const SecretTheme: DefaultTheme = {
    colors: {
        main: '#262d4a',
        secondary: '#f5d47a',
        background: '#f081c7',
        dark_background: '#8a4570',
    }
}

export const ThemeList : { [key: string]: DefaultTheme } = {
    main: MainTheme,
    secret: SecretTheme,
}
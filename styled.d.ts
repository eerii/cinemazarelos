import 'styled-components';

// Extend the theme interface
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: string;
      secondary: string;
      background: string;
      dark_background: string;
    };
  }
}
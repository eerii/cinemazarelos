import localFont from "next/font/local"
import { Atkinson_Hyperlegible } from "next/font/google"

export const Gazpacho = localFont({
    src: [
        {
            path: "./fonts/gzpch_bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/gzpch_bold_italic.ttf",
            weight: "700",
            style: "italic",
        },
    ],
    variable: "--font-gazpacho",
})

export const AtkinsonHyperlegible = Atkinson_Hyperlegible({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-athy"
})

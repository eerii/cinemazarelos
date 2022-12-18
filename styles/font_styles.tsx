import localFont from "@next/font/local"

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
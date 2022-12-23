"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useWindowSize } from "../../(lib)/hooks"

import style from "./nav.module.css"

type PropsChild = {
    children: React.ReactNode[],
    className?: string
}

type PropsToggle = {
    onClick: () => void
}

const EstadoNavBar = ({ children } : { children: React.ReactNode[] }) => {
    const [menuDesplegado, setMenuDesplegado] = useState(false)
    const path = usePathname()
    const { width } = useWindowSize()
    
    // Ocultar el menú cuando se cambia de página
    useEffect(() => {
        setMenuDesplegado(false)
    }, [path])

    // Ocultar el menú cuando se cambia de tamaño de pantalla
    useEffect(() => {
        if (width && width > 768)
            setMenuDesplegado(false)
    }, [width])

    return (<>
        {React.Children.map(children, (child) => {
            if (!React.isValidElement<PropsChild>(child))
                return child

            // Mostrar o ocultar el menú
            if (child.props.className !== style.mobile_wrapper)
                return React.cloneElement(child, { className: `${child.props.className} ${menuDesplegado ? style.desplegado : null}` })

            // Añadir el comportamiento de desplegar el menú
            const [logo, toggle] = child.props.children
            if (React.isValidElement<PropsToggle>(toggle))
                return React.cloneElement(child, { children: [logo, React.cloneElement(toggle, { onClick: () => setMenuDesplegado(!menuDesplegado) })] })

            return child
        })}</>)
}

export default EstadoNavBar
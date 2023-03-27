"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useWindowSize } from "../../(lib)/hooks"

import style from "./carrousel.module.css"

import { PropsPelicula } from "./pelicula"
interface Pelicula extends PropsPelicula {
    children: React.ReactNode[]
}

const mobile_width = 768

const EstadoCarrousel = ({ children } : { children: React.ReactNode[] }) => {
    // Componente de cliente para poder utilizar el estado de react y cambiar el carrousel
    const [activo, setActivo] = useState(0)
    const [number, setNumber] = useState(3)
    const [mousePos, setMousePos] = useState({x: 0, y: 0})
    const {width} = useWindowSize()

    // Guardar la posición del ratón
    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMousePos({x: e.clientX, y: e.clientY})
    }

    // Efecto de gradiente en el carrousel
    const EfectoGradiente = useCallback(() => {
        for(const card of Array.from(document.getElementsByClassName(style.card)) as HTMLDivElement[]) {
            const rect = card.getBoundingClientRect(),
                     x = mousePos.x - rect.left,
                     y = mousePos.y - rect.top
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        }
    }, [mousePos])
    useEffect(EfectoGradiente, [mousePos, EfectoGradiente])
    useEffect(() => {
        const interval = setInterval(() => {
            EfectoGradiente()
        }, 500)
        return () => clearInterval(interval)
    }, [activo, EfectoGradiente])

    // Cambiar el carrousel cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setActivo((activo + 1) % number)
        }, 8000)
        return () => clearInterval(interval)
    }, [activo, number])

    // Cambiar el número de películas a mostrar en función del tamaño de la pantalla
    useEffect(() => {
        if (width) {
            const n = width > 1200 ? 3 : width > mobile_width ? 2 : 1
            setNumber(n)
            if (activo >= n)
                setActivo(0)
        }
    }, [activo, width])

    return (<div className={style.carrousel} onMouseMove={onMouseMove}>
        {React.Children.map(children, (child, index) => {
            if (index >= number)
                return null
            // Comprobar que el elemento sea una pelicula
            if (!React.isValidElement<Pelicula>(child))
                return child

            // Comprobar que tenga un poster y una descripcion
            const [poster, info] = child.props.children
            if (!React.isValidElement(poster) || !React.isValidElement(info))
                return child
            
            // Rodear el poster y la descripción con un div para poder cambiar el estado
            return (
                <div className={`${style.card} ${index !== activo ? style.inactiva : null}`} onClick={() => setActivo(index)}>
                    <div className={style.card_content}>
                        {poster}
                        <div className={style.informacion}>
                            {React.Children.map(info.props.children, (child, index) => child)}
                        </div>
                    </div>
                </div>)
        })}</div>)
}

export default EstadoCarrousel

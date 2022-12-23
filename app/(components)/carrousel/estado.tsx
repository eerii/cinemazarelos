"use client"

import React, { useEffect, useState } from "react"
import { useWindowSize } from "../../(lib)/hooks"

import style from "./carrousel.module.css"

import { PropsPelicula } from "./pelicula"
interface Pelicula extends PropsPelicula {
    children: React.ReactNode[]
}

const EstadoCarrousel = ({ children } : { children: React.ReactNode[] }) => {
    // Componente de cliente para poder utilizar el estado de react y cambiar el carrousel
    const [activo, setActivo] = useState(0)
    const [number, setNumber] = useState(3)
    const {width} = useWindowSize()

    // Cambiar el carrousel cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setActivo((activo + 1) % number)
        }, 5000)
        return () => clearInterval(interval)
    }, [activo, number])

    // Cambiar el número de películas a mostrar en función del tamaño de la pantalla
    useEffect(() => {
        if (width) {
            const n = width > 1200 ? 3 : width > 768 ? 2 : 1
            setNumber(n)
            if (activo >= n)
                setActivo(0)
        }
    }, [activo, width])

    return (<>
        {React.Children.map(children, (child, index) => {
            if (index >= number)
                return null
            // Comprobar que el elemento sea una pelicula
            if (!React.isValidElement<Pelicula>(child))
                return child

            // Comprobar que tenga un poster y una descripcion
            const [poster, info, sinopsis] = child.props.children
            if (!React.isValidElement(poster) || !React.isValidElement(info) || !React.isValidElement(sinopsis))
                return child
            
            // Rodear el poster y la descripción con un div para poder cambiar el estado
            return (
                <div className={`${style.card} ${index !== activo ? style.inactiva : null}`}>
                    <div onClick={() => setActivo(index)}>
                        {poster}
                    </div>
                    <div className={style.informacion}>
                        {info}
                        {!width || width > 768 ? sinopsis : null}
                    </div>
                    <div>
                        {width && width <= 768 ? sinopsis : null}
                    </div>
                </div>)
        })}</>)
}

export default EstadoCarrousel
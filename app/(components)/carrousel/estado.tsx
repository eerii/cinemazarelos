"use client"

import React, { useEffect, useState } from "react"

import style from "./carrousel.module.css"

import { PropsPelicula } from "./pelicula"
interface Pelicula extends PropsPelicula {
    children: React.ReactNode[]
}

const EstadoCarrousel = ({ children, n } : { children: React.ReactNode[], n: number }) => {
    // Componente de cliente para poder utilizar el estado de react y cambiar el carrousel
    const [activo, setActivo] = useState(0)
    const [previo, setPrevio] = useState(-1)

    const cambiarActivo = (nuevo: number) => {
        setPrevio(activo)
        setActivo(nuevo)
    }

    // Cambiar el carrousel cada 5 segundos
    useEffect(() => {
        /*const interval = setInterval(() => {
            cambiarActivo((activo + 1) % n)
        }, 5000)
        return () => clearInterval(interval)*/
    }, [activo])

    return (<>
        {React.Children.map(children, (child, index) => {
            // Comprobar que el elemento sea una pelicula
            if (!React.isValidElement<Pelicula>(child))
                return child

            // Comprobar que tenga un poster y una descripcion
            const [poster, descripcion] = child.props.children
            if (!React.isValidElement(poster) || !React.isValidElement(descripcion))
                return child
            
            // Rodear el poster y la descripción con un div para poder cambiar el estado
            return (
                <div className={`${style.card} ${index !== activo ? style.inactiva : null}`}>
                    <div onClick={() => cambiarActivo(index)}>
                        {poster}
                    </div>
                    <div className={style.descripcion}>
                        {descripcion}
                    </div>
                </div>)
        })}</>)
}

export default EstadoCarrousel
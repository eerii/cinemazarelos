"use client"

import { FormEvent } from 'react'

import style from "./lateral.module.css"

const RexistroCorreo = () => {
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data)
        alert("Isto aínda non funciona, desculpa as molestias!")
    }

    return (<div>
        <h2 className={style.title}>Recibe as nosas novas no teu correo</h2>
        <form className={style.card} onSubmit={submit}>
            <input type="email" required placeholder="Pronto estará dispoñibel..." name="correo"/>
            <button type="submit">Enviar</button>
        </form>
    </div>)
}

export default RexistroCorreo

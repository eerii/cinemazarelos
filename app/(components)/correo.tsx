"use client"

import { FormEvent } from "react"

import Card from "./card/card"
import style from "../(styles)/main.module.css"

const RexistroCorreo = () => {
    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log(data)
        alert("Isto aínda non funciona, desculpa as molestias!")
    }

    return (<div>
        <h2 className={style.title}>Recibe as nosas novas no teu correo</h2>
        <Card>
            <form onSubmit={submit}>
                <input type="email" required placeholder="Pronto estará dispoñibel..." name="correo"/>
                <button type="submit">Enviar</button>
            </form>
        </Card>
    </div>)
}

export default RexistroCorreo

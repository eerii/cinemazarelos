"use client"

import { useRouter } from "next/navigation"

export default () => {
    const router = useRouter()
    router.push("/")

    return (
        <main>
            <h1>404 - Artículo no encontrado</h1>
        </main>
    )
}
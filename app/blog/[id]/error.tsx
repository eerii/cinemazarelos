"use client"

import { useRouter } from "next/navigation"

const Error = () => {
    const router = useRouter()
    router.push("/")

    return (
        <main>
            <h1>404 - Artículo no encontrado</h1>
        </main>
    )
}

export default Error
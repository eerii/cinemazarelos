import SupabaseClient from "./supabase"
import { DatosPelicula } from "../tmdb"

export const revalidate = 21600 // Cada 6 horas

export default async ({ propiedades, n = 1, poster = false, orden = "id", asc = true }: { propiedades: string, n?: number, poster?: boolean, orden?: string, asc?: boolean }) => {
    if (!SupabaseClient) return Array(n).fill(null)
    
    // Obtener las películas de la base de datos
    const { data, error } = await SupabaseClient
        .from("peliculas")
        .select(propiedades + (poster ? ", poster" : ""))
        .order(orden, { ascending: asc })
        .limit(n)

    if (error) {
        console.error("Error al obtener las peliculas: ", error)
        return Array(n).fill(null)
    }

    // Completar la información que no se encuentra con la API de TMDB
    let peliculas = await Promise.all(data.map(async (pelicula : any) => {
        if (!pelicula?.sinopsis || !pelicula?.sinopsis_es || !pelicula?.idioma || !pelicula?.duracion) {
            const data = await DatosPelicula({ titulo: pelicula.titulo, year: pelicula.year })
            if (data) {
                const actualizarPelicula = async (campo: string) => {
                    if (!SupabaseClient)
                        return

                    if (campo in pelicula && !pelicula[campo] && campo in data && data[campo as keyof typeof data]) {
                        pelicula[campo] = data[campo as keyof typeof data]
                        const { error } = await SupabaseClient
                            .from("peliculas")
                            .update({ [campo]: data[campo as keyof typeof data] })
                            .eq("id", pelicula.id)
                        if (error)
                            console.error("Error al actualizar la base de datos: ", error)
                        console.log(`Actualizado ${campo} de ${pelicula.titulo} (${pelicula.year})`)
                    }
                }

                await actualizarPelicula("sinopsis_es")
                await actualizarPelicula("sinopsis")
                await actualizarPelicula("idioma")
                await actualizarPelicula("duracion")
            }
        }
        return pelicula
    }))

    // Obtener los posters de la base de datos
    if (poster) {
        const { data, error } = await SupabaseClient.storage
            .from("posters")
            .list()

        if (error) {
            console.error("Error al obtener los posters: ", error)
        }

        peliculas = peliculas.map((pelicula : any) => {
            const poster = data?.find((poster : any) => poster.id == pelicula.poster)
            if (poster && SupabaseClient) {
                const url = SupabaseClient.storage.from("posters").getPublicUrl(poster.name)
                return { ...pelicula, poster: url }
            } else {
                return pelicula
            }
        })
    }

    return peliculas
}
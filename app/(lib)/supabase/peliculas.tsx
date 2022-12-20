import SupabaseClient from "./supabase"
import { DatosPelicula } from "../tmdb"

export const revalidate = 3600

export default async ({ propiedades, n, poster, orden, asc }: { propiedades: string, n?: number, poster?: boolean, orden?: string, asc?: boolean }) => {
    // Obtener las películas de la base de datos
    const { data, error } = await SupabaseClient
        .from("peliculas")
        .select(propiedades + (poster ? ", poster" : ""))
        .order(orden ? orden : "id", { ascending: asc })
        .limit(n ? n : 1)

    // Completar la información que no se encuentra con la API de TMDB
    if (error || !data) {
        console.error("Error al obtener las peliculas: ", error)
        return null
    }

    let peliculas = await Promise.all(data.map(async (pelicula : any, index) => {
        if (!pelicula?.sinopsis || !pelicula?.sinopsis_es || !pelicula?.idioma || !pelicula?.duracion) {
            const data = await DatosPelicula({ titulo: pelicula.titulo, year: pelicula.year })
            if (data) {
                const actualizarPelicula = async (campo: string) => {
                    if (campo in pelicula && !pelicula[campo] && campo in data && data[campo as keyof typeof data]) {
                        pelicula[campo] = data[campo as keyof typeof data]
                        const { error } = await SupabaseClient
                            .from("peliculas")
                            .update({ [campo]: data[campo as keyof typeof data] })
                            .eq("id", pelicula.id)
                        if (error) {
                            console.error(error)
                        }
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

    if (poster) {
        const { data, error } = await SupabaseClient.storage
            .from("posters")
            .list()

        if (error || !data) {
            console.error("Error al obtener los posters: ", error)
        }

        peliculas = peliculas.map((pelicula : any) => {
            const poster = data?.find((poster : any) => poster.id == pelicula.poster)
            if (poster) {
                const url = SupabaseClient.storage.from("posters").getPublicUrl(poster.name)
                return { ...pelicula, poster: url }
            } else {
                return pelicula
            }
        })
    }

    return peliculas
}
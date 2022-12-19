import fs from "fs";
import { join, extname } from "path";

export type Post = {
    id: string,
    title: string,
    date?: string,
}

export const getPosts = async (): Promise<Post[]> => {
    // Directorio de los posts
    const path = join(process.cwd(), "app/blog/[id]")

    // Obtener los posts
    const names = fs.readdirSync(path).filter((post) => extname(post) == ".md" || extname(post) == ".mdx")
    const posts = await Promise.all(names.map(async (post) => {
        // Id de la ruta dinámica del post
        const id = post.split(".")[0];

        // Frontmatter del post
        const frontmatter = (await import(`../blog/[id]/${id}.mdx`)).frontmatter

        return {
            id: id,
            title: frontmatter.title,
            date: frontmatter.date,
        };
    }))

    return posts;
}
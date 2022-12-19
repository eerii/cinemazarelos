import { getPosts } from "../../(lib)/get_posts"

export default async ({ params } : { params: {id: string} }) => {
    const Content = (await import(`./${params.id}.mdx`)).default
    const frontmatter = (await import(`./${params.id}.mdx`)).frontmatter

    return(
        <main>
            <Content/>
        </main>
    )
}

export const generateStaticParams = async () => {
    const posts = await getPosts()

    return posts.map((post) => ({
        id: post.id,
    }))
}
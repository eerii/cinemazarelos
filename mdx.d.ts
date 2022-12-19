declare module "*.mdx" {
    import type { MDXProps } from "mdx/types"

    export const frontmatter: {
        title: string,
        date?: string,
        description?: string,
        author?: string,
        tags?: string[],
    }
    
    export default function MDXContent(props: MDXProps): JSX.Element
}
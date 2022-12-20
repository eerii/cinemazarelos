import NextMDX from "@next/mdx"
import remarkFrontmatter from "remark-frontmatter"
import remarkFrontmatterParse from "@stefanprobst/remark-extract-yaml-frontmatter"
import remarkFrontmatterParseMDX from "@stefanprobst/remark-extract-yaml-frontmatter/mdx"

const withMDX = NextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: 
            [remarkFrontmatter,
             remarkFrontmatterParse,
             remarkFrontmatterParseMDX,
             [remarkFrontmatterParseMDX, { name: 'frontmatter' }]],
        rehypePlugins: [],
        providerImportSource: undefined,
    },
})

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    
    experimental: {
        appDir: true,
    },

    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "**.supabase.co",
            pathname: "/storage/v1/object/public/posters/**",
        },]
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        })

        return config
    },
}

export default withMDX(nextConfig)
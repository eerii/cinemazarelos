import Link from "next/link";
import { getPosts, Post } from "../(lib)/get_posts";

export default async () => {
    const posts = await getPosts();

    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map((post : Post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>{post.title} {post.date ? (post.date) : ""}</Link>
                </li>
                ))}
            </ul>
        </main>
    );
  }
  
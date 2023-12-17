import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";

export default function Blog() {
  const posts = allPosts;

  return (
    <>
      <h1 className="mt-24 text-7xl font-semibold">Blog</h1>
      <div className="py-4" />
      <div className="grid grid-cols-1 gap-8 sm:grid sm:grid-cols-4">
        {posts.map((post) => (
          <Link key={post._id} href={post.url} className="flex-1 group">
            <h3 className="font-semibold underline underline-offset-4 decoration-gray-300 group-hover:decoration-gray-500 transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 balance">{post.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

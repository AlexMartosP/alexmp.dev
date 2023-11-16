import { Post } from "contentlayer/generated";
import Link from "next/link";

export default function PostItem({ post }: { post: Post }) {
  return (
    <Link href={post.url} className="flex-1 group">
      <h3 className="font-semibold underline underline-offset-4 decoration-gray-300 group-hover:decoration-gray-500 transition-colors">
        {post.title}
      </h3>
      <p className="mt-2 balance">{post.description}</p>
    </Link>
  );
}

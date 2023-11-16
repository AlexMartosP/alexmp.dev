import { getPostBySlug } from "@/lib/blog";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  console.log("in generateMeta data", params.slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      url: post.url,
    },
  };
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  console.log("in render post", params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="sm:w-3/6 sm:mx-auto">
      <h1 className="mt-24 text-4xl font-semibold">{post.title}</h1>
      <div className="py-2" />
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  );
}

export function generateStaticParams() {
  console.log("in generateStaticParams");
  const posts = allPosts;

  return posts.map((post) => ({ slug: post._raw.flattenedPath }));
}

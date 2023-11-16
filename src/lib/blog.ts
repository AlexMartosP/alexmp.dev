import { allPosts } from "contentlayer/generated";

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post._raw.flattenedPath === slug);
}

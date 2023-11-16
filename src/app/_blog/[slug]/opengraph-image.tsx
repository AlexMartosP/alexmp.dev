import { getPostBySlug } from "@/lib/blog";
import { getFonts } from "@/lib/getFonts";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const fonts = await getFonts();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "8rem",
          backgroundColor: "white",
        }}
      >
        <span>
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.date))}
        </span>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            marginTop: "2rem",
          }}
        >
          <span style={{ fontSize: "4rem", fontWeight: 600 }}>
            {post.title}
          </span>
          <span
            style={{ fontSize: "1rem", fontWeight: 400, marginTop: "1rem" }}
          >
            {post.description}
          </span>
        </div>
        <span style={{ marginTop: "4rem", fontSize: "1rem", fontWeight: 400 }}>
          alexmp.dev
        </span>
        <div
          style={{
            width: 75,
            height: 75,
            backgroundColor: "#FFBF3D",
            borderRadius: "50vh",
            position: "absolute",
            bottom: "8rem",
            right: "8rem",
          }}
        ></div>
      </div>
    ),
    {
      fonts: [
        {
          name: "OpenSauceOne",
          data: fonts[0],
          weight: 400,
          style: "normal",
        },
        {
          name: "OpenSauceOne",
          data: fonts[1],
          weight: 500,
          style: "normal",
        },
        {
          name: "OpenSauceOne",
          data: fonts[2],
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}

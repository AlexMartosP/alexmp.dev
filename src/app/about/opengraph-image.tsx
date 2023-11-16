import { getFonts } from "@/lib/getFonts";
import { ImageResponse } from "next/og";
import OpenGraph from "../OpenGraph";

export const alt = "About me";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/jpg";
export const runtime = "edge";

export default async function Image() {
  const fonts = await getFonts();

  return new ImageResponse(<OpenGraph pageName="About" />, {
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
  });
}

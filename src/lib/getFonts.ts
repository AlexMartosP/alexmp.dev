export async function getFonts() {
  const fonts = await Promise.all([
    fetch(
      new URL("/public/fonts/OpenSauceOne-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("/public/fonts/OpenSauceOne-Medium.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("/public/fonts/OpenSauceOne-SemiBold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer()),
  ]);

  return fonts;
}

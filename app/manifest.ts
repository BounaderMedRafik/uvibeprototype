import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "UVIBE",
    short_name: "UVIBE",
    description:
      "Feel the vibe. UVIBE connects you with people, passions, and places that match your energy. Discover trends, express yourself, and stay in sync with your world—all in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f", // deep dark background for immersive UI
    theme_color: "#e24f85", // modern vibrant pink/red-violet tone
    icons: [
      {
        src: "/brand/192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

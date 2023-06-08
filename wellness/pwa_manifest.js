import { VitePWA } from "vite-plugin-pwa";

const pwaManifest = VitePWA({
  registerType: "autoUpdate",
  manifest: {
    name: "Wellness Timer",
    short_name: "Timer",
    start_url: ".",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#85B1FF",
    icons: [
      {
        src: "lotus_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "lotus_x512_mask.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "lotus_x512_mask.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "lotus_x192_mask.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "lotus_x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
});

export default pwaManifest;

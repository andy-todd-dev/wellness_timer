import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pwaManifest from "./pwa_manifest";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react(), pwaManifest],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.js",
    },
    server: {
      port: 3000,
      strictPort: true,
      host: "0.0.0.0",
    },
  };
});

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Separate Vite config for GitHub Pages (SPA / static build).
// Does NOT use tanstackStart() because GitHub Pages can't run a Node server.
export default defineConfig({
  // Must match the GitHub repo name so asset paths resolve correctly.
  // Live URL: https://joxyle-jhon.github.io/frontend-rules/
  base: "/frontend-rules/",

  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    react(), // plain React plugin — no SSR / Vinxi
  ],

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Entry is the root index.html (standard Vite SPA behaviour)
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this repo from a sub-path. App.tsx reads the same
  // value via import.meta.env.BASE_URL for the router basename, so changing
  // it here is enough. See CLAUDE.md.
  base: "/basement-bazaar/",

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

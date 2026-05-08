// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react-swc";
// // import path from "path";
// // import { componentTagger } from "lovable-tagger";

// // // https://vitejs.dev/config/
// // export default defineConfig(({ mode }) => ({
// //   server: {
// //     host: "::",
// //     port: 8080,
// //   },
// //   plugins: [
// //     react(),
// //     mode === 'development' &&
// //     componentTagger(),
// //   ].filter(Boolean),
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"),
// //     },
// //   },
// // }));



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   // Set the base path to match your GitHub repository name
//   // base: "", 
//   base: "/basement-bazaar/",
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [
//     react(),
//     mode === 'development' &&
//     componentTagger(),
//   ].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // This is the most important line! 
  // It MUST be exactly "/basement-bazaar/"
  base: "/basement-bazaar/", 
  
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
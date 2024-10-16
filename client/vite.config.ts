import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000/api/v1", // API server running on localhost:5000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove /api/v1 prefix when forwarding to the backend
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // keep only actual plugins in this array
    // Add conditional plugins here if needed, e.g.,
    // mode === 'development' && someDevPlugin()
  ].filter(Boolean),  // this line is fine, used to remove falsey entries
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

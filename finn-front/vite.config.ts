import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { config } from "dotenv";


// https://vite.dev/config/
config();
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'index.html'),
      },
      output: {
        dir: 'dist/client',
      },
    },
  },
  ssr: {
    noExternal: [/^@?radix-ui\//, 'sonner'],
  },
})

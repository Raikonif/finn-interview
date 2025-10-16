import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: `[name].js`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

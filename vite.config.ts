import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import injectHtml from 'vite-plugin-inject-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectHtml({})],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/frontend/dist/index.html',
    },
  },
  server: {
    https: true,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/dist/assets/index-a13dd5e7.js',
    },
  },
  server: {
    proxy: {
      '/socket.io/': {
        target: process.env.API_PROXY_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});

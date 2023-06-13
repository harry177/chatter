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
      input: '/frontend/dist/index.html',
    },
  },
  server: {
    proxy: {
      '/socket.io/': {
        target: 'https://chatter-project.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});

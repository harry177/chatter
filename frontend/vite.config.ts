import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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

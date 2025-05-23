// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        utils: resolve(__dirname, 'utils.html'),
        cesta: resolve(__dirname, 'cesta.html'),
        producto: resolve(__dirname, 'producto.html')
      },
    },
  },
});

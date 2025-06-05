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
        cesta_cliente: resolve(__dirname, 'cesta_cliente.html'),
        crear_cesta: resolve(__dirname, 'crear_cesta.html'),
        gestion_productos: resolve(__dirname, 'gestion_productos.html'),
        producto: resolve(__dirname, 'producto.html')
      },
    },
  },
  server: {
    host: true,
    allowedHosts: ['.ngrok-free.app'], // permite todos los subdominios de ngrok
  },
});
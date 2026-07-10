import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  build: {
    rollupOptions: {
        output: {
            manualChunks: {
                exceljs: ['exceljs'], 
            },
        },
    },
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',  
        'resources/js/index.jsx', 
      ],
      refresh: true, 
    }),
    react(),  
  ],
  server: {
    proxy: {
      '/app': 'http://localhost:8000',
    }, 

  },
});

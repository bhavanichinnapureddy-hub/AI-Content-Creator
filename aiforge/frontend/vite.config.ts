import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Minify and optimize for production
    minify: 'esbuild',
    sourcemap: false, // Never expose source maps in production
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          charts: ['recharts'],
          ui: ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
  // Prevent environment variables from being exposed to the frontend
  // Only VITE_ prefixed variables are exposed
  envPrefix: 'VITE_',
});

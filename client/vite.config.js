import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  plugins: [wasm()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/katana': {
        target: 'http://127.0.0.1:5050',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/katana/, ''),
      }
    }
  }
});
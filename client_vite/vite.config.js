import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //inject({ $: 'jquery', jQuery: 'jquery', }),
    react(), nodePolyfills()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5000/",
        changeOrigin: true,
        secure: false,
      },
    },
  }
})

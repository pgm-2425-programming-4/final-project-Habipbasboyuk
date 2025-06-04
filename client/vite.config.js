import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  server: {
    host: true, // Allows access from network (LAN)
    port: 5173, // You can change this if needed
    open: true, // Opens browser on dev start
  },
})

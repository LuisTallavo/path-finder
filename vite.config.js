import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/path-finder/",
  server: {
    port: 3000,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// import { assetsInclude } from 'vite-plugin-assets-include'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // assetsInclude(['**/*.png']),
  ],
})

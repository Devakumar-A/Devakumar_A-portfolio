import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Automatically detects repository name in GitHub Actions or falls back to Devakumar_A-portfolio
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : process.env.BASE_PATH || "/Devakumar_A-portfolio/",
})

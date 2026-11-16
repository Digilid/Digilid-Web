import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` → normal multi-file build for hosting.
// `npm run build:single` → one self-contained index.html (used for the preview link).
// base './' makes asset paths relative, so the build works on GitHub Pages
// (served from /<repo-name>/), a custom domain, Netlify, Vercel or cPanel alike.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}))

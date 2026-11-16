import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Plugin to ensure Vite always compiles from /src/main.jsx (in both dev & build),
// even when root index.html points to precompiled assets for direct GitHub Pages branch hosting.
function htmlBranchDeployPlugin() {
  return {
    name: 'html-branch-deploy-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace(/<link rel="stylesheet" crossorigin href="\.\/assets\/[^"]+">/g, '')
          .replace(
            /<script type="module" crossorigin src="\.\/assets\/[^"]+"><\/script>/g,
            '<script type="module" src="/src/main.jsx"></script>'
          )
      },
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    htmlBranchDeployPlugin(),
    react(),
    ...(mode === 'single' ? [viteSingleFile()] : []),
  ],
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}))

// GitHub Pages has no server-side rewrite for client-side routes. Copying
// the built index.html to 404.html means GH Pages serves the SPA shell for
// any unmatched path (e.g. a direct load of /problems); React Router then
// reads the real URL from window.location and renders the right route.
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '..', 'dist')

copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'))
console.log('Copied dist/index.html -> dist/404.html for GitHub Pages SPA fallback.')

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path for GitHub Pages. `my_portfolio` (the Flutter project this was
// migrated from) has no pushed GitHub remote yet, so there's no existing
// live URL to match -- this defaults to the new repo's likely name.
// Change this to `/<your-repo-name>/` once you've created/named the repo.
const BASE_PATH = '/'

export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
})

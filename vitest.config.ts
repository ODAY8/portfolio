import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts: vitest's Vite-config type augmentation
// doesn't line up with this project's (very new) Vite major version, so
// merging a `test` field into defineConfig() there fails to typecheck.
export default defineConfig({
  base: '/portfolio-react/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})

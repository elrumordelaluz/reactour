import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [new URL('./vitest.setup.ts', import.meta.url).pathname],
    include: ['__tests__/**/*.test.{ts,tsx}'],
    css: false,
  },
})

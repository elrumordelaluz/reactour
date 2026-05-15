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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      include: ['**/*.{ts,tsx}'],
      exclude: [
        '**/__tests__/**',
        '**/dist/**',
        '**/node_modules/**',
        '**/*.d.ts',
        '**/index.tsx',
        '**/types.tsx',
        '**/styles.tsx',
        '**/build.config.ts',
        '**/vitest.config.ts',
      ],
    },
  },
})

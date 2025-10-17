import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

// https://vitest.dev/config/
export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src-docs/',
        'dist/',
        'docs/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
        'src/Meta.ts',
        'src/helpers/h-demi.ts',
      ],
    },
  },
});

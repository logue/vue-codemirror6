import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  extends: withRslibConfig(),
  testEnvironment: 'happy-dom',
  coverage: {
    provider: 'v8',
    exclude: [
      'node_modules/',
      'src/docs/',
      'dist/',
      'docs/',
      '**/*.d.ts',
      '**/*.config.*',
      '**/mockData/**',
      'src/Meta.ts',
      'src/helpers/h-demi.ts',
    ],
  },
});

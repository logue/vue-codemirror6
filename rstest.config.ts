import { withRslibConfig } from '@rstest/adapter-rslib';
import { defineConfig } from '@rstest/core';

export default defineConfig({
  extends: withRslibConfig(),
  testEnvironment: 'happy-dom',
  source: {
    tsconfigPath: './tsconfig.rstest.json',
  },
});

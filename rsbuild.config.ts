/** For build documentation site use. */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from '@rsbuild/core';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueDevTools } from '@vue-devtools-rstack/rsbuild';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  name: string;
  version: string;
};
const buildDate = new Date().toISOString();

export default defineConfig({
  plugins: [
    pluginTypeCheck({
      tsCheckerOptions: {
        // vue-tsc-api is a drop-in replacement for vue-tsc that uses
        // the TypeScript API directly, which is faster and more efficient
        // than spawning a separate process.
        typescript: {
          // point to the installed `typescript` package so the plugin
          // can read `typescript.version` correctly
          typescriptPath: createRequire(import.meta.url).resolve('typescript'),
        },
      },
    }),
    pluginVue(),
    pluginVueDevTools(),
  ],
  output: {
    distPath: {
      root: 'docs',
    },
    assetPrefix: './',
    filenameHash: true,
  },
  html: {
    template: './index.html',
  },
  source: {
    tsconfigPath: './tsconfig.rsbuild.json',
    include: [
      './src',
    ],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
    entry: {
      index: './src-docs/index.ts',
    },
  },
});

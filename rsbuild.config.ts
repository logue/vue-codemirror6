/** For build documentation site use. */

import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginVue } from '@rsbuild/plugin-vue';

import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import { pluginVueDevTools } from '@vue-devtools-rstack/rsbuild';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  name: string;
  version: string;
};
const buildDate = new Date().toISOString();

export default defineConfig({
  plugins: [
    pluginNodePolyfill(),
    pluginTypeCheck(),
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
    template: './src-docs/index.html',
  },
  tools: {
    rspack: (config) => {
      config.module.rules?.unshift({
        test: /\.vue$/,
        resourceQuery: /source/,
        use: [
          {
            loader: fileURLToPath(
              new URL(
                './src-docs/loaders/vue-source-loader.js',
                import.meta.url,
              ),
            ),
          },
        ],
      });
      return config;
    },
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

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const buildDate = new Date().toISOString();

console.log('Injected version:', packageJson.version);
console.log('Injected build date:', buildDate);

// Docs: https://rsbuild.rs/config/
// Demo build configuration - for library build, see rslib.config.ts
export default defineConfig({
  plugins: [
    pluginVue(),
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
          // Allow bare imports such as `bootstrap/scss/functions` to resolve from node_modules.
          loadPaths: [resolve(__dirname, 'node_modules')],
        },
      },
    }),
  ],
  source: {
    define: {
      __DEMO_BUILD__: JSON.stringify(true),
      __APP_VERSION__: JSON.stringify(packageJson.version),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
    entry: {
      index: './src/docs/index.ts',
    },
  },
  output: {
    distPath: 'docs',
  },
  html: {
    template: './index.html',
  },
  tools: {
    htmlPlugin: undefined,
    rspack: {
      module: {
        rules: [
          {
            resourceQuery: /url$/,
            type: 'asset/resource',
          },
          {
            resourceQuery: /raw$/,
            type: 'asset/source',
          },
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Self-reference so demo components can `import CodeMirror from 'vue-codemirror6'`
      // exactly as a real consumer of the published package would.
      'vue-codemirror6': resolve(__dirname, 'src'),
    },
  },
});

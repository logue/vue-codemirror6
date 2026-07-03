import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rsbuild/core';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

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
    pluginNodePolyfill(),
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
    rspack: config => {
      // 1. 既存のVueコンパイルルールを探し、`?source` がある場合は「除外」する設定を追加
      config.module?.rules?.forEach(rule => {
        if (
          rule &&
          typeof rule === 'object' &&
          rule.test &&
          rule.test.toString().includes('vue')
        ) {
          // クエリに "source" が含まれる場合は、このVueコンパイルルールを適用させない
          rule.resourceQuery = { not: [/source/] };
        }
      });

      // 2. `?source` 専用のルールを先頭に追加（Vueコンパイルをバイパスして生テキスト化）
      config.module?.rules?.unshift({
        test: /\.vue$/,
        resourceQuery: /^\?source$/,
        type: 'asset/source',
      });
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

import { writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import Vue from '@vitejs/plugin-vue';
import { defineConfig, type UserConfig } from 'vite';

import { visualizer } from 'rollup-plugin-visualizer';
import banner from 'vite-plugin-banner';
import { checker } from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }): UserConfig => {
  const config: UserConfig = {
    base: './',
    publicDir: command === 'serve' ? 'public' : false,
    // Resolver
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
        'vue-codemirror6': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      Vue(),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        // vueTsc: true,
        // eslint: { lintCommand: 'eslint' },
      }),
      // vite-plugin-banner
      // https://github.com/chengpeiquan/vite-plugin-banner
      banner(`/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @copyright 2022-2025 By Masashi Yoshikawa All rights reserved.
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @see {@link ${pkg.homepage}}
 */
`),
      // vite-plugin-dts
      // https://github.com/qmhc/vite-plugin-dts
      mode === 'docs'
        ? undefined
        : dts({ tsconfigPath: './tsconfig.app.json' }),
    ],
    optimizeDeps: {
      exclude: [
        'vue-demi',
        // https://github.com/codemirror/dev/issues/608
        '@codemirror/state',
      ],
    },
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
      outDir: mode === 'docs' ? 'docs' : undefined,
      lib:
        mode === 'docs'
          ? undefined
          : {
              entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
              name: 'CodeMirror',
              formats: ['umd', 'es', 'iife'],
              fileName: format => `index.${format}.js`,
            },

      rollupOptions: {
        plugins: [
          mode === 'analyze'
            ? // rollup-plugin-visualizer
              // https://github.com/btd/rollup-plugin-visualizer
              visualizer({
                open: true,
                filename: 'stats.html',
                gzipSize: false,
                brotliSize: false,
              })
            : undefined,
        ],
        external:
          mode === 'docs'
            ? undefined
            : [
                '@codemirror/autocomplete',
                '@codemirror/commands',
                '@codemirror/language',
                '@codemirror/lint',
                '@codemirror/search',
                '@codemirror/state',
                '@codemirror/view',
                'codemirror',
                'style-mod',
                'vue-demi',
                'vue',
              ],
        output: {
          esModule: true,
          generatedCode: {
            reservedNamesAsProps: false,
          },
          interop: 'compat',
          systemNullSetters: false,
          exports: 'named',
          globals: {
            '@codemirror/autocomplete': 'autocomplete',
            '@codemirror/commands': 'commands',
            '@codemirror/language': 'language',
            '@codemirror/lint': 'lint',
            '@codemirror/search': 'search',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            'style-mod': 'styleMod',
            'vue-demi': 'VueDemi',
            codemirror: 'codemirror',
            vue: 'Vue',
          },
          manualChunks:
            mode !== 'docs'
              ? undefined
              : (id: string) => {
                  if (
                    id.includes('/node_modules/@vue/') ||
                    id.includes('/node_modules/vue')
                  ) {
                    return 'vue';
                  }

                  if (id.includes('/node_modules/eslint-linter-browserify/')) {
                    return 'eslint-linter-browserify';
                  }

                  // CodeMirror6
                  if (
                    id.includes('/node_modules/codemirror/') ||
                    id.includes('/node_modules/@codemirror/') ||
                    id.includes('/node_modules/style-mod/')
                  ) {
                    // Split CodeMirror and CodeMirror language into separate chunks
                    return !/lang-/.exec(id) ? 'codemirror' : 'codemirror-lang';
                  }

                  if (id.includes('/node_modules/')) {
                    // Other chunks
                    return 'vendor';
                  }
                },
        },
      },
      // Minify option
      target: 'esnext',
      // minify: mode === 'docs',
    },
  };

  // Write meta data.
  writeFileSync(
    fileURLToPath(new URL('./src/Meta.ts', import.meta.url)),
    `import type MetaInterface from '@/interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${pkg.version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
  );

  // Export vite config
  return config;
});

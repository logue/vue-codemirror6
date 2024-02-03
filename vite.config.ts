import { fileURLToPath, URL } from 'node:url';
import { writeFileSync } from 'node:fs';

import { checker } from 'vite-plugin-checker';
import { defineConfig, type UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import banner from 'vite-plugin-banner';
import dts from 'vite-plugin-dts';
import Vue from '@vitejs/plugin-vue';

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
    // https://vitejs.dev/config/#server-options
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    plugins: [
      Vue(),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        // vueTsc: true,
        eslint: { lintCommand: 'eslint' },
      }),
      // vite-plugin-banner
      // https://github.com/chengpeiquan/vite-plugin-banner
      banner(`/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @copyright 2022-2024 By Masashi Yoshikawa All rights reserved.
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @see {@link ${pkg.homepage}}
 */
`),
      // vite-plugin-dts
      // https://github.com/qmhc/vite-plugin-dts
      mode === 'docs' ? undefined : dts(),
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
                'vue',
                'vue-demi',
                'codemirror',
                '@codemirror/autocomplete',
                '@codemirror/commands',
                '@codemirror/language',
                '@codemirror/lint',
                '@codemirror/search',
                '@codemirror/state',
                '@codemirror/view',
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
            codemirror: 'codemirror',
            '@codemirror/commands': 'commands',
            '@codemirror/language': 'language',
            '@codemirror/lint': 'lint',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            'vue-demi': 'VueDemi',
            vue: 'Vue',
          },
          manualChunks:
            mode !== 'docs'
              ? undefined
              : {
                  vue: ['vue'],
                  eslint: ['eslint-linter-browserify'],
                  codemirror: [
                    'codemirror',
                    '@codemirror/autocomplete',
                    '@codemirror/commands',
                    '@codemirror/language',
                    '@codemirror/lint',
                    '@codemirror/search',
                    '@codemirror/state',
                    '@codemirror/view',
                  ],
                  // Add the following as needed.
                  'codemirror-lang': [
                    '@codemirror/lang-markdown',
                    '@codemirror/lang-javascript',
                    '@codemirror/lang-json',
                    '@codemirror/lang-vue',
                  ],
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

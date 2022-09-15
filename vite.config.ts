import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Vue from '@vitejs/plugin-vue';
import banner from 'vite-plugin-banner';
import path from 'path';
const pkg = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, command }): Promise<UserConfig> => {
  const config: UserConfig = {
    resolve: {
      // https://vitejs.dev/config/#resolve-alias
      alias: [
        {
          // vue @ shortcut fix
          find: '@/',
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
      ],
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
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint',
        },
      }),
      // vite-plugin-banner
      // https://github.com/chengpeiquan/vite-plugin-banner
      banner(`/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @copyright 2022 By Masashi Yoshikawa All rights reserved.
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @see {@link ${pkg.homepage}}
 */
`),
    ],
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
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
                filename: 'dist/stats.html',
                gzipSize: true,
                brotliSize: true,
              })
            : undefined,
        ],
        external: [
          'vue',
          'lodash',
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
          exports: 'named',
          globals: {
            codemirror: 'codemirror',
            '@codemirror/commands': 'commands',
            '@codemirror/language': 'language',
            '@codemirror/lint': 'lint',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            'vue-demi': 'VueDemi',
            lodash: 'lodash',
            vue: 'Vue',
          },
        },
      },
      // Minify option
      target: 'esnext',
      minify: false,
    },
    esbuild: {
      // drop: command === 'serve' ? [] : ['console'],
    },
  };

  // Export vite config
  return config;
});

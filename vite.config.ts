import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const config: UserConfig = {
    resolve: {
      // https://vitejs.dev/config/#resolve-alias
      alias: [
        {
          // vue @ shortcut fix
          find: '@/',
          replacement: `${path.resolve(__dirname, './src')}/`,
        },
        {
          find: 'src/',
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
      checker({ typescript: true, vueTsc: true }),
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
        fileName: format => `vue-codemirror6.${format}.js`,
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
          '@codemirror/state',
          '@codemirror/view',
          '@codemirror/lint',
          '@codemirror/commands',
          '@codemirror/language',
          '@codemirror/basic-setup',
        ],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            lodash: 'lodash',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            '@codemirror/commands': 'commands',
            '@codemirror/language': 'language',
            '@codemirror/basic-setup': 'basicSetup',
            'vue-demi': 'VueDemi',
          },
        },
      },
      target: 'es2021',
      /*
      // Minify option
      // https://vitejs.dev/config/#build-minify
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        parse: {},
        compress: { drop_console: true },
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: true,
        output: { comments: true, beautify: false },
      },
      */
    },
  };

  // Export vite config
  return config;
});

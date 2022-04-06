import eslintPlugin from '@modyqyw/vite-plugin-eslint';
import { defineConfig, UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
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
    // createVuePlugin({ target: 'esnext' }),
    // eslint
    // https://github.com/ModyQyW/vite-plugin-eslint
    eslintPlugin({
      // fix: true,
    }),
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
      external: [
        'vue',
        'lodash',
        'vue-demi',
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/lint',
        '@codemirror/language',
      ],
      output: [
        {
          format: 'es',
          esModule: true,
          exports: 'named',
          globals: {
            vue: 'Vue',
            lodash: 'lodash',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            'vue-demi': 'VueDemi',
          },
        },
        {
          format: 'umd',
          inlineDynamicImports: true,
          interop: 'esModule',
          exports: 'named',
          globals: {
            vue: 'Vue',
            lodash: 'lodash',
            '@codemirror/state': 'state',
            '@codemirror/view': 'view',
            'vue-demi': 'VueDemi',
          },
        },
      ],
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
export default defineConfig(config);

import { defineConfig, type UserConfig } from 'vite';
import checker from 'vite-plugin-checker';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
const config: UserConfig = {
  base: './',
  // Resolver
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
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-demi'],
          lodash: ['lodash'],
          codemirror: [
            '@codemirror/state',
            '@codemirror/view',
            '@codemirror/basic-setup',
            '@codemirror/lang-html',
            '@codemirror/lang-javascript',
            '@codemirror/lang-markdown',
          ],
        },
      },
    },
    target: 'es2021',
  },
};

// Export vite config
export default defineConfig(config);

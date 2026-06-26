import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rslib/core';
import { pluginVue } from '@rsbuild/plugin-vue';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  name: string;
  description: string;
  author: {
    name: string;
    email: string;
  };
  license: string;
  version: string;
  homepage: string;
};

const buildDate = new Date().toISOString();
const bannerText = `/**
 * ${pkg.name}
 *
 * @description ${pkg.description}
 * @author ${pkg.author.name} <${pkg.author.email}>
 * @license ${pkg.license}
 * @version ${pkg.version}
 * @see {@link ${pkg.homepage}}
 */
`;

/**
 * UMD external definition: keeps the real package specifier for the
 * commonjs/amd branches, while using a friendly global name for the
 * plain `<script>` tag (root) branch.
 */
const umdExternal = (
  rootName: string,
  packageName: string
): { root: string; commonjs: string; commonjs2: string; amd: string } => ({
  root: rootName,
  commonjs: packageName,
  commonjs2: packageName,
  amd: packageName,
});

/** Externals used by the UMD build. */
const umdGlobals = {
  '@codemirror/autocomplete': umdExternal(
    'autocomplete',
    '@codemirror/autocomplete'
  ),
  '@codemirror/commands': umdExternal('commands', '@codemirror/commands'),
  '@codemirror/language': umdExternal('language', '@codemirror/language'),
  '@codemirror/lint': umdExternal('lint', '@codemirror/lint'),
  '@codemirror/search': umdExternal('search', '@codemirror/search'),
  '@codemirror/state': umdExternal('state', '@codemirror/state'),
  '@codemirror/view': umdExternal('view', '@codemirror/view'),
  'style-mod': umdExternal('styleMod', 'style-mod'),
  'vue-demi': umdExternal('VueDemi', 'vue-demi'),
  codemirror: umdExternal('codemirror', 'codemirror'),
  vue: umdExternal('Vue', 'vue'),
};

export default defineConfig({
  source: {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
    entry: {
      index: './src/index.ts',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [pluginVue()],
  lib: [
    {
      format: 'esm',
      syntax: 'esnext',
      dts: true,
      bundle: true,
      banner: {
        js: bannerText,
      },
      output: {
        filename: {
          js: 'index.es.js',
        },
        sourceMap: true,
      },
    },
    {
      format: 'cjs',
      syntax: 'esnext',
      bundle: true,
      banner: {
        js: bannerText,
      },
      output: {
        cleanDistPath: false,
        sourceMap: true,
      },
    },
    {
      format: 'umd',
      syntax: 'esnext',
      umdName: 'vue-codemirror',
      bundle: true,
      banner: {
        js: bannerText,
      },
      output: {
        cleanDistPath: false,
        filename: {
          js: 'index.umd.js',
        },
        externals: umdGlobals,
        sourceMap: true,
      },
    },
  ],
});

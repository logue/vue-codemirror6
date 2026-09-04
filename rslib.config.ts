/** For build library use */
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { defineConfig } from '@rslib/core';

import { readFileSync } from 'node:fs';

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

/**
 * The UMD name is used for the global variable name when the library
 * is included via a <script> tag.
 * DO NOT use kebab-case or snake_case for the UMD name.
 * Use camelCase or PascalCase instead.
 *
 * For example, if your library is called "my-library", you might use
 * "MyLibrary" as the UMD name.
 * Then, name might be used in the following way:
 *
 * @example
 * <script src="https://cdn.jsdelivr.net/npm/your-library@1.0.0/dist/index.umd.js"></script>
 * <script>
 *   const myLibrary = window.umdName;
 * </script>
 */
const umdName = 'VueCodeMirror'; // CHANGE THIS to your library's global variable name.

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

export default defineConfig({
  plugins: [
    pluginTypeCheck(),
    pluginModuleFederation({
      exposes: {
        '.': './src/index.ts',
      },
      name: umdName,
      shared: {
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        vue: {
          singleton: true,
        },
      },
    }),
  ],
  banner: {
    css: bannerText,
    dts: bannerText,
    js: bannerText,
  },
  bundle: true,
  syntax: 'esnext',
  output: {
    target: 'node',
    autoExternal: true,
  },
  lib: [
    {
      format: 'esm',
      dts: {
        // isolated: true,  // SWC fast_dts
        bundle: true,
        autoExtension: true,
        tsgo: true, // Enable TypeScript 7 native compiler
      },
      output: {
        filename: {
          js: 'index.es.js',
        },
        sourceMap: true,
      },
    },
    {
      // Compatibility-only browser build. npm consumers should prefer the ESM entry
      // above, which is the default package export and the primary distribution target.
      format: 'umd',
      output: {
        cleanDistPath: false,
        filename: {
          js: 'index.umd.js',
        },
        minify: true,
        sourceMap: false,
      },
      syntax: 'es2020',
      umdName,
    },
    {
      // Module Federation
      format: 'mf',
      splitChunks: false,
    },
  ],
  source: {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
    tsconfigPath: './tsconfig.rslib.json',
  },
});

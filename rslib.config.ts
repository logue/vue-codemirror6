/** For build library use */
import { readFileSync } from 'node:fs';

import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { defineConfig } from '@rslib/core';

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
const umdName = undefined; // CHANGE THIS to your library's global variable name.

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
  ],
  lib: [
    {
      format: 'esm',
      dts: {
        tsgo: true, // Enable TypeScript 7 native compiler
        // isolated: true,  // SWC fast_dts
        bundle: true,
      },
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
      format: 'umd',
      umdName,
      banner: {
        js: bannerText,
      },
      output: {
        filename: {
          js: 'index.umd.js',
        },
        cleanDistPath: false,
        minify: true,
        sourceMap: true,
      },
    },
  ],
  source: {
    tsconfigPath: './tsconfig.rslib.json',
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
  },
});

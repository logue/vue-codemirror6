import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginVue } from '@rsbuild/plugin-vue';
import { RsdoctorRspackPlugin } from '@rsdoctor/core';
import { define } from 'rstack';

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { pluginVueDevTools } from '@vue-devtools-rstack/rsbuild';
import prettierPlugin from 'eslint-config-prettier';

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

/** Parse package.json content */
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
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
* ${packageJson.name}
*
* @description ${packageJson.description}
* @author ${packageJson.author.name} <${packageJson.author.email}>
* @license ${packageJson.license}
* @version ${packageJson.version}
* @see {@link ${packageJson.homepage}}
*/
`;

const createBuildDefines = () => ({
  'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version),
  'import.meta.env.BUILD_DATE': JSON.stringify(buildDate)
});

const IGNORE_PATTERNS = [
  // AI agents skill docs.
  '**/.agent/**',
  '**/.agents/**',
  '**/.claude/**',
  '**/.cursor/**',
  '**/.windsurf/**',
  // Build intermediate artifacts.
  '**/.cache/**',
  '**/.data/**',
  '**/.mf/**',
  '**/.nitro/**',
  '**/.nuxt/**',
  '**/.pnpm/**',
  '**/.rsdoctor/**',
  '**/.rstack/**',
  // Test coverage reports.
  '**/coverage/**',
  '**/e2e/**',
  '**/playwright-report/**',
  '**/reports/**',
  '**/test-results/**',
  // Build artifacts.
  '**/demo/**',
  '**/dist/**',
  '**/docs/**',
  '**/storybook-static/**',
  '**/target/**',
  // Node modules
  '**/node_modules/**'
];

const APP_FILES = ['**/*.{ts,mts,tsx,js,mjs,jsx,json,jsonc,vue,astro,svelte}'];
const TEST_FILES = ['**/*.{test,spec}.{ts,mts,tsx,js,mjs,jsx}'];

/**
 * Create a UMD build config for a single entry.
 *
 * @param name - Entry name (output: `dist/<name>.umd.js`)
 * @param entry - Entry source path
 * @param globalName - Global variable name used when loaded via a <script> tag
 */
const createUmdConfig = (name: string, entry: string, globalName: string) => ({
  format: 'umd' as const,
  source: {
    entry: {
      [name]: entry
    }
  },
  output: {
    cleanDistPath: false,
    filename: {
      js: `${name}.umd.js`
    },
    minify: true,
    sourceMap: false
  },
  syntax: 'es2020' as const,
  umdName: globalName
});

/**
 * Rslib Config
 * @see {@link https://rslib.rs/config/ | Rslib Config}
 */
define.lib({
  plugins: [pluginTypeCheck(), pluginVue(), pluginVueDevTools(), pluginNodePolyfill()],
  banner: {
    css: bannerText,
    dts: bannerText,
    js: bannerText
  },
  bundle: true,
  syntax: 'esnext',
  source: {
    define: createBuildDefines(),
    tsconfigPath: './tsconfig.rslib.json'
  },
  output: {
    target: 'node',
    autoExternal: true
  },
  lib: [
    {
      format: 'esm',
      dts: {
        // isolated: true,  // SWC fast_dts
        bundle: false,
        autoExtension: true,
        tsgo: true // Enable TypeScript 7 native compiler
      },
      source: {
        entry: {
          index: './src/index.ts',
          // Web Component entry (Vue 3 only). Kept separate so the Vue component
          // entry does not pull in `defineCustomElement`.
          wc: './src/wc.ts',
          'wc-auto': './src/wc-auto.ts'
        }
      },
      output: {
        filename: {
          js: '[name].es.js'
        },
        sourceMap: true
      }
    },
    // Compatibility-only browser builds. npm consumers should prefer the ESM entries
    // above, which are the default package exports and the primary distribution target.
    // UMD accepts a single entry per output, so each entry gets its own config.
    createUmdConfig('index', './src/index.ts', umdName),
    createUmdConfig('wc', './src/wc.ts', `${umdName}Element`),
    createUmdConfig('wc-auto', './src/wc-auto.ts', `${umdName}Element`)
  ],
  tools: {
    rspack: {
      plugins: [
        // Only register the plugin when RSDOCTOR is true, as the plugin will increase the build time.
        process.env.RSDOCTOR &&
          new RsdoctorRspackPlugin({
            // plugin options
            // @see {@link https://rsdoctor.rs/guide/start/features | Rsdoctor Docs}
            output: {
              // Do not output report in dist dir.
              reportDir: '.rstack/'
            }
          })
      ].filter(Boolean)
    }
  }
});

/**
 * Rsbuild (Demo application) config
 * @see {@link https://rsbuild.rs/config | Rsbuild Config}
 */
define.app({
  plugins: [
    pluginSass(),
    pluginTypeCheck(),
    pluginVue({
      vueLoaderOptions: {
        compilerOptions: {
          // Carbon Web Components (`<cds-*>`) are native custom elements, not Vue components.
          isCustomElement: tag => tag.startsWith('cds-')
        }
      }
    }),
    pluginVueDevTools(),
    pluginNodePolyfill()
  ],
  source: {
    define: createBuildDefines(),
    entry: {
      index: './src-demo/index.ts'
    },
    include: ['./src'],
    tsconfigPath: './tsconfig.rsbuild.json'
  },
  html: {
    template: './src-demo/index.html'
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      // Self-reference so demo components can `import CodeMirror from 'vue-codemirror6'`
      // exactly as a real consumer of the published package would.
      'vue-codemirror6': path.resolve(import.meta.dirname, 'src')
    }
  },
  output: {
    assetPrefix: './',
    distPath: {
      root: './src-docs/public/demo/'
    },
    filenameHash: true
  },
  tools: {
    rspack: config => {
      // `import Src from './Foo.vue?source'` returns the raw SFC source as a string.
      config.module.rules?.unshift({
        test: /\.vue$/,
        resourceQuery: /source/,
        use: [
          {
            loader: path.resolve(import.meta.dirname, 'src-demo/loaders/vue-source-loader.js')
          }
        ]
      });
      return config;
    }
  }
});

/**
 * Rspress Config
 * To use this, you will need to install @rspress/core separately.
 *
 * @see {@link https://rstack.rs/guide/cli/doc | Doc Config}
 * @see {@link https://rspress.rs/api/ | Rspress Config}
 */
define.doc({
  // Directory settings
  root: 'src-docs',
  outDir: 'docs',
  // If the package name and repository name are different, correct them as needed.
  base: `/${packageJson.name.slice(packageJson.name.lastIndexOf('/') + 1)}/`,
  route: {
    exclude: ['components/**'],
    // Redirect by browser language only when an English (default) page is opened,
    // so explicit links to /ja/ or /zh/ pages are respected.
    localeRedirect: 'only-default-lang'
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: packageJson.homepage
      }
    ]
  },
  builderConfig: {
    plugins: [pluginSass()]
  },
  globalStyles: path.join(__dirname, 'theme/styles.scss'),
  // Site information settings
  title: packageJson.name,
  description: packageJson.description,
  head: [['meta', { name: 'author', content: packageJson.author.name }]],
  lang: 'en',
  // `en` is the default locale (served without a prefix); `ja` and `zh` live under `/ja/` and `/zh/`.
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'vue-codemirror6',
      description: 'CodeMirror 6 component for Vue 2 and Vue 3.'
    },
    {
      lang: 'ja',
      label: '日本語',
      title: 'vue-codemirror6',
      description: 'Vue 2 / Vue 3 で使える CodeMirror 6 コンポーネント'
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'vue-codemirror6',
      description: '适用于 Vue 2 和 Vue 3 的 CodeMirror 6 组件'
    }
  ],
  // generate llms.txt
  llms: true
});

/**
 * Rstest Config
 * @see {@link https://rstest.rs/config/ | Rstest Config}
 */
define.test({
  source: {
    tsconfigPath: './tsconfig.rstest.json'
  }
});

/**
 * Rslint Config
 * @see {@link https://rslint.rs/config/ | Rslint Config}
 */
define.lint(
  ({
    globals,
    // See https://rslint.rs/config/rules-and-presets
    js,
    ts,
    reactPlugin,
    // reactHooksPlugin,
    importPlugin,
    // nodePlugin,
    promisePlugin,
    // jestPlugin,
    rstestPlugin,
    unicornPlugin,
    jsxA11yPlugin
  }) => [
    // `ignores` must live in its own object to act as a global ignore.
    {
      ignores: IGNORE_PATTERNS
    },
    {
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.nodeBuiltin
        },
        parserOptions: {
          project: [
            './tsconfig.node.json',
            './tsconfig.rsbuild.json',
            './tsconfig.rslib.json',
            './tsconfig.rspress.json',
            './tsconfig.rstest.json'
          ]
        }
      }
    },

    // Base TypeScript recommended sets.
    js.configs.recommended,
    ts.configs.strictTypeChecked,
    ts.configs.stylisticTypeChecked,
    importPlugin.configs.recommended,
    promisePlugin.configs.recommended,
    unicornPlugin.configs.recommended,
    // nodePlugin.configs.recommended,
    reactPlugin.configs.recommended,
    // reactHooksPlugin.configs.recommended, // Comment out this line when using Vue.
    jsxA11yPlugin.configs.recommended,

    {
      name: 'Application',
      files: APP_FILES,
      plugins: ['@typescript-eslint', 'import', 'promise', 'unicorn'],
      rules: {
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array'
          }
        ],

        // Keep project lint behavior aligned with the previous baseline.
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
        '@typescript-eslint/explicit-function-return-type': 'off',

        // Ignore intentionally unused identifiers with underscore prefix.
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/triple-slash-reference': 'off',
        // Use them according to the context (see AGENTS.md).
        '@typescript-eslint/consistent-type-definitions': 'off',

        // Using parent traversal is prohibited in app code. Use @/ alias instead.
        'import/no-relative-parent-imports': [
          'error',
          {
            ignore: ['^@/']
          }
        ],
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc'
            },
            groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'builtin',
                pattern:
                  '{@rsbuild/**,@rsdoctor/**,@rslint/**,@rslib/*,@rspack/**,@rstest/**,rstack,rstack/**}',
                position: 'before'
              },
              {
                group: 'internal',
                pattern: '{@/**}',
                position: 'before'
              }
            ],
            pathGroupsExcludedImportTypes: ['builtin']
          }
        ],
        // File names should, in principle, be in PascalCase, with some exceptions.
        'unicorn/filename-case': 'off',
        // `props` is the idiomatic Vue name; do not force `properties`.
        'unicorn/name-replacements': [
          'error',
          {
            replacements: {
              props: false
            }
          }
        ],
        // Vue Options API (`render()`) and webpack loaders rely on `this`.
        'unicorn/no-this-outside-of-class': 'off'
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: [
              './tsconfig.node.json',
              './tsconfig.rsbuild.json',
              './tsconfig.rspress.json',
              './tsconfig.rslib.json',
              './tsconfig.rstest.json'
            ]
          }
        }
      }
    },

    {
      // Test files intentionally import from parent directories.
      name: 'Tests',
      files: TEST_FILES,
      ...rstestPlugin.configs.recommended,
      rules: {
        // The demo data for the test code should preferably be of type `any`.
        '@typescript-eslint/no-explicit-any': 'warn',
        'import/no-relative-parent-imports': 'off'
      }
    },
    {
      // Since env.d.ts is a definition file, it does not check for some errors.
      name: 'env.d.ts file',
      files: ['**/env.d.ts'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'unicorn/name-replacements': 'off'
      }
    },
    // Finally, disable any conflicts with Prettier's settings.
    prettierPlugin.rules
  ]
);

/**
 * Prettier Configs
 * @see {@link https://prettier.io/docs/options | Prettier Options}
 */
define.fmt({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-yaml'],
  // Bellow is rstack options
  // see https://rstack.rs/guide/formatting
  ignorePatterns: IGNORE_PATTERNS,
  sortPackageJson: true
});

/**
 * Git hooks
 * @see {@link https://rstack.rs/guide/cli/hooks | Git Hooks}
 */
define.staged({
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx}': ['rs lint --fix', 'rs fmt'],
  '*.{json,jsonc,md,mdx,yml,yaml,css,scss,less,html,vue}': 'rs fmt'
});

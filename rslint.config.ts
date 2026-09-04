import {
  defineConfig,
  importPlugin,
  js,
  jsxA11yPlugin,
  promisePlugin,
  reactHooksPlugin,
  reactPlugin,
  rstestPlugin,
  ts,
  unicornPlugin,
} from '@rslint/core';

import markdownPlugin from '@eslint/markdown';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const APP_FILES = [
  '**/*.{ts,mts,tsx,js,mjs,jsx,json,jsonc,yml,yaml,mdx,vue,astro,svelte}',
];
const VUE_FILES = [
  '**/*.vue',
];
const TEST_FILES = [
  '**/*.{test,spec}.{ts,mts,tsx,js,mjs,jsx}',
];
const DOC_FILES = [
  '**/*.{md,mdx}',
];

export default defineConfig([
  {
    ignores: [
      // AI agents skill docs.
      '**/.agents/**',
      // Build intermediate artifacts.
      '**/.cache/**',
      '**/.data/**',
      '**/.mf/**',
      '**/.nitro/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.rstack/**',
      // Test coverage reports.
      '**/coverage/**',
      '**/reports',
      '**/test-results',
      // Built artifacts.
      '**/demo/**',
      '**/dist-ssr/**',
      '**/dist/**',
      '**/docs/**',
      '**/storybook-static/**',
      // Grit (Biome Rules) source artifacts.
      '**/grit/**',
      // Node modules.
      '**/node_modules/**',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        project: [
          './tsconfig.json',
        ],
      },
    },
  },

  // Base TypeScript recommended sets.
  js.configs.recommended,
  ts.configs.recommended,
  promisePlugin.configs.recommended,
  unicornPlugin.configs.recommended,
  reactPlugin.configs.recommended,
  reactHooksPlugin.configs.recommended,
  jsxA11yPlugin.configs.recommended,

  {
    ...importPlugin.configs.recommended,
    files: APP_FILES,
    plugins: [
      '@typescript-eslint',
      'import',
      'promise',
      'unicorn',
    ],
    rules: {
      ...importPlugin.configs.recommended.rules,
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
        },
      ],

      // Keep project lint behavior aligned with the previous baseline.
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'type-annotation',
      ],
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
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/triple-slash-reference': 'off',

      // Using parent traversal is prohibited in app code. Use @/ alias instead.
      'import/no-relative-parent-imports': [
        'error',
        {
          ignore: [
            '^@/',
            '^~/',
          ],
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'builtin',
              pattern:
                '{@rsbuild/**,@rslint/**,@rslib/*,@rspack/**,@rstest/**}',
              position: 'before',
            },
            {
              group: 'internal',
              pattern: '{@/**}',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: [
            'builtin',
          ],
        },
      ],
      // File names should, in principle, be in PascalCase, with some exceptions.
      'unicorn/filename-case': 'off',
    },
    settings: {
      'import/resolver': {
        'eslint-import-resolver-custom-alias': {
          alias: {
            '@': './src',
            '~': './node_modules',
          },
          extensions: [
            '.js',
            '.ts',
            '.json',
            '.jsonc',
            '.yml',
            '.yaml',
            '.jsx',
            '.tsx',
            '.vue',
            '.svelte',
            '.astro',
          ],
        },
        node: true,
        typescript: true,
      },
    },
  },

  {
    // Test files intentionally import from parent directories.
    files: TEST_FILES,
    plugins: [
      '@typescript-eslint',
      'import',
      'promise',
      'unicorn',
      'rstest',
    ],
    rules: {
      ...rstestPlugin.configs.recommended.rules,
      // The demo data for the test code should preferably be of type `any`.
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-relative-parent-imports': 'off',
    },
  },

  {
    files: VUE_FILES,
    ...pluginVue.configs['flat/recommended'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    files: DOC_FILES,
    plugins: [
      'markdown',
    ],
    ...markdownPlugin.configs.recommended,
  },
]);

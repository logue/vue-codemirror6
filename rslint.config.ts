import {
  defineConfig,
  importPlugin,
  promisePlugin,
  rstestPlugin,
  ts,
  unicornPlugin,
} from '@rslint/core';

const APP_FILES = [
  '**/*.{ts,mts,tsx,js,mjs,jsx,json,jsonc,yml,yaml,vue,astro,svelte}',
];
const TEST_FILES = ['**/*.{test,spec}.{ts,mts,tsx,js,mjs,jsx}'];

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/docs/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },

  // Base TypeScript recommended sets.
  ts.configs.recommended,
  promisePlugin.configs.recommended,
  unicornPlugin.configs.recommended,

  {
    ...importPlugin.configs.recommended,
    files: APP_FILES,
    plugins: ['@typescript-eslint', 'import', 'promise', 'unicorn'],
    settings: {
      'import/resolver': {
        node: true,
        typescript: true,
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
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,

      // Keep project lint behavior aligned with the previous baseline.
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array' }],
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'type-annotation',
      ],

      // Ignore intentionally unused identifiers with underscore prefix.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Using parent traversal is prohibited in app code. Use @/ alias instead.
      'import/no-relative-parent-imports': [
        'error',
        { ignore: ['^@/', '^~/'] },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '{@/**}',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
      // File names should, in principle, be in PascalCase, with some exceptions.
      'unicorn/filename-case': 'off',
    },
  },

  {
    // Test files intentionally import from parent directories.
    files: TEST_FILES,
    plugins: ['@typescript-eslint', 'import', 'promise', 'unicorn', 'rstest'],
    rules: {
      ...rstestPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-relative-parent-imports': 'off',
    },
  },
]);

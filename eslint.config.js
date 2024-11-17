import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

import pluginImport from 'eslint-plugin-import';
import pluginTsdoc from 'eslint-plugin-tsdoc';
//import pluginVue from 'eslint-plugin-vue';
/**
 * ESLint Config
 */
// @ts-check
export default tseslint.config(
  {
    ignores: [
      '.vscode/',
      '.yarn/',
      'dist/',
      'docs/',
      'public/',
      'src/** /*.generated.*',
      'eslint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        project: [
          'tsconfig.app.json',
          'tsconfig.node.json',
          'tsconfig.docs.json',
        ],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: pluginImport,
      tsdoc: pluginTsdoc,
      //vue: pluginVue,
    },
    settings: {
      // This will do the trick
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        'vue-eslint-parser': ['.vue'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
        alias: {
          map: [
            ['@', './src'],
            ['~', './node_modules'],
            ['vue-codemirror6', './src'],
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
        },
      },
      vite: {
        configPath: './vite.config.ts',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // ...importPlugin.configs["recommended"].rules,
      'no-unused-vars': 'warn',
      // const lines: string[] = []; style
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array',
        },
      ],
      // Enable @ts-ignore etc.
      '@typescript-eslint/ban-ts-comment': 'off',
      // Left-hand side style
      '@typescript-eslint/consistent-generic-constructors': [
        'error',
        'type-annotation',
      ],
      // Enable import sort order, see bellow.
      '@typescript-eslint/consistent-type-imports': [
        'off',
        {
          prefer: 'type-imports',
        },
      ],
      // Fix for pinia
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Allow short land for pretter
      '@typescript-eslint/no-confusing-void-expression': [
        'error',
        {
          ignoreArrowShorthand: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // Fix for vite import.meta.env
      '@typescript-eslint/strict-boolean-expressions': 'off',
      // Fix for vite env.d.ts.
      '@typescript-eslint/triple-slash-reference': 'off',
      // Fix for Vue setup style
      'import/default': 'off',
      // Fix for Vue setup style
      'import/no-default-export': 'off',
      // Sort Import Order.
      // see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#importorder-enforce-a-convention-in-module-import-order
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
            // Vue Core
            {
              pattern:
                '{vue,vue-router,vuex,@/stores,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**}',
              group: 'external',
              position: 'before',
            },
            // Internal Codes
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
      'tsdoc/syntax': 'warn',
      /*
      // A tag with no content should be written like <br />.
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
          },
        },
      ],
      // Mitigate non-multiword component name errors to warnings.
      'vue/multi-word-component-names': 'warn',
      // for Vuetify Labs Fix (v-data-tables etc.)
      'vuetify/no-deprecated-components': 'warn',
      */
    },
  },
  // ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier
);

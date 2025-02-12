import configPrettier from '@vue/eslint-config-prettier';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

import pluginImport from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

/**
 * ESLint Config
 */
export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      '.vscode/',
      '.yarn/',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'eslint.config.js',
      'pnpm-lock.yaml',
      'playwright-report',
      'test-results',
      'public/',
      'src/**/*.generated.*'
    ]
  },
  pluginVue.configs['flat/recommended'],
  ...pluginVueA11y.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    plugins: {
      import: pluginImport
    },

    settings: {
      // This will do the trick
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
        '@typescript-eslint/parser': ['.ts', '.tsx'],
        'vue-eslint-parser': ['.vue']
      },
      'import/resolver': {
        typescript: true,
        node: true,
        'eslint-import-resolver-custom-alias': {
          alias: {
            '@': './src',
            '~': './node_modules'
          },
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue']
        }
      },
      vite: {
        configPath: './vite.config.ts'
      }
    },
    rules: {
      // ...importPlugin.configs["recommended"].rules,
      'no-unused-vars': 'warn',
      // const lines: string[] = []; style
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'array'
        }
      ],
      // Enable @ts-ignore etc.
      '@typescript-eslint/ban-ts-comment': 'off',
      // Left-hand side style
      '@typescript-eslint/consistent-generic-constructors': ['error', 'type-annotation'],
      // Enable import sort order, see bellow.
      '@typescript-eslint/consistent-type-imports': [
        'off',
        {
          prefer: 'type-imports'
        }
      ],
      // Fix for pinia
      '@typescript-eslint/explicit-function-return-type': 'off',
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
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            // Vue Core
            {
              pattern:
                '{vue,vue-router,vuex,@/store,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**}',
              group: 'external',
              position: 'before'
            },
            // Internal Codes
            {
              pattern: '{@/**}',
              group: 'internal',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc'
          },
          'newlines-between': 'always'
        }
      ],
      // A tag with no content should be written like <br />.
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always'
          }
        }
      ],
      // Mitigate non-multiword component name errors to warnings.
      'vue/multi-word-component-names': 'warn'
    }
  },
  configPrettier
);

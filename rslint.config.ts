export default [
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
    ],
  },
  {
    files: ['**/*.{ts,mts,tsx,js,mjs,jsx}'],
    rules: {
      correctness: 'error',
      typescript: 'warn',
      style: 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      correctness: 'error',
      vue: 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.spec.ts', '**/*.spec.js'],
    rules: {
      vitest: 'warn',
    },
  },
];

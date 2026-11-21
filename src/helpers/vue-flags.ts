// When the Vue plugin is not installed in bundlers such as Vite or Rsbuild,
// some environment variables are not defined,
// causing errors to occur when building code that works in development mode.
//
// This is the fixture for that problem.
const g = globalThis as Record<string, unknown>;
g.__VUE_OPTIONS_API__ ??= true;
g.__VUE_PROD_DEVTOOLS__ ??= false;
g.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ ??= false;

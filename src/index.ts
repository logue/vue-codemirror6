/**
 * Vue CodeMirror6 Component
 *
 * @license MIT
 * @author Logue {@link logue@hotmail.co.jp}
 * @copyright 2022 Masashi Yoshikawa {@link https://logue.dev/} All rights reserved.
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

// iife/cjs usage extends esm default export - so import it all
import component, * as namedExports from './index.esm';

// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(([exportName, exported]) => {
  if (exportName !== 'default') component[exportName] = exported;
});

export default component as typeof component &
  Exclude<typeof namedExports, 'default'>;

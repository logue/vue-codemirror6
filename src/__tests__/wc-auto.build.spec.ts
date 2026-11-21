import { afterEach, beforeAll, describe, expect, it, rs } from 'rstack/test';

import { existsSync } from 'node:fs';
import path from 'node:path';

/** Shapes of the built entries, used to type the dynamically imported modules. */
type WcModule = typeof import('@/wc');
type WcAutoModule = typeof import('@/wc-auto');

/**
 * Smoke test for the *built* `dist/wc-auto.es.js` entry.
 *
 * Kept in its own file (separate from `wc.build.spec.ts`) so the custom element registry is
 * fresh: a constructor can only be defined once per registry.
 *
 * Skipped unless `pnpm run build` has been run first.
 */
const buildDirectory = path.resolve(import.meta.dirname, '../../dist');
const wcPath = path.join(buildDirectory, 'wc.es.js');
const wcAutoPath = path.join(buildDirectory, 'wc-auto.es.js');

/** Wait for Vue's async custom-element mount and CodeMirror initialization. */
const flush = async (): Promise<void> => {
  for (let index = 0; index < 5; index++) {
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};

describe.skipIf(!existsSync(wcPath) || !existsSync(wcAutoPath))(
  'Built Web Component (dist/wc-auto) standalone',
  () => {
    const errors: unknown[] = [];
    const onError = (event: ErrorEvent): void => {
      errors.push(event.error ?? event.message);
    };

    beforeAll(() => {
      window.addEventListener('error', onError);
    });

    afterEach(() => {
      errors.length = 0;
    });

    it('should auto-register <code-mirror> when importing dist/wc-auto.es.js', async () => {
      const consoleError = rs.spyOn(console, 'error');
      const auto = (await import(/* webpackIgnore: true */ wcAutoPath)) as WcAutoModule;
      const wc = (await import(/* webpackIgnore: true */ wcPath)) as WcModule;

      expect(customElements.get('code-mirror')).toBe(auto.default);
      expect(auto.default).toBe(wc.default);

      const element = document.createElement('code-mirror');
      document.body.append(element);
      await flush();

      const root = element.shadowRoot ?? element;
      expect(root.querySelector('.cm-editor')).not.toBeNull();

      expect(errors).toEqual([]);
      expect(consoleError).not.toHaveBeenCalled();
    });
  }
);

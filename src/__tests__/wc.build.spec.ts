import { afterEach, beforeAll, describe, expect, it, rs } from 'rstack/test';

import { existsSync } from 'node:fs';
import path from 'node:path';

/** Shape of the `vue-codemirror6/wc` entry, used to type the built module. */
type WcModule = typeof import('@/wc');

/**
 * Smoke test for the *built* `dist/wc.es.js` entry.
 *
 * The other specs import from `src/`, so they cannot catch problems that only appear after
 * bundling (broken shared chunks, missing externals, tree-shaken side effects, etc.).
 * This loads the build output on its own — without the Vue component entry — and makes sure
 * the element registers, mounts and renders an editor without throwing or logging errors.
 *
 * Skipped unless `pnpm run build` has been run first.
 */
const buildDirectory = path.resolve(import.meta.dirname, '../../dist');
const wcPath = path.join(buildDirectory, 'wc.es.js');

/** Wait for Vue's async custom-element mount and CodeMirror initialization. */
const flush = async (): Promise<void> => {
  for (let index = 0; index < 5; index++) {
    await new Promise(resolve => setTimeout(resolve, 0));
  }
};

describe.skipIf(!existsSync(wcPath))('Built Web Component (dist/wc) standalone', () => {
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

  it('should import dist/wc.es.js and register the element manually', async () => {
    const consoleError = rs.spyOn(console, 'error');
    const wc = (await import(/* webpackIgnore: true */ wcPath)) as WcModule;

    expect(wc.default).toBeTypeOf('function');
    expect(wc.register).toBeTypeOf('function');

    wc.register('cm-build-test');
    expect(customElements.get('cm-build-test')).toBe(wc.default);

    const element = document.createElement('cm-build-test') as HTMLElement & {
      modelValue?: string;
    };
    element.modelValue = 'const a = 1;';
    document.body.append(element);
    await flush();

    const root = element.shadowRoot ?? element;
    expect(root.querySelector('.cm-editor')).not.toBeNull();
    expect(root.querySelector('.cm-content')?.textContent).toContain('const a = 1;');

    expect(errors).toEqual([]);
    expect(consoleError).not.toHaveBeenCalled();
  });
});

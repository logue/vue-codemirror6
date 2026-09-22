import { afterEach, beforeAll, describe, expect, it } from '@rstest/core';

import { EditorView } from '@codemirror/view';

import { CodeMirror, type CodeMirrorExposed } from '../index';

/**
 * Tests for the Web Component build produced by `defineCustomElement`.
 *
 * Unlike the Vue-component tests in `CodeMirror.spec.ts`, these tests
 * exercise `<code-mirror>` as a plain custom element: properties/attributes
 * are set directly on the DOM node, and the composable's return value
 * (`useCodeMirror`) is read back through Vue's automatic exposed-property
 * forwarding onto the element instance.
 *
 * @see {@link https://vuejs.org/guide/extras/web-components.html}
 */

/** Tag name used only by this spec, to avoid clashing with other suites/registries. */
const TAG = 'code-mirror-test-element';

describe('CodeMirror Web Component', () => {
  beforeAll(() => {
    if (!customElements.get(TAG)) {
      customElements.define(TAG, CodeMirror);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should be registered as a custom element constructor', () => {
    expect(customElements.get(TAG)).toBe(CodeMirror);
  });

  describe('Rendering', () => {
    it('should attach an open shadow root containing the editor root', async () => {
      const el = document.createElement(TAG);
      document.body.append(el);
      await Promise.resolve();

      expect(el.shadowRoot).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.vue-codemirror')).toBeTruthy();
    });

    it('should render the custom tag when the tag property is set before connecting', async () => {
      const el = document.createElement(TAG) as HTMLElement & {
        tag?: string;
      };
      el.tag = 'section';
      document.body.append(el);
      await Promise.resolve();

      expect(
        el.shadowRoot?.querySelector('section.vue-codemirror'),
      ).toBeTruthy();
    });

    it('should mount a CodeMirror EditorView inside the shadow root', async () => {
      const el = document.createElement(TAG);
      document.body.append(el);
      await Promise.resolve();

      expect(el.shadowRoot?.querySelector('.cm-editor')).toBeTruthy();
    });
  });

  describe('Property binding', () => {
    it('should use the modelValue property set before connecting as the initial document', async () => {
      const el = document.createElement(TAG) as HTMLElement & {
        modelValue?: string;
      };
      el.modelValue = 'const x = 1;';
      document.body.append(el);
      await Promise.resolve();

      const exposed = el as unknown as CodeMirrorExposed;
      expect(exposed.view?.state.doc.toString()).toBe('const x = 1;');
    });

    it('should reflect primitive props set as HTML attributes', async () => {
      const el = document.createElement(TAG);
      el.setAttribute('readonly', '');
      el.setAttribute('dark', '');
      document.body.append(el);
      await Promise.resolve();

      const exposed = el as unknown as CodeMirrorExposed;
      expect(exposed.view?.state.readOnly).toBe(true);
    });

    it('should accept non-primitive props (extensions) only as a JS property', async () => {
      const el = document.createElement(TAG) as HTMLElement & {
        extensions?: unknown[];
      };
      el.extensions = [
        EditorView.contentAttributes.of({
          'data-testid': 'from-extension',
        }),
      ];
      document.body.append(el);
      await Promise.resolve();

      const exposed = el as unknown as CodeMirrorExposed;
      expect(exposed.view?.contentDOM.getAttribute('data-testid')).toBe(
        'from-extension',
      );
    });
  });

  describe('Exposed instance API', () => {
    it('should forward the composable return value onto the element instance', async () => {
      const el = document.createElement(TAG);
      document.body.append(el);
      await Promise.resolve();

      const exposed = el as unknown as CodeMirrorExposed;
      expect(exposed.view).toBeInstanceOf(EditorView);
      expect(typeof exposed.getRange).toBe('function');
      expect(typeof exposed.lint).toBe('function');
    });

    it('should read and update the document through exposed methods', async () => {
      const el = document.createElement(TAG) as HTMLElement & {
        modelValue?: string;
      };
      el.modelValue = 'hello world';
      document.body.append(el);
      await Promise.resolve();

      const exposed = el as unknown as CodeMirrorExposed;
      expect(exposed.getRange(0, 5)).toBe('hello');

      exposed.replaceRange('bye', 0, 5);
      expect(exposed.view?.state.doc.toString()).toBe('bye world');
    });
  });

  describe('Events', () => {
    it('should dispatch a native "ready" CustomEvent after mount', async () => {
      const el = document.createElement(TAG);
      const ready: Promise<CustomEvent> = new Promise((resolve) => {
        el.addEventListener('ready', (event) => resolve(event as CustomEvent), {
          once: true,
        });
      });
      document.body.append(el);

      const event = await ready;
      expect(event.detail[0]).toHaveProperty('view');
      expect(event.detail[0]).toHaveProperty('state');
      expect(event.detail[0]).toHaveProperty('container');
    });

    it('should dispatch a native "update:model-value" CustomEvent on text change', async () => {
      const el = document.createElement(TAG) as HTMLElement & {
        modelValue?: string;
      };
      el.modelValue = 'initial';
      document.body.append(el);
      await Promise.resolve();

      const updated: Promise<CustomEvent> = new Promise((resolve) => {
        el.addEventListener(
          'update:model-value',
          (event) => resolve(event as CustomEvent),
          {
            once: true,
          },
        );
      });

      const exposed = el as unknown as CodeMirrorExposed;
      exposed.view?.dispatch({
        changes: {
          from: 0,
          to: exposed.view.state.doc.length,
          insert: 'changed',
        },
      });

      const event = await updated;
      expect(event.detail[0]).toBe('changed');
    });

    it('should dispatch a native "destroy" CustomEvent when removed from the DOM', async () => {
      const el = document.createElement(TAG);
      document.body.append(el);
      await Promise.resolve();

      const destroyed: Promise<void> = new Promise((resolve) => {
        el.addEventListener('destroy', () => resolve(), {
          once: true,
        });
      });

      el.remove();

      await expect(destroyed).resolves.toBeUndefined();
    });
  });
});

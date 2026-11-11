import { describe, expect, it } from 'rstack/test';

import CodeMirror from '@/wc';
import AutoCodeMirror from '@/wc-auto';

/**
 * Tests for the `vue-codemirror6/wc-auto` entry, which registers `<code-mirror>` on import.
 */
describe('CodeMirror Web Component (auto registration)', () => {
  it('should register <code-mirror> on import', () => {
    expect(customElements.get('code-mirror')).toBe(CodeMirror);
    expect(document.createElement('code-mirror')).toBeInstanceOf(CodeMirror);
  });

  it('should re-export the same element constructor as the wc entry', () => {
    expect(AutoCodeMirror).toBe(CodeMirror);
  });
});

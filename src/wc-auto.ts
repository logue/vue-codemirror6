import CodeMirrorElement, { register } from '@/wc';

/** Tag name registered automatically on import. */
const DEFAULT_TAG_NAME = 'code-mirror';

// Auto-register `<code-mirror>` on import (skipped where `customElements` is unavailable, e.g. SSR).
if (typeof customElements !== 'undefined') {
  register(DEFAULT_TAG_NAME);
}

declare global {
  interface HTMLElementTagNameMap {
    'code-mirror': InstanceType<typeof CodeMirrorElement>;
  }
}

export { CodeMirrorElement as default };

import { defineCustomElement, h } from 'vue';

import { codeMirrorEmits, codeMirrorProps, useCodeMirror } from '@/composables/useCodeMirror';
import { slot } from '@/helpers/h-demi';

// Wrap the same component definition for use as a Web Component.
// @see {@link https://vuejs.org/guide/extras/web-components.html#defineCustomElement}
const CodeMirrorElement = defineCustomElement({
  /** Component Name */
  name: 'CodeMirror',
  /** Props Definition */
  props: codeMirrorProps,
  /** Emits */
  emits: codeMirrorEmits,
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context) {
    const exposed = useCodeMirror(props, context.emit);

    /** Export properties and functions */
    context.expose(exposed);
    return exposed;
  },
  render() {
    // <template>
    //   <div ref="editor" class="vue-codemirror">
    //     <aside v-show="!context.slots.default" aria-hidden><slot /></aside>
    //   </div>
    // </template>
    return h(
      this.$props.tag,
      {
        ref: 'editor',
        class: 'vue-codemirror'
      },
      this.$slots.default
        ? // Hide original content
          h(
            'aside',
            {
              style: 'display: none;',
              'aria-hidden': 'true'
            },
            slot(this.$slots.default)
          )
        : undefined
    );
  }
});

/** Tag name registered automatically on import. */
const DEFAULT_TAG_NAME = 'code-mirror';

/**
 * Register the element as a custom element.
 *
 * `<code-mirror>` is registered automatically on import; call this to use an additional tag name.
 * A constructor can only be defined once per registry, so additional tag names get a subclass.
 *
 * @param tagName - Custom element tag name
 */
export function register(tagName = DEFAULT_TAG_NAME): void {
  if (customElements.get(tagName)) {
    return;
  }
  customElements.define(
    tagName,
    tagName === DEFAULT_TAG_NAME ? CodeMirrorElement : class extends CodeMirrorElement {}
  );
}

// Auto-register `<code-mirror>` on import (skipped where `customElements` is unavailable, e.g. SSR).
if (typeof customElements !== 'undefined') {
  register();
}

declare global {
  interface HTMLElementTagNameMap {
    'code-mirror': InstanceType<typeof CodeMirrorElement>;
  }
}

export { CodeMirrorElement as default };

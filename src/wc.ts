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

/**
 * Register the element as a custom element under the given tag name.
 *
 * Does nothing if the tag name is already defined. A constructor can only be defined once per
 * custom element registry, so register a single tag name per page and do not combine this with
 * `vue-codemirror6/wc-auto` (which registers `<code-mirror>`).
 *
 * @param tagName - Custom element tag name (must contain a hyphen)
 */
export function register(tagName: string): void {
  if (customElements.get(tagName)) {
    return;
  }
  customElements.define(tagName, CodeMirrorElement);
}

export { CodeMirrorElement as default };

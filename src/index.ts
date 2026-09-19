import { type App, defineComponent, defineCustomElement } from 'vue-demi';

import {
  codeMirrorEmits,
  codeMirrorProps,
  useCodeMirror,
} from '@/composables/useCodeMirror';
import h, { slot } from '@/helpers/h-demi';
import { Meta } from '@/types/Meta';

/** CodeMirror Component */
const component = defineComponent({
  /** Component Name */
  name: 'CodeMirror',
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
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
        class: 'vue-codemirror',
      },
      this.$slots.default
        ? // Hide original content
          h(
            'aside',
            {
              style: 'display: none;',
              'aria-hidden': 'true',
            },
            slot(this.$slots.default),
          )
        : undefined,
    );
  },
});

const element = defineCustomElement({
  /** Component Name */
  name: 'CodeMirror',
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
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
        class: 'vue-codemirror',
      },
      this.$slots.default
        ? // Hide original content
          h(
            'aside',
            {
              style: 'display: none;',
              'aria-hidden': 'true',
            },
            slot(this.$slots.default),
          )
        : undefined,
    );
  },
});

/**
 * Vue plugin install function that registers the CodeMirror component globally.
 *
 * @param app - Vue application instance.
 */
const installCodeMirror = (app: App): void => {
  app.component('CodeMirror', component);
};
export type { CodeMirrorExposed } from '@/types/CodeMirrorExposed';
export {
  component as default,
  element as CodeMirror,
  installCodeMirror as install,
  Meta,
};

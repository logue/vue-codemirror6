<template>
  <div ref="editor" class="vue-codemirror">
    <aside v-show="!context.slots.default"><slot /></aside>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type SetupContext,
} from 'vue-demi';

import { EditorSelection, EditorState, type Text } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { indentWithTab } from '@codemirror/commands';

import { compact, merge, trim } from 'lodash';

import type CodeMirrorEmitsInterface from '@/interfaces/CodeMirrorEmitsInterface';

import type { Extension, Transaction } from '@codemirror/state';
import type { LanguageSupport } from '@codemirror/language';
import type { ViewUpdate } from '@codemirror/view';
import type { Diagnostic } from '@codemirror/lint';
import type { StyleSpec } from 'style-mod';

/** CodeMirror Component */
export default defineComponent({
  /** Component Name */
  name: 'CodeMirror',
  /** Model Definition */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /** Props Definition */
  props: {
    /** Model value */
    modelValue: {
      type: String as PropType<string | Text>,
      default: '',
    },
    /**
     * Selection
     *
     * @see {@link https://codemirror.net/6/docs/ref/#state.EditorSelection | EditorSelection}
     */
    selection: {
      type: Object as PropType<
        EditorSelection | { anchor: number; head?: number }
      >,
      default: undefined,
    },
    /**
     * Theme
     *
     * @see {@link https://codemirror.net/6/examples/styling/ | Example: Styling}
     */
    theme: {
      type: Object as PropType<{ [selector: string]: StyleSpec }>,
      default: () => {
        return {};
      },
    },
    /** Dark Mode */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Basic Setup
     *
     * @see {@link https://codemirror.net/6/docs/ref/#basic-setup | basic-setup}
     */
    basic: {
      type: Boolean,
      default: false,
    },
    /**
     * Line wrapping
     *
     * @see {@link https://codemirror.net/6/docs/ref/#view.EditorView%5ElineWrapping | LineWrapping}
     */
    wrap: {
      type: Boolean,
      default: false,
    },
    /**
     * Tab handling
     *
     * @see {@link https://codemirror.net/6/examples/tab/ | Tab Handling}
     */
    tab: {
      type: Boolean,
      default: false,
    },
    /**
     * Readonly
     *
     * @see {@link https://codemirror.net/6/docs/ref/#state.EditorState%5EreadOnly | readOnly}
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * Editable
     *
     * @see {@link https://codemirror.net/6/docs/ref/#view.EditorView%5Eeditable | editable}
     */
    editable: {
      type: Boolean,
      default: true,
    },
    /**
     * Additional Extension
     *
     * @see {@link https://codemirror.net/6/docs/ref/#state.Extension | Extending Editor State}
     */
    extensions: {
      type: Array as PropType<Extension[]>,
      default: undefined,
    },
    /**
     * Language Phreses
     *
     * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
     */
    phrases: {
      type: Object as PropType<Record<string, string>>,
      default: undefined,
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
     */
    lang: {
      type: Object as PropType<LanguageSupport>,
      default: undefined,
    },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/6/docs/ref/#lint | @codemirror/lint}
     */
    linter: {
      type: Array as PropType<Diagnostic[]>,
      default: undefined,
    },
  },
  /** Emits */
  emits: ['update:modelValue', 'update'],
  /**
   * Setup
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context: SetupContext) {
    /** Editor DOM */
    const editor: Ref<Element | undefined> = ref();

    /** Internal value */
    const doc: Ref<string | Text | undefined> = ref(props.modelValue);

    /** Dark mode */
    const { dark } = toRefs(props);

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    /** CodeMirror Extension */
    const exts: ComputedRef<Extension[]> = computed(() => {
      /** Default extension */
      const ext = [
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          emit('update', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: dark.value }),
        // Toggle basic setup
        props.basic ? basicSetup : undefined,
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
        // Indent with tab
        props.tab ? keymap.of([indentWithTab]) : undefined,
        // locale settings
        props.phrases ? EditorState.phrases.of(props.phrases) : undefined,
        // Parser language setting
        props.lang,
        // Readonly option
        props.readonly ? EditorState.readOnly.of(props.readonly) : undefined,
        // Editable option
        props.editable ? EditorView.editable.of(props.editable) : undefined,
      ];

      if (props.linter) {
        // Append Linter settings
        merge(ext, props.linter);
      }

      if (props.extensions) {
        // Append Extensions (such as basic-setup)
        merge(ext, props.extensions);
      }

      // console.debug('[CodeMirror.vue] Loaded extensions:', compact(ext));
      return compact(ext);
    });

    /** CodeMirror Editor View */
    let view: EditorView;

    /**
     * Input value changed
     *
     * @see {@link https://codemirror.net/6/docs/migration/#making-changes | Making Changes}
     */
    watch(doc, current => {
      if (view.composing) {
        // IME fix
        return;
      }

      /** Previous cursor location */
      const previous = view.state.selection;
      view.setState(
        EditorState.create({
          doc: current,
          extensions: exts.value,
          selection: previous,
        })
      );
    });

    watch(dark, () => {
      view.setState(
        EditorState.create({
          doc: doc.value,
          extensions: exts.value,
        })
      );
    });

    /** When loaded */
    onMounted(async () => {
      /** Initial Value */
      if (doc.value == '' && editor.value) {
        doc.value = trim((editor.value.childNodes[0] as HTMLElement).innerText);
      }

      // Register Codemirror
      view = new EditorView({
        state: EditorState.create({
          doc: doc.value,
          selection: props.selection,
          extensions: exts.value,
        }),
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.update([tr]);

          if (tr.changes.empty) return;
          // to parent binding
          doc.value = view.state.doc.toString();
          emit('update:modelValue', doc.value);
        },
      });
      await nextTick();
    });

    /** Destroy */
    onUnmounted(() => view.destroy());

    return {
      context,
      editor,
    };
  },
});
</script>

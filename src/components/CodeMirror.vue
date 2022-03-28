<template>
  <div ref="editor">
    <div v-show="context.slots.defatlt"><slot /></div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  type ComputedRef,
  ref,
  watch,
  onMounted,
  onUnmounted,
  type Ref,
  defineComponent,
} from 'vue-demi';

import type CodeMirrorPropsInterface from '@/interfaces/CodeMirrorPropsInterface';
import type CodeMirrorEmitsInterface from '@/interfaces/CodeMirrorEmitsInterface';

import {
  EditorState,
  type Extension,
  type Transaction,
} from '@codemirror/state';
import { EditorView, type ViewUpdate } from '@codemirror/view';
import type { LanguageSupport } from '@codemirror/language';
import type { Diagnostic } from '@codemirror/lint';
import type { StyleSpec } from 'style-mod';
import { compact, merge } from 'lodash';

/** CodeMirror Component */
export default defineComponent({
  name: 'CodeMirror',
  props: {
    /** Model value */
    modelValue: { type: String, default: '' },
    /**
     * Theme
     *
     * @see {@link https://codemirror.net/6/examples/styling/ | Example: Styling}
     */
    theme: {
      type: Object as () => { [selector: string]: StyleSpec },
      default: undefined,
    },
    /** Dark Mode */
    dark: { type: Boolean, default: false },
    /**
     * Readonly
     *
     * @see {@link https://codemirror.net/6/docs/ref/#state.EditorState%5EreadOnly | readOnly}
     */
    readonly: { type: Boolean, default: false },
    /**
     * Editable
     *
     * @see {@link https://codemirror.net/6/docs/ref/#view.EditorView%5Eeditable | editable}
     */
    editable: { type: Boolean, default: true },
    /**
     * Additional Extension
     *
     * @see {@link https://codemirror.net/6/docs/ref/#state.Extension | Extending Editor State}
     */
    extensions: { type: Array as () => Extension[], default: undefined },
    /**
     * Language Phreses
     *
     * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
     */
    phrases: {
      type: Object as () => Record<string, string>,
      default: undefined,
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
     */
    lang: { type: Object as () => LanguageSupport, default: undefined },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/6/docs/ref/#lint | @codemirror/lint}
     */
    linter: { type: Array as () => Diagnostic[], default: undefined },
  },
  /** Emits */
  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },
  /**
   * Setup
   * @param props  - Props
   * @param context - Context
   */
  setup(props: CodeMirrorPropsInterface, context) {
    /** Editor DOM */
    const editor: Ref<Element | undefined> = ref<Element>();

    /** Model */
    const modelValue: Ref<string> = ref(props.modelValue);

    /** Dark mode */
    const dark: Ref<boolean | undefined> = ref(props.dark);

    /** CodeMirror Editor View */
    let view!: EditorView;

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    /**
     * Input value changed
     *
     * @see {@link https://codemirror.net/6/docs/migration/#making-changes | Making Changes}
     */
    watch(modelValue, current => {
      if (view.composing) {
        // IME fix
        return;
      }

      /** Previous cursor location */
      const previous = view.state.selection;
      view.setState(
        EditorState.create({
          doc: current,
          extensions: extension.value,
          selection: previous,
        })
      );
    });

    /** Toggle Dark mode */
    watch(dark, () => {
      view.setState(
        EditorState.create({
          doc: modelValue.value,
          extensions: extension.value,
        })
      );
    });

    /** CodeMirror Extension */
    const extension: ComputedRef<Extension[]> = computed(() => {
      /** Default extension */
      const ext: Extension[] = compact([
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          emit('viewupdate', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme || {}, { dark: props.dark }),
        // locale settings
        props.phrases ? EditorState.phrases.of(props.phrases) : undefined,
        // Parser language setting
        props.lang,
        // Readonly option
        props.readonly ? EditorState.readOnly.of(props.readonly) : undefined,
        // Editable option
        props.editable ? EditorView.editable.of(props.editable) : undefined,
      ]);

      if (props.linter) {
        // Append Linter settings
        merge(ext, props.linter);
      }

      if (props.extensions) {
        // Append Extensions (such as basic-setup)
        merge(ext, props.extensions);
      }

      console.debug('[CodeMirror.vue] Loaded extensions:', ext);
      return ext;
    });

    /** When loaded */
    onMounted(() => {
      let v = modelValue.value;
      if (!v && editor.value) {
        v = (editor.value.childNodes[0] as HTMLDivElement).innerText;
      }

      // Register Codemirror
      view = new EditorView({
        state: EditorState.create({
          doc: v,
          extensions: extension.value,
        }),
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.update([tr]);

          if (tr.changes.empty) return;
          // to parent binding
          modelValue.value = view.state.doc.toString();
          emit('update:modelValue', modelValue.value);
        },
      });
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

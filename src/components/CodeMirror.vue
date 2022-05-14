<template>
  <div ref="editor" class="vue-codemirror">
    <aside v-show="!context.slots.default"><slot /></aside>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted,
  defineComponent,
  nextTick,
  type ComputedRef,
  type Ref,
  type PropType,
  type SetupContext,
} from 'vue-demi';

import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
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
      type: String,
      default: '',
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
    /** Line wrapping */
    wrap: {
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

    /** Model */
    const modelValue: Ref<string> = ref(props.modelValue);

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    /** CodeMirror Extension */
    const extensions: ComputedRef<Extension[]> = computed(() => {
      /** Default extension */
      const ext = [
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          emit('update', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: props.dark }),
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
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
          extensions: extensions.value,
          selection: previous,
        })
      );
    });

    /** Apply extensions */
    watch(
      extensions,
      async () => {
        view.setState(
          EditorState.create({
            doc: modelValue.value,
            extensions: extensions.value,
          })
        );
        await nextTick();
      },
      { deep: true }
    );

    /** When loaded */
    onMounted(async () => {
      /** Initial Value */
      const value =
        !modelValue.value && editor.value
          ? trim((editor.value.childNodes[0] as HTMLDivElement).innerText)
          : modelValue.value;

      // Register Codemirror
      view = new EditorView({
        state: EditorState.create({
          doc: value,
          extensions: extensions.value,
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

<template>
  <pre ref="editor">
    <template v-if="!slots.default"><slot /></template>
  </pre>
</template>

<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  defineProps,
  defineEmits,
  ref,
  watch,
  useSlots,
  withDefaults,
  onMounted,
  onUnmounted,
} from 'vue-demi';
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
/** Slots */
const slots = useSlots();

/** Prop Interface */
interface Props {
  /** Model value */
  modelValue?: string;
  /** Value (for compatibility) */
  value?: string;
  /**
   * Theme
   *
   * @see {@link https://codemirror.net/6/examples/styling/ | Example: Styling}
   */
  theme?: { [selector: string]: StyleSpec };
  /** Dark Mode */
  dark?: boolean;
  /**
   * Readonly
   *
   * @see {@link https://codemirror.net/6/docs/ref/#state.EditorState%5EreadOnly | readOnly}
   */
  readonly?: boolean;
  /**
   * Editable
   *
   * @see {@link https://codemirror.net/6/docs/ref/#view.EditorView%5Eeditable | editable}
   */
  editable?: boolean;
  /**
   * Additional Extension
   *
   * @see {@link https://codemirror.net/6/docs/ref/#state.Extension | Extending Editor State}
   */
  extensions?: Extension[];
  /**
   * Language Phreses
   *
   * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
   */
  phrases?: Record<string, string>;
  /**
   * CodeMirror Language
   *
   * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
   */
  lang?: LanguageSupport;
  /**
   * CodeMirror Linter
   *
   * @see {@link https://codemirror.net/6/docs/ref/#lint | @codemirror/lint}
   */
  linter?: Diagnostic[];
  /** Placeholder */
  placeholder?: string;
}

/** Props */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  value: '',
  theme: undefined,
  dark: false,
  readonly: false,
  editable: false,
  extensions: undefined,
  phrases: undefined,
  lang: undefined,
  linter: undefined,
  placeholder: '',
});

/** Emit Interface */
interface Emits {
  (e: 'input', value: string): void;
  (e: 'update', value: ViewUpdate): void;
}

/** Emit */
const emit = defineEmits<Emits>();

/** Editor DOM */
const editor = ref<Element>();

/** Internal value */
const value = ref<string>(props.value ? props.value : props.modelValue);

/** CodeMirror Editor View */
let view!: EditorView;

/**
 * Input value changed
 *
 * @see {@link https://codemirror.net/6/docs/migration/#making-changes | Making Changes}
 */
watch(
  () => value,
  current => {
    if (view.composing) {
      // IME fix
      return;
    }

    /** Previous cursor location */
    const previous = view.state.selection;
    view.setState(
      EditorState.create({
        doc: current.value,
        extensions: extension.value,
        selection: previous,
      })
    );
  }
);

/** Toggle Dark mode */
watch(
  () => props.dark,
  () => {
    view.setState(
      EditorState.create({
        doc: value.value,
        extensions: extension.value,
      })
    );
  }
);

/** CodeMirror Extension */
const extension: ComputedRef<Extension[]> = computed(() => {
  // console.log(props, slots.default);
  /** Default extension */
  const ext: Extension[] = compact([
    // ViewUpdate event listener
    EditorView.updateListener.of((update: ViewUpdate) =>
      emit('update', update)
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

  // console.debug('[CodeMirror.vue] Loaded extensions:', ext);

  return ext;
});

/** When loaded */
onMounted(() => {
  // Register Codemirror
  view = new EditorView({
    state: EditorState.create({
      doc: value.value,
      extensions: extension.value,
    }),
    parent: editor.value,
    dispatch: (tr: Transaction) => {
      view.update([tr]);

      if (tr.changes.empty) return;
      // to parent binding
      emit('input', view.state.doc.toString());
    },
  });
});

/** Destroy */
onUnmounted(() => view.destroy());

/** Vue node to plain text
const getChildrenTextContent = (children): string => {
  return children
    .map(node =>
      node.children ? getChildrenTextContent(node.children) : node.text || '\n'
    )
    .join('');
};
 */
</script>

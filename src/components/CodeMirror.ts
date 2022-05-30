import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  toRefs,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type SetupContext,
} from 'vue-demi';

import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { linter, lintGutter } from '@codemirror/lint';
import { basicSetup } from '@codemirror/basic-setup';
import { indentWithTab } from '@codemirror/commands';

import { clone, compact, trim } from 'lodash';

import type CodeMirrorEmitsInterface from '@/interfaces/CodeMirrorEmitsInterface';
import h, { slot } from '@/helpers/h-demi';

import type { Extension, Text, Transaction } from '@codemirror/state';
import type { LanguageSupport } from '@codemirror/language';
import type { ViewUpdate } from '@codemirror/view';
import type { LintSource } from '@codemirror/lint';
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
      default: () => undefined,
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
      default: () => {
        return [];
      },
    },
    /**
     * Language Phreses
     *
     * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
     */
    phrases: {
      type: Object as PropType<Record<string, string>>,
      default: () => undefined,
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
     */
    lang: {
      type: Object as PropType<LanguageSupport>,
      default: () => undefined,
    },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/6/docs/ref/#lint | @codemirror/lint}
     */
    linter: {
      type: Function as PropType<LintSource>,
      default: undefined,
    },
    /** Show Gutter */
    lintGutter: {
      type: Boolean,
      defalt: false,
    },
  },
  /** Emits */
  emits: ['update:modelValue', 'update'],
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context: SetupContext) {
    /** Editor DOM */
    const editor: Ref<Element | undefined> = ref();

    /** Dark mode */
    const { dark } = toRefs(props);

    /** Internal value */
    const doc: Ref<string | Text> = ref(clone(props.modelValue));

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    /** CodeMirror Extension */
    const exts: ComputedRef<Extension[]> = computed(() => {
      return compact([
        // Toggle basic setup
        props.basic ? basicSetup : undefined,
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          emit('update', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: dark.value }),
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
        // Indent with tab
        props.tab ? keymap.of([indentWithTab]) : undefined,
        // locale settings
        props.phrases ? EditorState.phrases.of(props.phrases) : undefined,
        // Readonly option
        props.readonly ? EditorState.readOnly.of(props.readonly) : undefined,
        // Editable option
        props.editable ? EditorView.editable.of(props.editable) : undefined,
        // Lang
        props.lang ? toRaw(props.lang) : undefined,
        // Append Linter settings
        props.linter ? linter(props.linter) : undefined,
        // Show 🔴 to error line when linter enabled.
        props.linter && props.lintGutter ? lintGutter() : undefined,
        // Append Extensions (such as basic-setup)
        ...props.extensions,
      ]);
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
      // overwrite initial value
      let text = doc.value;
      if (editor.value && editor.value.childNodes[0]) {
        if (text !== '') {
          console.warn(
            '[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.'
          );
        }
        text = trim((editor.value.childNodes[0] as HTMLElement).innerText);
      }

      // Register Codemirror
      view = new EditorView({
        state: EditorState.create({
          doc: text,
          selection: props.selection,
          extensions: exts.value,
        }),
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.update([tr]);
          console.log(view.state.doc.toString(), tr);

          // to parent binding
          if (tr.changes.empty) return;

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
  render() {
    // <template>
    //   <div ref="editor" class="vue-codemirror">
    //     <aside v-show="!context.slots.default"><slot /></aside>
    //   </div>
    // </template>
    return h(
      'div',
      {
        ref: 'editor',
        class: 'vue-codemirror',
      },
      this.$slots.default
        ? h('aside', { style: 'display: none;' }, slot(this.$slots.default))
        : undefined
    );
  },
});

import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  toRefs,
  watch,
  type PropType,
  type Ref,
  type SetupContext,
} from 'vue-demi';

import { EditorSelection, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { linter, lintGutter } from '@codemirror/lint';
import { basicSetup } from 'codemirror';
import { indentWithTab } from '@codemirror/commands';

import { compact, trim } from 'lodash';

import h, { slot } from '@/helpers/h-demi';

import type {
  Extension,
  SelectionRange,
  Text,
  Transaction,
} from '@codemirror/state';
import type { LanguageSupport } from '@codemirror/language';
import type { ViewUpdate } from '@codemirror/view';
import type { LintSource } from '@codemirror/lint';
import type { StyleSpec } from 'style-mod';

/** Emit Interface */
export interface CodeMirrorEmitsInterface {
  /** Model Update */
  (e: 'update:modelValue', value: string | Text): void;
  /** CodeMirror ViewUpdate */
  (e: 'update', value: ViewUpdate): void;
}

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
    const doc: Ref<string | Text> = ref(props.modelValue);

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    /** CodeMirror Editor View */
    let view: EditorView;

    /**
     * Input value changed
     *
     * @see {@link https://codemirror.net/6/docs/migration/#making-changes | Making Changes}
     */
    watch(doc, value => {
      if (view.composing) {
        // IME fix
        return;
      }
      /** Previous cursor location */
      const previous = view.state.selection;

      // TODO: Since history etc. may not work, change to implementation using dispatch
      view.setState(
        EditorState.create({
          doc: value,
          // extensions: getExtensions(),
          selection: previous,
        })
      );
    });

    // for parent-to-child binding.
    watch(
      () => props.modelValue,
      text =>
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text },
        })
    );

    // Toggle Dark mode
    // TODO: Since the input value is reset, change to the implementation using dispatch
    watch(dark, () => {
      view.setState(
        EditorState.create({
          doc: doc.value,
          // extensions: getExtensions(),
        })
      );
    });

    /** When loaded */
    onMounted(async () => {
      let value = doc.value;
      // overwrite initial value
      if (editor.value && editor.value.childNodes[0]) {
        if (doc.value !== '') {
          console.warn(
            '[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.'
          );
        }
        value = trim((editor.value.childNodes[0] as HTMLElement).innerText);
      }

      // Register Codemirror
      view = new EditorView({
        doc: value,
        extensions: getExtensions(),
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.update([tr]);
          // TODO: Emit lint error event
          // console.log(view.state.doc.toString(), tr);

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

    /** Get CodeMirror Extension */
    const getExtensions = (): Extension[] => {
      const extensions = compact([
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
      // console.debug('[CodeMirror.vue] Loaded extensions: ', extensions);
      return extensions;
    };

    /** Get editor Selection Object */
    const selection = (): EditorSelection => view.state.selection;

    // Bellow is experimental.

    /**
     * Get the text between the given points in the editor.
     *
     * @param from - start line number
     * @param to - end line number
     */
    const getRange = (from?: number, to?: number): string =>
      view.state.sliceDoc(from, to);
    /**
     * Get the content of line.
     *
     * @param number - line number
     */
    const getLine = (number: number): string =>
      view.state.doc.line(number + 1).text;
    /** Get the number of lines in the editor. */
    const lineCount = (): number => view.state.doc.lines;
    /** Retrieve one end of the primary selection. */
    const getCursor = (): number => selection().main.head;
    /** Retrieves a list of all current selections. */
    const listSelections = (): readonly SelectionRange[] => selection().ranges;
    /** Get the currently selected code. */
    const getSelection = (): string =>
      view.state.sliceDoc(selection().main.from, selection().main.to);
    /**
     * The length of the given array should be the same as the number of active selections.
     * Replaces the content of the selections with the strings in the array.
     */
    const getSelections = (): string[] =>
      selection().ranges.map(r => view.state.sliceDoc(r.from, r.to));
    /** Return true if any text is selected. */
    const somethingSelected = (): boolean =>
      selection().ranges.some(r => !r.empty);

    /**
     * Replace the part of the document between from and to with the given string.
     *
     * @param replacement - replacement text
     * @param from - start string at position
     * @param to -  insert the string at position
     */
    const replaceRange = (
      replacement: string | Text,
      from: number,
      to: number
    ) =>
      view.dispatch({
        changes: { from, to, insert: replacement },
      });
    /**
     * Replace the selection(s) with the given string.
     * By default, the new selection ends up after the inserted text.
     *
     * @param replacement - replacement text
     */
    const replaceSelection = (replacement: string | Text) =>
      view.dispatch(view.state.replaceSelection(replacement));
    /**
     * Set the cursor position.
     *
     * @param position - position.
     */
    const setCursor = (position: number) =>
      view.dispatch({ selection: { anchor: position } });
    /**
     * Set a single selection range.
     *
     * @param anchor - anchor position
     * @param head -
     */
    const setSelection = (anchor: number, head?: number) =>
      view.dispatch({ selection: { anchor, head } });
    /**
     * Sets a new set of selections. There must be at least one selection in the given array.
     *
     * @param ranges - Selection range
     * @param primary -
     */
    const setSelections = (
      ranges: readonly SelectionRange[],
      primary?: number
    ) =>
      view.dispatch({
        selection: EditorSelection.create(ranges, primary),
      });
    /**
     * Applies the given function to all existing selections, and calls extendSelections on the result.
     *
     * @param f - function
     */
    const extendSelectionsBy = (f: Function) =>
      view.dispatch({
        selection: EditorSelection.create(
          selection().ranges.map(r => r.extend(f(r)))
        ),
      });

    /** Set focus */
    const focus = () => view.focus();
    /** is Focused */
    const hasFocus = (): boolean => view.hasFocus;

    return {
      context,
      editor,
      selection,
      // Bellow is CodeMirror5's function
      getRange,
      getLine,
      lineCount,
      getCursor,
      listSelections,
      getSelection,
      getSelections,
      somethingSelected,
      replaceRange,
      replaceSelection,
      setCursor,
      setSelection,
      setSelections,
      extendSelectionsBy,
      focus,
      hasFocus,
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

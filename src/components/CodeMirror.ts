import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toRaw,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
  type SetupContext,
} from 'vue-demi';

// Helpers
import h, { slot } from '@/helpers/h-demi';
import { compact, trim } from 'lodash';

// CodeMirror
import { EditorSelection, EditorState, StateEffect } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { linter, lintGutter } from '@codemirror/lint';
import { basicSetup, minimalSetup } from 'codemirror';
import { indentWithTab } from '@codemirror/commands';

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
  (e: 'update:view', value: ViewUpdate): void;
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
     * @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup | basicSetup}
     */
    basic: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Minimal Setup (The basic setting has priority.)
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup | minimalSetup}
     */
    minimal: {
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
  emits: ['update:modelValue', 'update:view'],
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context: SetupContext) {
    /** Editor DOM */
    const editor: Ref<Element | undefined> = ref();

    /** Internal value */
    const doc: Ref<string | Text> = ref(props.modelValue);

    /** CodeMirror Editor View */
    let view: EditorView;

    /** Selection */
    const selection: Ref<EditorSelection> = computed({
      get: () => view.state.selection,
      set: s => view.dispatch({ selection: s }),
    });

    /** Cursor Position */
    const cursor: Ref<number> = computed({
      get: () => selection.value.main.head || 0,
      set: a => view.dispatch({ selection: { anchor: a } }),
    });

    /** Editor State */
    const state: Ref<EditorState> = computed({
      get: () => view.state,
      set: s => view.setState(s),
    });

    /** Focus */
    const focus: Ref<boolean> = computed({
      get: () => view.hasFocus,
      set: f => {
        if (f) {
          view.focus();
        }
      },
    });

    /** Get CodeMirror Extension */
    const extensions: ComputedRef<Extension[]> = computed(() =>
      compact([
        // Toggle basic setup
        props.basic ? basicSetup : undefined,
        // Toggle minimal setup
        props.minimal && !props.basic ? minimalSetup : undefined,
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          emit('update:view', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: props.dark }),
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
      ])
    );

    /** Emits */
    const emit = context.emit as CodeMirrorEmitsInterface;

    // for parent-to-child binding.
    watch(
      () => props.modelValue,
      text => {
        if (view.composing) {
          // IME fix
          return;
        }
        /** Previous cursor location */
        const previous = view.state.selection;

        // Update
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text },
          selection: previous,
        });
      }
    );

    // Extension (mostly props) Changed
    watch(extensions, e => {
      // TODO: Reduce unchanched value
      view.dispatch({
        effects: StateEffect.reconfigure.of(e),
      });
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
        extensions: extensions.value,
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.update([tr]);
          // TODO: Emit lint error event
          // console.log(view.state.doc.toString(), tr);
          if (tr.changes.empty) return;
          // child-to-parent binding
          emit('update:modelValue', view.state.doc.toString());
        },
      });
      await nextTick();
    });

    /** Destroy */
    onUnmounted(() => view.destroy());

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
    const getCursor = (): number => cursor.value;
    /** Retrieves a list of all current selections. */
    const listSelections = (): readonly SelectionRange[] =>
      view.state.selection.ranges;
    /** Get the currently selected code. */
    const getSelection = (): string =>
      view.state.sliceDoc(
        view.state.selection.main.from,
        view.state.selection.main.to
      );
    /**
     * The length of the given array should be the same as the number of active selections.
     * Replaces the content of the selections with the strings in the array.
     */
    const getSelections = (): string[] =>
      view.state.selection.ranges.map(r => view.state.sliceDoc(r.from, r.to));
    /** Return true if any text is selected. */
    const somethingSelected = (): boolean =>
      view.state.selection.ranges.some(r => !r.empty);

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
    const setCursor = (position: number) => (cursor.value = position);
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
          selection.value.ranges.map(r => r.extend(f(r)))
        ),
      });

    return {
      context,
      editor,
      cursor,
      selection,
      state,
      focus,
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
    };
  },
  render() {
    // <template>
    //   <div ref="editor" class="vue-codemirror">
    //     <aside v-show="!context.slots.default" aria-hidden><slot /></aside>
    //   </div>
    // </template>
    return h(
      'div',
      {
        ref: 'editor',
        class: 'vue-codemirror',
      },
      this.$slots.default
        ? h(
            'aside',
            { style: 'display: none;', 'aria-hidden': 'true' },
            slot(this.$slots.default)
          )
        : undefined
    );
  },
});

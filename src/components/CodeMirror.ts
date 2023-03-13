import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
  type ComputedRef,
  type ObjectEmitsOptions,
  type PropType,
  type Ref,
  type SetupContext,
  type ShallowRef,
  type WritableComputedRef,
} from 'vue-demi';

// Helpers
import h, { slot } from '@/helpers/h-demi';
import { compact, trim } from 'lodash';

// CodeMirror
import { basicSetup, minimalSetup } from 'codemirror';
import {
  EditorSelection,
  EditorState,
  StateEffect,
  type Extension,
  type SelectionRange,
  type Text,
} from '@codemirror/state';
import {
  EditorView,
  keymap,
  placeholder,
  type ViewUpdate,
} from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import {
  forceLinting,
  linter,
  lintGutter,
  type LintSource,
} from '@codemirror/lint';
import type { LanguageSupport } from '@codemirror/language';
import type { StyleSpec } from 'style-mod';

/** Emit Interface */
export interface CodeMirrorEmitsOptions extends ObjectEmitsOptions {
  /** Model Update */
  (e: 'update:modelValue', value: string | Text): void;
  /** CodeMirror ViewUpdate */
  (e: 'update', value: ViewUpdate): void;
  /** CodeMirror onFocus */
  (e: 'focus', value: boolean): void;
  /** CodeMirror onReady */
  (
    e: 'ready',
    value: {
      view: EditorView;
      state: EditorState;
      container: HTMLElement;
    }
  ): void;
  /** CodeMirror onDestroy */
  (e: 'destroy'): void;
  /** State Changed */
  (e: 'change', value: EditorState): void;
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
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
     */
    theme: {
      type: Object as PropType<{ [selector: string]: StyleSpec }>,
      default: () => {},
    },
    /** Dark Mode */
    dark: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Basic Setup
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup}
     */
    basic: {
      type: Boolean,
      default: false,
    },
    /**
     * Use Minimal Setup (The basic setting has priority.)
     *
     * @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup}
     */
    minimal: {
      type: Boolean,
      default: false,
    },
    /**
     * Placeholder
     *
     * @see {@link https://codemirror.net/docs/ref/#view.placeholder}
     */
    placeholder: {
      type: String as PropType<string | HTMLElement>,
      default: undefined,
    },
    /**
     * Line wrapping
     *
     * An extension that enables line wrapping in the editor (by setting CSS white-space to pre-wrap in the content).
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView%5ElineWrapping}
     */
    wrap: {
      type: Boolean,
      default: false,
    },
    /**
     * Allow tab key indent.
     *
     * @see {@link https://codemirror.net/examples/tab/}
     */
    tab: {
      type: Boolean,
      default: false,
    },
    /**
     * Allow Multiple Selection.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections}
     */
    allowMultipleSelections: {
      type: Boolean,
      default: false,
    },
    /**
     * Tab size
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^tabSize}
     */
    tabSize: {
      type: Number,
      default: undefined,
    },
    /**
     * Set line break (separetor) char.
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^lineSeparator}
     */
    lineSeparator: {
      type: String,
      default: undefined,
    },
    /**
     * Readonly
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState^readOnly}
     */
    readonly: {
      type: Boolean,
      default: false,
    },
    /**
     * Disable input.
     *
     * This is the reversed value of the CodeMirror editable.
     * Similar to `readonly`, but setting this value to true disables dragging.
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^editable}
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Additional Extension
     *
     * @see {@link https://codemirror.net/docs/ref/#state.Extension}
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
     * @see {@link https://codemirror.net/examples/translate/}
     */
    phrases: {
      type: Object as PropType<Record<string, string>>,
      default: () => undefined,
    },
    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/docs/ref/#language}
     */
    lang: {
      type: Object as PropType<LanguageSupport>,
      default: () => undefined,
    },
    /**
     * CodeMirror Linter
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter}
     */
    linter: {
      type: Function as PropType<LintSource>,
      default: undefined,
    },
    /**
     * Linter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.linter^config}
     */
    linterConfig: {
      type: Object,
      default: () => undefined,
    },
    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    forceLinting: {
      type: Boolean,
      default: false,
    },
    /**
     * Show Linter Gutter
     *
     * An area to 🔴 the lines with errors will be displayed.
     * This feature is not enabled if `linter` is not specified.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.lintGutter}
     */
    gutter: {
      type: Boolean,
      defalt: false,
    },
    /**
     * Gutter Config
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.lintGutter^config}
     */
    gutterConfig: {
      type: Object,
      default: () => undefined,
    },
    /**
     * Using tag
     */
    tag: {
      type: String,
      default: 'div',
    },
  },
  /** Emits */
  emits: ['update:modelValue', 'update', 'ready', 'focus', 'change', 'destroy'],
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  // @ts-ignore
  setup(props, context: SetupContext<CodeMirrorEmitsOptions>) {
    /** Editor DOM */
    const editor: Ref<HTMLElement | undefined> = ref();

    /** Internal value */
    const doc: Ref<string | Text> = ref(props.modelValue);

    /**
     * CodeMirror Editor View
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView}
     */
    const view: ShallowRef<EditorView> = shallowRef(new EditorView());

    /**
     * Editor Selection
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorSelection}
     */
    const selection: WritableComputedRef<EditorSelection> = computed({
      get: () => view.value.state.selection,
      set: s => view.value.dispatch({ selection: s }),
    });

    /**
     * Editor State
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState}
     */
    const state: WritableComputedRef<EditorState> = computed({
      get: () => view.value.state,
      set: s => view.value.setState(s),
    });

    /** Cursor Position */
    const cursor: WritableComputedRef<number> = computed({
      get: () => view.value.state.selection.main.head || 0,
      set: a => view.value.dispatch({ selection: { anchor: a } }),
    });

    /**
     * Focus
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView.hasFocus}
     */
    const focus: WritableComputedRef<boolean> = computed({
      get: () => view.value.hasFocus,
      set: f => {
        if (f) {
          view.value.focus();
        }
      },
    });

    /** Text length */
    const length: ComputedRef<number> = computed(
      () => view.value.state.doc.length
    );

    /** Get CodeMirror Extension */
    const extensions: ComputedRef<Extension[]> = computed(() =>
      // TODO: Ignore previous prop was not changed.
      compact<Extension>([
        // Toggle basic setup
        props.basic ? basicSetup : undefined,
        // Toggle minimal setup
        props.minimal && !props.basic ? minimalSetup : undefined,
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate) =>
          context.emit('update', update)
        ),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: props.dark }),
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
        // Indent with tab
        props.tab ? keymap.of([indentWithTab]) : undefined,
        // Allow Multiple Selections
        EditorState.allowMultipleSelections.of(props.allowMultipleSelections),
        // Indent tab size
        props.tabSize ? EditorState.tabSize.of(props.tabSize) : undefined,
        // locale settings
        props.phrases ? EditorState.phrases.of(props.phrases) : undefined,
        // Readonly option
        EditorState.readOnly.of(props.readonly),
        // Editable option
        EditorView.editable.of(!props.disabled),
        // Set Line break char
        props.lineSeparator
          ? EditorState.lineSeparator.of(props.lineSeparator)
          : undefined,
        // Lang
        props.lang ? props.lang.extension : undefined,
        // Append Linter settings
        props.linter ? linter(props.linter, props.linterConfig) : undefined,
        // Show 🔴 to error line when linter enabled.
        props.linter && props.gutter
          ? lintGutter(props.gutterConfig)
          : undefined,
        // Placeholder
        props.placeholder ? placeholder(props.placeholder) : undefined,
        // Append Extensions
        ...props.extensions,
      ])
    );

    // for parent-to-child binding.
    watch(
      () => props.modelValue,
      value => {
        if (view.value.composing) {
          // IME fix
          return;
        }

        // Enable Force Linting
        if (props.linter && props.forceLinting) {
          forceLinting(view.value);
        }

        // Update
        view.value.dispatch({
          changes: { from: 0, to: view.value.state.doc.length, insert: value },
          selection: view.value.state.selection,
          scrollIntoView: true,
        });
      },
      { immediate: true }
    );

    // Extension (mostly props) Changed
    watch(
      () => extensions.value,
      exts => {
        view.value.dispatch({
          effects: StateEffect.reconfigure.of(exts),
        });
      },
      { deep: true }
    );

    // focus changed
    watch(focus, isFocus => context.emit('focus', isFocus));

    /** When loaded */
    onMounted(async () => {
      /** Initial value */
      let value: string | Text = doc.value;
      if (editor.value && editor.value.childNodes[0]) {
        // when slot mode, overwrite initial value
        if (doc.value !== '') {
          console.warn(
            '[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.'
          );
        }
        value = trim((editor.value.childNodes[0] as HTMLElement).innerText);
      }

      // Register Codemirror
      view.value = new EditorView({
        doc: value,
        extensions: extensions.value,
        parent: editor.value,
        dispatch: tr => {
          view.value.update([tr]);
          // TODO: Emit lint error event
          // console.log(view.state.doc.toString(), tr);
          if (tr.changes.empty) return;
          // child-to-parent binding
          const v = view.value.state.doc.toString();
          context.emit('update:modelValue', v);
          context.emit('change', view.value.state);
        },
      });

      await nextTick();
      context.emit('ready', {
        view: view,
        state: view.value.state,
        container: editor.value,
      });
    });

    /** Destroy */
    onUnmounted(() => {
      if (view.value) {
        view.value.destroy();
        context.emit('destroy');
      }
    });

    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    const lint = () => {
      if (props.linter) {
        forceLinting(view.value);
      }
    };

    /**
     * Force Reconfigure Extension
     *
     * @see {@link https://codemirror.net/examples/config/#top-level-reconfiguration}
     */
    const forceReconfigure = () => {
      // Deconfigure all Extensions
      view.value.dispatch({
        effects: StateEffect.reconfigure.of([]),
      });
      // Register extensions
      view.value.dispatch({
        effects: StateEffect.appendConfig.of(extensions.value),
      });
    };

    /* ----- Bellow is experimental. ------ */

    /**
     * Get the text between the given points in the editor.
     *
     * @param from - start line number
     * @param to - end line number
     */
    const getRange = (from?: number, to?: number): string =>
      view.value.state.sliceDoc(from, to);
    /**
     * Get the content of line.
     *
     * @param number - line number
     */
    const getLine = (number: number): string =>
      view.value.state.doc.line(number + 1).text;
    /** Get the number of lines in the editor. */
    const lineCount = (): number => view.value.state.doc.lines;
    /** Retrieve one end of the primary selection. */
    const getCursor = (): number => cursor.value;
    /** Retrieves a list of all current selections. */
    const listSelections = (): readonly SelectionRange[] =>
      view.value.state.selection.ranges;
    /** Get the currently selected code. */
    const getSelection = (): string =>
      view.value.state.sliceDoc(
        view.value.state.selection.main.from,
        view.value.state.selection.main.to
      );
    /**
     * The length of the given array should be the same as the number of active selections.
     * Replaces the content of the selections with the strings in the array.
     */
    const getSelections = (): string[] =>
      view.value.state.selection.ranges.map((r: { from: number; to: number }) =>
        view.value.state.sliceDoc(r.from, r.to)
      );
    /** Return true if any text is selected. */
    const somethingSelected = (): boolean =>
      view.value.state.selection.ranges.some(
        (r: { empty: boolean }) => !r.empty
      );

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
      view.value.dispatch({
        changes: { from, to, insert: replacement },
      });
    /**
     * Replace the selection(s) with the given string.
     * By default, the new selection ends up after the inserted text.
     *
     * @param replacement - replacement text
     */
    const replaceSelection = (replacement: string | Text) =>
      view.value.dispatch(view.value.state.replaceSelection(replacement));
    /**
     * Set the cursor position.
     *
     * @param position - position.
     */
    const setCursor = (position: number): number => (cursor.value = position);
    /**
     * Set a single selection range.
     *
     * @param anchor - anchor position
     * @param head -
     */
    const setSelection = (anchor: number, head?: number) =>
      view.value.dispatch({ selection: { anchor, head } });
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
      view.value.dispatch({
        selection: EditorSelection.create(ranges, primary),
      });
    /**
     * Applies the given function to all existing selections, and calls extendSelections on the result.
     *
     * @param f - function
     */
    const extendSelectionsBy = (f: Function) =>
      view.value.dispatch({
        selection: EditorSelection.create(
          selection.value.ranges.map((r: SelectionRange) => r.extend(f(r)))
        ),
      });

    /** Export properties and functions */
    context.expose({
      editor,
      cursor,
      selection,
      state,
      focus,
      length,
      lint,
      forceReconfigure,
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
    });

    return {
      editor,
    };
  },
  render() {
    // <template>
    //   <div ref="editor" class="vue-codemirror">
    //     <aside v-show="!context.slots.default" aria-hidden><slot /></aside>
    //   </div>
    // </template>
    return h(
      // @ts-ignore
      this.$props.tag,
      {
        ref: 'editor',
        class: 'vue-codemirror',
      },
      // @ts-ignore
      this.$slots.default
        ? // Hide original content
          h(
            'aside',
            { style: 'display: none;', 'aria-hidden': 'true' },
            // @ts-ignore
            slot(this.$slots.default)
          )
        : undefined
    );
  },
});

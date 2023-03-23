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
  type PropType,
  type Ref,
  type ShallowRef,
  type WritableComputedRef,
} from 'vue-demi';

// Helpers
import h, { slot } from '@/helpers/h-demi';

// CodeMirror
import { basicSetup, minimalSetup } from 'codemirror';
import {
  Compartment,
  EditorSelection,
  EditorState,
  StateEffect,
  type Transaction,
  type Extension,
  type SelectionRange,
  type StateField,
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
  diagnosticCount as linterDagnosticCount,
  type LintSource,
} from '@codemirror/lint';
import type { LanguageSupport } from '@codemirror/language';
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
     * Theme
     *
     * @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
     */
    theme: {
      type: Object as PropType<Record<string, StyleSpec>>,
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
  emits: {
    /** Model Update */
    'update:modelValue': (value: string | Text) => true,
    /** CodeMirror ViewUpdate */
    update: (value: ViewUpdate) => true,
    /** CodeMirror onReady */
    ready: (value: {
      view: EditorView;
      state: EditorState;
      container: HTMLElement;
    }) => true,
    /** CodeMirror onFocus */
    focus: (value: boolean) => true,
    /** State Changed */
    change: (value: EditorState) => true,
    /** CodeMirror onDestroy */
    destroy: () => true,
  },
  /**
   * Setup
   *
   * @param props  - Props
   * @param context - Context
   */
  setup(props, context) {
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

    /**
     * Editor State
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorState}
     */
    const state: Ref<EditorState | undefined> = ref();

    /**
     * Editor Selection
     *
     * @see {@link https://codemirror.net/docs/ref/#state.EditorSelection}
     */
    const selection: WritableComputedRef<EditorSelection | undefined> =
      computed({
        get: () => state.value?.selection,
        set: s => view.value?.dispatch({ selection: s }),
      });

    /** Cursor Position */
    const cursor: WritableComputedRef<number> = computed({
      get: () => state.value?.selection.main.head ?? 0,
      set: a => view.value?.dispatch({ selection: { anchor: a } }),
    });

    /** Text length */
    const length: ComputedRef<number> = computed(
      () => state.value?.doc.length ?? 0
    );

    /** JSON */
    const json: WritableComputedRef<
      Record<string, StateField<any>> | undefined
    > = computed({
      get: () => state.value?.toJSON(),
      set: j => view.value?.setState(EditorState.fromJSON(j)),
    });

    /**
     * Returns the number of active lint diagnostics in the given state.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.diagnosticCount}
     */
    const diagnosticCount: Ref<number> = ref(0);

    // Synamic Reconfiguration
    // @see https://codemirror.net/examples/config/

    const language = new Compartment();
    const tabSize = new Compartment();

    /** Get CodeMirror Extension */
    const extensions: ComputedRef<Extension[]> = computed(() =>
      // TODO: Ignore previous prop was not changed.
      [
        // Toggle basic setup
        props.basic ? basicSetup : undefined,
        // Toggle minimal setup
        props.minimal && !props.basic ? minimalSetup : undefined,
        // ViewUpdate event listener
        EditorView.updateListener.of((update: ViewUpdate): void => {
          if (!update.docChanged) {
            return;
          }
          context.emit('update', update);
        }),
        // Toggle light/dark mode.
        EditorView.theme(props.theme, { dark: props.dark }),
        // Toggle line wrapping
        props.wrap ? EditorView.lineWrapping : undefined,
        // Indent with tab
        props.tab ? keymap.of([indentWithTab]) : undefined,
        // Allow Multiple Selections
        EditorState.allowMultipleSelections.of(props.allowMultipleSelections),
        // Indent tab size
        props.tabSize
          ? tabSize.of(EditorState.tabSize.of(props.tabSize))
          : undefined,
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
        props.lang ? language.of(props.lang) : undefined,
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
      ].filter((extension): extension is Extension => !!extension)
    );

    // for parent-to-child binding.
    watch(
      () => props.modelValue,
      value => {
        if (view.value.composing) {
          // IME fix
          return;
        }

        // Update
        view.value.dispatch({
          changes: { from: 0, to: view.value.state.doc.length, insert: value },
          selection: view.value.state.selection,
          scrollIntoView: true,
        });

        // Commit Vue side state.
        state.value = view.value.state;
      },
      { immediate: true }
    );

    /*
    watch(
      () => view.value.state,
      s => {
        if (props.linter) {
          console.log(linterDagnosticCount(s));
          diagnosticCount.value = linterDagnosticCount(view.value.state);
        }
      },
      { deep: true }
    );
    */

    // Extension (mostly props) Changed
    watch(
      extensions,
      exts => {
        view.value?.dispatch({
          effects: StateEffect.reconfigure.of(exts),
        });
      },
      { immediate: true }
    );

    // focus changed
    watch(focus, isFocus => {
      if (!isFocus) {
        if (props.linter) {
          // TODO: Not work collectly
          const count = linterDagnosticCount(view.value.state);
          console.log(count);
          diagnosticCount.value = count;
        }
      }
      context.emit('focus', isFocus);
    });

    /** When loaded */
    onMounted(async () => {
      /** Initial value */
      let value: string | Text = doc.value;
      if (!editor.value) {
        return;
      }
      if (editor.value.childNodes[0]) {
        // when slot mode, overwrite initial value
        if (doc.value !== '') {
          console.warn(
            '[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.'
          );
        }
        value = (editor.value.childNodes[0] as HTMLElement).innerText.trim();
      }
      await nextTick();

      // Register Codemirror
      view.value = new EditorView({
        doc: value,
        extensions: extensions.value,
        parent: editor.value,
        dispatch: (tr: Transaction) => {
          view.value.update([tr]);

          if (tr.changes.empty || !tr.docChanged) {
            // if not change value, no fire emit event
            return;
          }
          console.log(tr);

          if (props.linter) {
            // TODO: Not work collectly
            const count = linterDagnosticCount(tr.startState);
            console.log(count);
            diagnosticCount.value = count;
            if (props.forceLinting) {
              lint();
            }
          }

          // console.log(view.state.doc.toString(), tr);
          // state.toString() is not defined, so use toJSON and toText function to convert string.
          context.emit('update:modelValue', (tr.state.doc as any).toString());
          // Emit EditorState
          context.emit('change', tr.state);

          state.value = tr.state;
        },
      });

      state.value = view.value.state;

      context.emit('ready', {
        view: view.value,
        state: state.value,
        container: editor.value,
      });
    });

    /** Destroy */
    onUnmounted(() => {
      view.value?.destroy();
      context.emit('destroy');
    });

    /**
     * Forces any linters configured to run when the editor is idle to run right away.
     *
     * @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
     */
    const lint = (): void => {
      if (!view.value || !props.linter) {
        return;
      }
      forceLinting(view.value);
    };

    /**
     * Force Reconfigure Extension
     *
     * @see {@link https://codemirror.net/examples/config/#top-level-reconfiguration}
     */
    const forceReconfigure = (): void => {
      // Deconfigure all Extensions
      view.value?.dispatch({
        effects: StateEffect.reconfigure.of([]),
      });
      // Register extensions
      view.value?.dispatch({
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
    const getRange = (from?: number, to?: number): string | undefined =>
      state.value?.sliceDoc(from, to);
    /**
     * Get the content of line.
     *
     * @param number - line number
     */
    const getLine = (number: number): string | undefined =>
      state.value?.doc.line(number + 1).text;
    /** Get the number of lines in the editor. */
    const lineCount = (): number => state.value?.doc.lines ?? 0;
    /** Retrieve one end of the primary selection. */
    const getCursor = (): number => cursor.value ?? 0;
    /** Retrieves a list of all current selections. */
    const listSelections = (): readonly SelectionRange[] | undefined =>
      state.value?.selection.ranges;
    /** Get the currently selected code. */
    const getSelection = (): string | undefined =>
      state.value?.sliceDoc(
        state.value.selection.main.from,
        state.value.selection.main.to
      );
    /**
     * The length of the given array should be the same as the number of active selections.
     * Replaces the content of the selections with the strings in the array.
     */
    const getSelections = (): string[] | undefined => {
      if (!state.value) {
        return;
      }
      const s = state.value;
      return s.selection.ranges.map((r: { from: number; to: number }) =>
        s.sliceDoc(r.from, r.to)
      );
    };
    /** Return true if any text is selected. */
    const somethingSelected = (): boolean =>
      state.value?.selection.ranges.some((r: { empty: boolean }) => !r.empty) ??
      false;

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
    ): void =>
      view.value.dispatch({
        changes: { from, to, insert: replacement },
      });
    /**
     * Replace the selection(s) with the given string.
     * By default, the new selection ends up after the inserted text.
     *
     * @param replacement - replacement text
     */
    const replaceSelection = (replacement: string | Text): void => {
      if (!state.value) {
        return;
      }
      view.value.dispatch(state.value.replaceSelection(replacement));
    };
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
    const setSelection = (anchor: number, head?: number): void =>
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
    ): void =>
      view.value.dispatch({
        selection: EditorSelection.create(ranges, primary),
      });
    /**
     * Applies the given function to all existing selections, and calls extendSelections on the result.
     *
     * @param f - function
     */
    const extendSelectionsBy = (f: any): void => {
      if (!selection.value) {
        return;
      }
      view.value.dispatch({
        selection: EditorSelection.create(
          selection.value.ranges.map((r: SelectionRange) => r.extend(f(r)))
        ),
      });
    };

    /** Export properties and functions */
    context.expose({
      editor,
      view,
      cursor,
      selection,
      state,
      focus,
      length,
      json,
      diagnosticCount,
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
      view,
      cursor,
      selection,
      state,
      focus,
      length,
      json,
      diagnosticCount,
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
    };
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
            { style: 'display: none;', 'aria-hidden': 'true' },
            slot(this.$slots.default)
          )
        : undefined
    );
  },
});

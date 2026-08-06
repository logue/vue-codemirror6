import type {
  EditorSelection,
  SelectionRange,
  StateField,
  Text,
} from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

/**
 * Public API exposed from the CodeMirror component instance.
 *
 * Note: Vue 3 auto-unwraps refs on the component instance proxy,
 * so reactive refs appear as their underlying value types here.
 */
export type CodeMirrorExposed = {
  /** Editor DOM element. */
  editor: HTMLElement | undefined;
  /** CodeMirror Editor View. @see {@link https://codemirror.net/docs/ref/#view.EditorView} */
  view: EditorView | undefined;
  /** Cursor position. */
  cursor: number;
  /** Editor selection. @see {@link https://codemirror.net/docs/ref/#state.EditorSelection} */
  selection: EditorSelection | undefined;
  /** Whether the editor has focus. @see {@link https://codemirror.net/docs/ref/#view.EditorView.hasFocus} */
  focus: boolean;
  /** Document text length. */
  length: number;
  /** Serialized editor state. */
  json: Record<string, StateField<unknown>> | undefined;
  /** Number of active lint diagnostics. @see {@link https://codemirror.net/docs/ref/#lint.diagnosticCount} */
  diagnosticCount: number;
  /** Editor content DOM element. */
  dom: Element | undefined;
  /** Forces any linters configured to run when the editor is idle to run right away. */
  lint: () => void;
  /** Deconfigures and re-registers all extensions. @see {@link https://codemirror.net/examples/config/#top-level-reconfiguration} */
  forceReconfigure: () => void;
  /** Get the text between the given points in the editor. */
  getRange: (from?: number, to?: number) => string | undefined;
  /** Get the content of the given line. */
  getLine: (number: number) => string | undefined;
  /** Get the number of lines in the editor. */
  lineCount: () => number;
  /** Retrieve one end of the primary selection. */
  getCursor: () => number;
  /** Retrieves a list of all current selections. */
  listSelections: () => readonly SelectionRange[];
  /** Get the currently selected code. */
  getSelection: () => string;
  /** Get the currently selected code for every selection range. */
  getSelections: () => string[];
  /** Return true if any text is selected. */
  somethingSelected: () => boolean;
  /** Replace the part of the document between from and to with the given string. */
  replaceRange: (replacement: string | Text, from: number, to: number) => void;
  /** Replace the selection(s) with the given string. */
  replaceSelection: (replacement: string | Text) => void;
  /** Set the cursor position. */
  setCursor: (position: number) => void;
  /** Set a single selection range. */
  setSelection: (anchor: number, head?: number) => void;
  /** Sets a new set of selections. There must be at least one selection in the given array. */
  setSelections: (ranges: readonly SelectionRange[], primary?: number) => void;
  /** Applies the given function to all existing selections, and calls extendSelections on the result. */
  extendSelectionsBy: (f: (range: SelectionRange) => number) => void;
};

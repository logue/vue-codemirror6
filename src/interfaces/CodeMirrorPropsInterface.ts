import type { LanguageSupport } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { Diagnostic } from '@codemirror/lint';
import type { StyleSpec } from 'style-mod';

/** Prop Interface */
export default interface CodeMirrorPropsInterface {
  /** Model value */
  modelValue: string;
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
}

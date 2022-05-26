import type { ViewUpdate } from '@codemirror/view';

/** Emit Interface */
export default interface CodeMirrorEmitsInterface {
  /** Model Update */
  (e: 'update:modelValue', value: string | Text): void;
  /** CodeMirror ViewUpdate */
  (e: 'update', value: ViewUpdate): void;
}

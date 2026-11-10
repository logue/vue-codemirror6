> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# Instance API

Access the instance through a template ref. Use the `CodeMirrorExposed` type for type checking.

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CodeMirror, { type CodeMirrorExposed } from 'vue-codemirror6';

const cm = ref<CodeMirrorExposed>();

const insertDate = () => {
  cm.value?.replaceSelection(new Date().toISOString());
};
</script>

<template>
  <code-mirror ref="cm" basic />
  <button type="button" @click="insertDate">Insert date</button>
</template>
```

:::info
The editor is created after mount. Until the `ready` event, `view` and the values derived from it are `undefined` or empty.
:::

## Properties

| Property          | Type                                  | Description                                                                                                             |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `view`            | `EditorView \| undefined`             | The [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView). Use it for anything not wrapped by the component. |
| `editor`          | `HTMLElement \| undefined`            | The root element that contains the editor.                                                                              |
| `dom`             | `Element \| undefined`                | The editable content element.                                                                                           |
| `selection`       | `EditorSelection \| undefined`        | Gets or sets the [selection](https://codemirror.net/docs/ref/#state.EditorSelection).                                   |
| `cursor`          | `number`                              | Gets or sets the cursor position.                                                                                       |
| `focus`           | `boolean`                             | Gets or sets the focus state.                                                                                           |
| `length`          | `number`                              | Length of the document.                                                                                                 |
| `json`            | `Record<string, StateField<unknown>>` | Gets or sets the state as a JSON-serializable object.                                                                   |
| `diagnosticCount` | `number`                              | Number of lint diagnostics. See [`diagnosticCount`](https://codemirror.net/docs/ref/#lint.diagnosticCount).             |

## Methods

| Method               | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `lint()`             | Runs the linter immediately. Only works when the `linter` prop is set. |
| `forceReconfigure()` | Removes and re-registers all extensions.                               |

## CodeMirror 5 compatible methods

These methods are provided for users familiar with [CodeMirror 5](https://codemirror.net/5/). The properties above and `view` are usually sufficient, so **active use is not recommended**.

| Method                                                               | Description                                   |
| -------------------------------------------------------------------- | --------------------------------------------- |
| `getRange(from?: number, to?: number)`                               | Gets the text between the given positions.    |
| `getLine(number: number)`                                            | Gets the content of a line.                   |
| `lineCount()`                                                        | Gets the number of lines.                     |
| `getCursor()`                                                        | Gets one end of the primary selection.        |
| `listSelections()`                                                   | Gets all current selection ranges.            |
| `getSelection()`                                                     | Gets the selected text.                       |
| `getSelections()`                                                    | Gets the text of every selection range.       |
| `somethingSelected()`                                                | Returns `true` if any text is selected.       |
| `replaceRange(replacement: string \| Text, from, to)`                | Replaces the text between `from` and `to`.    |
| `replaceSelection(replacement: string \| Text)`                      | Replaces the selection(s).                    |
| `setCursor(position: number)`                                        | Sets the cursor position.                     |
| `setSelection(anchor: number, head?: number)`                        | Sets a single selection range.                |
| `setSelections(ranges: readonly SelectionRange[], primary?: number)` | Sets multiple selection ranges.               |
| `extendSelectionsBy(f: (range: SelectionRange) => number)`           | Extends every selection by the result of `f`. |

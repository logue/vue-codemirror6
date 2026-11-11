---
description: Everyday usage of vue-codemirror6 — v-model, slot content, read-only and disabled modes, key bindings, events, and UI translation.
---

# Usage

## Two-way binding with `v-model`

The document is bound through `modelValue` (not `value`), so `v-model` works as with any Vue component.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('');
</script>

<template>
  <code-mirror v-model="value" basic placeholder="Type something…" />
  <pre>{{ value }}</pre>
</template>
```

When `modelValue` is changed from outside, the editor content is replaced. Two props control how the view behaves at that moment:

- `scroll-into-view` (default `true`) scrolls the editor to the updated selection.
- `preserve-scroll-position` (default `false`) keeps the current scroll position, which is useful when text is appended continuously (logs, streaming output, and so on).

## Initial text from a slot

Instead of `v-model`, you can place the initial text inside the component. Only the text of the first child node is used.

```vue
<script setup lang="ts">
import { json, jsonParseLinter } from '@codemirror/lang-json';
import CodeMirror from 'vue-codemirror6';
</script>

<template>
  <code-mirror basic readonly :lang="json()" :linter="jsonParseLinter()">
    <pre>
{
  "key": "value"
}</pre>
  </code-mirror>
</template>
```

:::warning

- Slot content overwrites the `v-model` value, so do not combine the two. The slot method is intended for simple read-only highlighting.
- Wrap the text in `<pre>` so that whitespace is not collapsed.
- The slot method does not work with Vue 2.7.

:::

## Read-only and disabled

| Prop       | Editable | Focusable / selectable | CodeMirror option                                                                             |
| ---------- | -------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| `readonly` | No       | Yes                    | [`EditorState.readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly)         |
| `disabled` | No       | No                     | Inverse of [`EditorView.editable`](https://codemirror.net/docs/ref/#view.EditorView^editable) |

Use `disabled` when the editor is only a syntax highlighter.

```vue
<template>
  <code-mirror v-model="value" basic :readonly="isReadonly" :disabled="isDisabled" />
</template>
```

## Editing behavior

| Prop                        | Effect                                                      |
| --------------------------- | ----------------------------------------------------------- |
| `wrap`                      | Enables line wrapping.                                      |
| `tab`                       | Indents with the Tab key instead of moving focus.           |
| `tab-size`                  | Width of a tab character.                                   |
| `indent-unit`               | Indentation unit, for example `"  "` or `"\t"`.             |
| `allow-multiple-selections` | Allows multiple selections (e.g. with Ctrl/Cmd + click).    |
| `line-separator`            | Line separator used for the document. Defaults to `\n`.     |
| `placeholder`               | Text or an `HTMLElement` shown while the document is empty. |

:::tip
The `tab` prop traps the Tab key inside the editor. Keyboard users can still leave the editor by pressing Escape followed by Tab.
:::

## Custom key bindings

Pass an array of [`KeyBinding`](https://codemirror.net/docs/ref/#view.KeyBinding) objects to `keymap`. If `run` returns `true`, the default behavior for that key is skipped.

```vue
<script setup lang="ts">
import type { KeyBinding } from '@codemirror/view';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('');

const keymap: KeyBinding[] = [
  {
    key: 'Mod-s',
    run: () => {
      console.log('save', value.value);
      return true;
    }
  }
];
</script>

<template>
  <code-mirror v-model="value" basic :keymap="keymap" />
</template>
```

## Listening to events

```vue
<template>
  <code-mirror
    v-model="value"
    @ready="({ view }) => console.log('ready', view)"
    @focus="focused => (isFocused = focused)"
    @update="update => console.log(update.docChanged)"
  />
</template>
```

See [Events](../api/events) for the payload of each event.

## Translating the editor UI

Use `phrases` to translate the text shown by CodeMirror (search panel, lint panel, folding markers, …). See the CodeMirror [translation example](https://codemirror.net/examples/translate/) for the available keys.

```vue
<script setup lang="ts">
import CodeMirror from 'vue-codemirror6';

const phrases: Record<string, string> = {
  Find: 'Suchen',
  Replace: 'Ersetzen',
  next: 'nächste',
  previous: 'vorherige',
  close: 'schließen'
};
</script>

<template>
  <code-mirror basic :phrases="phrases" />
</template>
```

:::tip
When combining with vue-i18n, make `phrases` reactive (for example a `computed`) so the editor updates when the locale changes. See [Internationalization](./i18n) for a full translation table and a vue-i18n example.
:::

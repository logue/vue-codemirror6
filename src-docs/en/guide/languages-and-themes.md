---
description: Configure syntax highlighting, linters, the lint gutter, themes, dark mode, and custom CodeMirror extensions in vue-codemirror6.
---

# Languages, Linters & Themes

## Languages

Install a language package and pass its `LanguageSupport` object to `lang`:

```vue
<script setup lang="ts">
import { markdown } from '@codemirror/lang-markdown';
import CodeMirror from 'vue-codemirror6';

const lang = markdown();
</script>

<template>
  <code-mirror basic wrap :lang="lang" />
</template>
```

Official language packages include:

`@codemirror/lang-angular`, `lang-cpp`, `lang-css`, `lang-html`, `lang-java`, `lang-javascript`, `lang-json`, `lang-lezer`, `lang-markdown`, `lang-php`, `lang-python`, `lang-rust`, `lang-sql`, `lang-vue`, `lang-wast`, `lang-xml`

Many community packages are also available. See the [CodeMirror language list](https://codemirror.net/#languages) and the [README](https://github.com/logue/vue-codemirror6#supported-languages).

## Linters

Pass a [`LintSource`](https://codemirror.net/docs/ref/#lint.LintSource) to `linter`. Add `gutter` to show a marker on lines with problems.

```vue
<script setup lang="ts">
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('{ "key": "value", }');
</script>

<template>
  <code-mirror v-model="value" basic gutter :lang="json()" :linter="jsonParseLinter()" />
</template>
```

For JavaScript, `@codemirror/lang-javascript` provides `esLint()`, which can be combined with [eslint-linter-browserify](https://github.com/UziTech/eslint-linter-browserify):

```ts
import { esLint } from '@codemirror/lang-javascript';
import eslint from 'eslint-linter-browserify';

const linter = esLint(new eslint.Linter(), {
  languageOptions: {
    parserOptions: { ecmaVersion: 2022, sourceType: 'module' }
  },
  rules: { semi: ['error', 'never'] }
});
```

| Prop            | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| `linter`        | The lint source.                                                                             |
| `linter-config` | [Linter configuration](https://codemirror.net/docs/ref/#lint.linter^config) such as `delay`. |
| `force-linting` | Runs the linter immediately instead of waiting for the editor to become idle.                |
| `gutter`        | Shows the lint gutter. Has no effect without `linter`.                                       |
| `gutter-config` | [Lint gutter configuration](https://codemirror.net/docs/ref/#lint.lintGutter^config).        |

The number of diagnostics is available as `diagnosticCount` on the [instance](../api/instance), and `lint()` runs the linter on demand.

:::tip
In the editor, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> on macOS) opens the lint panel and <kbd>F8</kbd> jumps to the next diagnostic.
:::

## Themes and dark mode

- `dark` tells CodeMirror that the editor has a dark background, so built-in UI such as the selection and panels use dark colors.
- `theme` accepts a style spec object passed to [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme).

```vue
<script setup lang="ts">
import CodeMirror from 'vue-codemirror6';

const theme = {
  '&': { fontSize: '14px' },
  '.cm-content': { fontFamily: 'Menlo, monospace' },
  '.cm-gutters': { backgroundColor: 'transparent', border: 'none' }
};
</script>

<template>
  <code-mirror basic :dark="isDark" :theme="theme" />
</template>
```

Ready-made themes are usually distributed as extensions. Add them through `extensions`:

```vue
<script setup lang="ts">
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from 'vue-codemirror6';
</script>

<template>
  <code-mirror basic dark :extensions="[oneDark]" />
</template>
```

Examples: [`@codemirror/theme-one-dark`](https://github.com/codemirror/theme-one-dark), [`@uiw/codemirror-themes`](https://github.com/uiwjs/react-codemirror/tree/master/themes), [`codemirror6-bootstrap-theme`](https://github.com/logue/codemirror6-bootstrap-theme).

## Other extensions

Any CodeMirror [`Extension`](https://codemirror.net/docs/ref/#state.Extension) can be passed through `extensions`. They are combined with the extensions generated from the other props.

```vue
<script setup lang="ts">
import { EditorView } from '@codemirror/view';
import CodeMirror from 'vue-codemirror6';

const extensions = [EditorView.contentAttributes.of({ spellcheck: 'true' })];
</script>

<template>
  <code-mirror basic :extensions="extensions" />
</template>
```

:::info
`lang` and `linter` could also be passed through `extensions`. They are separate props for type safety and for compatibility with earlier versions.
:::

When props change, the component reconfigures the editor automatically. If you change something the component cannot detect, call `forceReconfigure()` on the instance.

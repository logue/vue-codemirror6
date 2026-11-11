> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

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

Many community packages are also available. See the [CodeMirror language list](https://codemirror.net/#languages) and the list below.

<details>
<summary>Community language packages</summary>

- [`@phoenix-plugin-registry/petetnt.brackets-codemirror-fortran`](https://www.npmjs.com/package/@phoenix-plugin-registry/petetnt.brackets-codemirror-fortran)
- [`@phoenix-plugin-registry/petetnt.brackets-codemirror-go`](https://www.npmjs.com/package/@phoenix-plugin-registry/petetnt.brackets-codemirror-go)
- [`@acarl005/lang-sql`](https://www.npmjs.com/package/@acarl005/lang-sql)
- [`@ark-us/codemirror-lang-taylor`](https://www.npmjs.com/package/@ark-us/codemirror-lang-taylor)
- [`@formulavize/lang-fiz`](https://www.npmjs.com/package/@formulavize/lang-fiz)
- [`@gravitywiz/codemirror-lang-gfcalc`](https://www.npmjs.com/package/@gravitywiz/codemirror-lang-gfcalc)
- [`@nextjournal/lang-clojure`](https://www.npmjs.com/package/@nextjournal/lang-clojure)
- [`@plutojl/lang-julia`](https://www.npmjs.com/package/@plutojl/lang-julia)
- [`@polybase/codemirror-lang-javascript`](https://www.npmjs.com/package/@polybase/codemirror-lang-javascript)
- [`@replit/codemirror-lang-nix`](https://www.npmjs.com/package/@replit/codemirror-lang-nix)
- [`@replit/codemirror-lang-csharp`](https://www.npmjs.com/package/@replit/codemirror-lang-csharp)
- [`@replit/codemirror-lang-solidity`](https://www.npmjs.com/package/@replit/codemirror-lang-solidity)
- [`@replit/codemirror-lang-svelte`](https://www.npmjs.com/package/@replit/codemirror-lang-svelte)
- [`@zhijiu/lang-sql`](https://www.npmjs.com/package/@zhijiu/lang-sql)
- [`codemirror-lang-bool`](https://www.npmjs.com/package/codemirror-lang-bool)
- [`codemirror-lang-brainfuck`](https://www.npmjs.com/package/codemirror-lang-brainfuck)
- [`codemirror-lang-cherry`](https://www.npmjs.com/package/codemirror-lang-cherry)
- [`codemirror-lang-chordpro`](https://www.npmjs.com/package/codemirror-lang-chordpro)
- [`codemirror-lang-circom`](https://www.npmjs.com/package/codemirror-lang-circom)
- [`codemirror-lang-edn`](https://www.npmjs.com/package/codemirror-lang-edn)
- [`codemirror-lang-ejs`](https://www.npmjs.com/package/codemirror-lang-ejs)
- [`codemirror-lang-fsl`](https://www.npmjs.com/package/codemirror-lang-fsl)
- [`codemirror-lang-gml`](https://www.npmjs.com/package/codemirror-lang-gml)
- [`codemirror-lang-golfscript`](https://www.npmjs.com/package/codemirror-lang-golfscript)
- [`codemirror-lang-homescript`](https://www.npmjs.com/package/codemirror-lang-homescript)
- [`codemirror-lang-html-n8n`](https://www.npmjs.com/package/codemirror-lang-html-n8n)
- [`codemirror-lang-inform7`](https://www.npmjs.com/package/codemirror-lang-inform7)
- [`codemirror-lang-j`](https://www.npmjs.com/package/codemirror-lang-j)
- [`codemirror-lang-janet`](https://www.npmjs.com/package/codemirror-lang-janet)
- [`codemirror-lang-k`](https://www.npmjs.com/package/codemirror-lang-k)
- [`codemirror-lang-karol`](https://www.npmjs.com/package/codemirror-lang-karol)
- [`codemirror-lang-mermaid`](https://www.npmjs.com/package/codemirror-lang-mermaid)
- [`codemirror-lang-n8n-expression`](https://www.npmjs.com/package/codemirror-lang-n8n-expression)
- [`codemirror-lang-prolog`](https://www.npmjs.com/package/codemirror-lang-prolog)
- [`codemirror-lang-qpen`](https://www.npmjs.com/package/codemirror-lang-qpen)
- [`codemirror-lang-qtam`](https://www.npmjs.com/package/codemirror-lang-qtam)
- [`codemirror-lang-r`](https://www.npmjs.com/package/codemirror-lang-r)
- [`codemirror-lang-rome-ast`](https://www.npmjs.com/package/codemirror-lang-rome-ast)
- [`codemirror-lang-rome`](https://www.npmjs.com/package/codemirror-lang-rome)
- [`codemirror-lang-rush`](https://www.npmjs.com/package/codemirror-lang-rush)
- [`codemirror-lang-scopescript`](https://www.npmjs.com/package/codemirror-lang-scopescript)
- [`codemirror-lang-statement`](https://www.npmjs.com/package/codemirror-lang-statement)
- [`gcode-lang-codemirror`](https://www.npmjs.com/package/gcode-lang-codemirror)
- [`gmail-lang`](https://www.npmjs.com/package/gmail-lang)
- [`lang-bqn`](https://www.npmjs.com/package/lang-bqn)
- [`lang-clojure`](https://www.npmjs.com/package/lang-clojure)
- [`lang-d`](https://www.npmjs.com/package/lang-d)
- [`lang-feel`](https://www.npmjs.com/package/lang-feel)
- [`lang-firestore`](https://www.npmjs.com/package/lang-firestore)

</details>

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

The number of diagnostics is available as `diagnosticCount` on the [instance](/vue-codemirror6/api/instance.md), and `lint()` runs the linter on demand.

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

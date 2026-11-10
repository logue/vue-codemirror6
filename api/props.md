> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# Props

Props are written in kebab-case in templates (`tab-size`) and camelCase in JavaScript (`tabSize`).

## Content

| Prop          | Type                    | Default     | Description                                                                                              |
| ------------- | ----------------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| `model-value` | `string \| Text`        | `''`        | The document. Use with `v-model`. (Not `value`.)                                                         |
| `placeholder` | `string \| HTMLElement` | `undefined` | Shown while the document is empty. See [placeholder](https://codemirror.net/docs/ref/#view.placeholder). |
| `tag`         | `string`                | `'div'`     | Tag name of the root element.                                                                            |

## Setup

| Prop      | Type      | Default | Description                                                                                                   |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `basic`   | `boolean` | `false` | Enables [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup).                               |
| `minimal` | `boolean` | `false` | Enables [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup). `basic` takes precedence. |

## Editing

| Prop                        | Type           | Default     | Description                                                                                                                          |
| --------------------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `readonly`                  | `boolean`      | `false`     | Prevents changes but keeps the editor focusable. See [`readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly).      |
| `disabled`                  | `boolean`      | `false`     | Makes the editor non-editable and non-focusable. Inverse of [`editable`](https://codemirror.net/docs/ref/#view.EditorView^editable). |
| `wrap`                      | `boolean`      | `false`     | Enables [line wrapping](https://codemirror.net/docs/ref/#view.EditorView^lineWrapping).                                              |
| `tab`                       | `boolean`      | `false`     | Indents with the Tab key ([`indentWithTab`](https://codemirror.net/examples/tab/)).                                                  |
| `tab-size`                  | `number`       | `undefined` | [Tab size](https://codemirror.net/docs/ref/#state.EditorState^tabSize).                                                              |
| `indent-unit`               | `string`       | `undefined` | [Indentation unit](https://codemirror.net/docs/ref/#language.indentUnit).                                                            |
| `allow-multiple-selections` | `boolean`      | `false`     | [Allows multiple selections](https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections).                            |
| `line-separator`            | `string`       | `undefined` | [Line separator](https://codemirror.net/docs/ref/#state.EditorState^lineSeparator). `\n` when not set.                               |
| `keymap`                    | `KeyBinding[]` | `[]`        | Custom [key bindings](https://codemirror.net/docs/ref/#view.KeyBinding).                                                             |

## Language and linting

| Prop            | Type              | Default     | Description                                                                                           |
| --------------- | ----------------- | ----------- | ----------------------------------------------------------------------------------------------------- |
| `lang`          | `LanguageSupport` | `undefined` | Language for syntax highlighting. See [languages](https://codemirror.net/#languages).                 |
| `linter`        | `LintSource`      | `undefined` | Lint source, e.g. `jsonParseLinter()` or `esLint(...)`.                                               |
| `linter-config` | `object`          | `{}`        | [Linter config](https://codemirror.net/docs/ref/#lint.linter^config).                                 |
| `force-linting` | `boolean`         | `false`     | Runs the linter right away. See [`forceLinting`](https://codemirror.net/docs/ref/#lint.forceLinting). |
| `gutter`        | `boolean`         | `false`     | Shows the [lint gutter](https://codemirror.net/docs/ref/#lint.lintGutter). Requires `linter`.         |
| `gutter-config` | `object`          | `undefined` | [Lint gutter config](https://codemirror.net/docs/ref/#lint.lintGutter^config).                        |

## Appearance

| Prop      | Type                        | Default     | Description                                                                                        |
| --------- | --------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `dark`    | `boolean`                   | `false`     | Marks the editor theme as dark.                                                                    |
| `theme`   | `Record<string, StyleSpec>` | `{}`        | Style spec passed to [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme). |
| `phrases` | `Record<string, string>`    | `undefined` | [UI translations](https://codemirror.net/examples/translate/).                                     |

## Scrolling

| Prop                       | Type      | Default | Description                                                                                                                                                      |
| -------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scroll-into-view`         | `boolean` | `true`  | Scrolls to the selection when `modelValue` is updated externally. See [`scrollIntoView`](https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView). |
| `preserve-scroll-position` | `boolean` | `false` | Keeps the scroll position when `modelValue` is updated externally. See [`scrollSnapshot`](https://codemirror.net/docs/ref/#view.EditorView.scrollSnapshot).      |

## Extensions

| Prop         | Type          | Default | Description                                                                                                              |
| ------------ | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `extensions` | `Extension[]` | `[]`    | Additional [extensions](https://codemirror.net/docs/ref/#state.Extension), appended after the ones generated from props. |

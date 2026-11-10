> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# Props

在模板中使用短横线命名(`tab-size`),在 JavaScript 中使用驼峰命名(`tabSize`)。

## 内容

| Prop          | 类型                      | 默认值         | 说明                                                                           |
| ------------- | ----------------------- | ----------- | ---------------------------------------------------------------------------- |
| `model-value` | `string \| Text`        | `''`        | 文本内容。配合 `v-model` 使用(不是 `value`)。                                            |
| `placeholder` | `string \| HTMLElement` | `undefined` | 文本为空时显示。参见 [placeholder](https://codemirror.net/docs/ref/#view.placeholder)。 |
| `tag`         | `string`                | `'div'`     | 根元素的标签名。                                                                     |

## 预设

| Prop      | 类型        | 默认值     | 说明                                                                                          |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------- |
| `basic`   | `boolean` | `false` | 启用 [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup)。                  |
| `minimal` | `boolean` | `false` | 启用 [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup)。以 `basic` 为准。 |

## 编辑

| Prop                        | 类型             | 默认值         | 说明                                                                                       |
| --------------------------- | -------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `readonly`                  | `boolean`      | `false`     | 禁止修改,但仍可聚焦。参见 [`readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly)。 |
| `disabled`                  | `boolean`      | `false`     | 不可编辑且不可聚焦。为 [`editable`](https://codemirror.net/docs/ref/#view.EditorView^editable) 的反值。 |
| `wrap`                      | `boolean`      | `false`     | 启用 [自动换行](https://codemirror.net/docs/ref/#view.EditorView^lineWrapping)。                |
| `tab`                       | `boolean`      | `false`     | 按 Tab 键缩进([`indentWithTab`](https://codemirror.net/examples/tab/))。                      |
| `tab-size`                  | `number`       | `undefined` | [制表符宽度](https://codemirror.net/docs/ref/#state.EditorState^tabSize)。                     |
| `indent-unit`               | `string`       | `undefined` | [缩进单位](https://codemirror.net/docs/ref/#language.indentUnit)。                            |
| `allow-multiple-selections` | `boolean`      | `false`     | [允许多重选区](https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections)。    |
| `line-separator`            | `string`       | `undefined` | [换行符](https://codemirror.net/docs/ref/#state.EditorState^lineSeparator)。未指定时为 `\n`。      |
| `keymap`                    | `KeyBinding[]` | `[]`        | 自定义 [快捷键](https://codemirror.net/docs/ref/#view.KeyBinding)。                             |

## 语言与代码检查

| Prop            | 类型                | 默认值         | 说明                                                                                |
| --------------- | ----------------- | ----------- | --------------------------------------------------------------------------------- |
| `lang`          | `LanguageSupport` | `undefined` | 语法高亮的语言。参见 [语言列表](https://codemirror.net/#languages)。                             |
| `linter`        | `LintSource`      | `undefined` | 代码检查源,例如 `jsonParseLinter()` 或 `esLint(...)`。                                     |
| `linter-config` | `object`          | `{}`        | [代码检查配置](https://codemirror.net/docs/ref/#lint.linter^config)。                    |
| `force-linting` | `boolean`         | `false`     | 立即运行代码检查。参见 [`forceLinting`](https://codemirror.net/docs/ref/#lint.forceLinting)。 |
| `gutter`        | `boolean`         | `false`     | 显示 [检查边栏](https://codemirror.net/docs/ref/#lint.lintGutter)。需要 `linter`。          |
| `gutter-config` | `object`          | `undefined` | [检查边栏配置](https://codemirror.net/docs/ref/#lint.lintGutter^config)。                |

## 外观

| Prop      | 类型                          | 默认值         | 说明                                                                                     |
| --------- | --------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `dark`    | `boolean`                   | `false`     | 将编辑器主题标记为深色。                                                                           |
| `theme`   | `Record<string, StyleSpec>` | `{}`        | 传给 [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme) 的样式定义。 |
| `phrases` | `Record<string, string>`    | `undefined` | [界面翻译](https://codemirror.net/examples/translate/)。                                    |

## 滚动

| Prop                       | 类型        | 默认值     | 说明                                                                                                                     |
| -------------------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `scroll-into-view`         | `boolean` | `true`  | 外部更新 `modelValue` 时滚动到选区。参见 [`scrollIntoView`](https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView)。 |
| `preserve-scroll-position` | `boolean` | `false` | 外部更新 `modelValue` 时保持滚动位置。参见 [`scrollSnapshot`](https://codemirror.net/docs/ref/#view.EditorView.scrollSnapshot)。      |

## 扩展

| Prop         | 类型            | 默认值  | 说明                                                                             |
| ------------ | ------------- | ---- | ------------------------------------------------------------------------------ |
| `extensions` | `Extension[]` | `[]` | 额外的 [扩展](https://codemirror.net/docs/ref/#state.Extension),追加在由 props 生成的扩展之后。 |

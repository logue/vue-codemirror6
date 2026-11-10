---
description: 在 vue-codemirror6 中配置语法高亮、代码检查、检查边栏、主题、深色模式以及自定义 CodeMirror 扩展。
---

# 语言、代码检查与主题

## 语言

安装语言包,并将其 `LanguageSupport` 对象传给 `lang`:

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

官方语言包包括:

`@codemirror/lang-angular`、`lang-cpp`、`lang-css`、`lang-html`、`lang-java`、`lang-javascript`、`lang-json`、`lang-lezer`、`lang-markdown`、`lang-php`、`lang-python`、`lang-rust`、`lang-sql`、`lang-vue`、`lang-wast`、`lang-xml`

社区也提供了许多语言包。请参阅 [CodeMirror 语言列表](https://codemirror.net/#languages) 和 [README](https://github.com/logue/vue-codemirror6#supported-languages)。

## 代码检查

向 `linter` 传入 [`LintSource`](https://codemirror.net/docs/ref/#lint.LintSource)。添加 `gutter` 后,有问题的行会显示标记。

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

对于 JavaScript,可以将 `@codemirror/lang-javascript` 提供的 `esLint()` 与 [eslint-linter-browserify](https://github.com/UziTech/eslint-linter-browserify) 结合使用:

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

| Prop            | 说明                                                                             |
| --------------- | -------------------------------------------------------------------------------- |
| `linter`        | 代码检查源。                                                                     |
| `linter-config` | `delay` 等 [代码检查配置](https://codemirror.net/docs/ref/#lint.linter^config)。 |
| `force-linting` | 立即运行代码检查,而不是等待编辑器空闲。                                          |
| `gutter`        | 显示检查边栏。未指定 `linter` 时无效。                                           |
| `gutter-config` | [检查边栏配置](https://codemirror.net/docs/ref/#lint.lintGutter^config)。        |

诊断数量可通过 [实例](../api/instance) 的 `diagnosticCount` 获取,调用 `lint()` 可随时运行代码检查。

:::tip
在编辑器中按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>(macOS 上为 <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>)可打开检查面板,按 <kbd>F8</kbd> 跳转到下一个问题。
:::

## 主题与深色模式

- `dark` 告诉 CodeMirror 编辑器背景为深色,选区、面板等内置界面会使用深色配色。
- `theme` 接受传给 [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme) 的样式定义对象。

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

现成的主题通常以扩展的形式发布,通过 `extensions` 添加:

```vue
<script setup lang="ts">
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from 'vue-codemirror6';
</script>

<template>
  <code-mirror basic dark :extensions="[oneDark]" />
</template>
```

示例:[`@codemirror/theme-one-dark`](https://github.com/codemirror/theme-one-dark)、[`@uiw/codemirror-themes`](https://github.com/uiwjs/react-codemirror/tree/master/themes)、[`codemirror6-bootstrap-theme`](https://github.com/logue/codemirror6-bootstrap-theme)

## 其他扩展

任何 CodeMirror [`Extension`](https://codemirror.net/docs/ref/#state.Extension) 都可以通过 `extensions` 传入,它们会与其他 props 生成的扩展一起生效。

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
`lang` 和 `linter` 也可以通过 `extensions` 传入。将它们作为独立的 props,是为了类型安全以及与旧版本保持兼容。
:::

props 变化时,组件会自动重新配置编辑器。如果做了组件无法检测到的更改,请调用实例的 `forceReconfigure()`。

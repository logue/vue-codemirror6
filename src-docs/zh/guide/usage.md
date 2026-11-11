---
description: vue-codemirror6 的日常用法:v-model、插槽内容、只读与禁用模式、快捷键、事件以及界面翻译。
---

# 基本用法

## 使用 `v-model` 双向绑定

文本通过 `modelValue`(而不是 `value`)绑定,因此可以像其他 Vue 组件一样使用 `v-model`。

```vue
<script lang="ts" setup vapor>
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('');
</script>

<template>
  <code-mirror v-model="value" basic placeholder="请输入内容…" />
  <pre>{{ value }}</pre>
</template>
```

从外部修改 `modelValue` 时,编辑器的内容会被替换。以下两个 props 控制此时视图的行为:

- `scroll-into-view`(默认 `true`):滚动到更新后的选区位置。
- `preserve-scroll-position`(默认 `false`):保持当前滚动位置。适用于持续追加文本的场景(日志、流式输出等)。

## 通过插槽设置初始文本

除了 `v-model`,也可以把初始文本写在组件内部。只会使用第一个子节点的文本。

```vue
<script lang="ts" setup vapor>
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

- 插槽内容会覆盖 `v-model` 的值,请不要同时使用。插槽方式适用于只读的简单语法高亮。
- 请用 `<pre>` 包裹文本,避免空白被合并。
- 插槽方式在 Vue 2.7 中无效。

:::

## 只读与禁用

| Prop       | 可编辑 | 可聚焦 / 可选择 | CodeMirror 选项                                                                           |
| ---------- | ------ | --------------- | ----------------------------------------------------------------------------------------- |
| `readonly` | 否     | 是              | [`EditorState.readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly)     |
| `disabled` | 否     | 否              | [`EditorView.editable`](https://codemirror.net/docs/ref/#view.EditorView^editable) 的反值 |

仅用于语法高亮展示时,请使用 `disabled`。

```vue
<template>
  <code-mirror v-model="value" basic :readonly="isReadonly" :disabled="isDisabled" />
</template>
```

## 编辑行为

| Prop                        | 作用                                     |
| --------------------------- | ---------------------------------------- |
| `wrap`                      | 启用自动换行。                           |
| `tab`                       | 按 Tab 键缩进,而不是移动焦点。           |
| `tab-size`                  | 制表符的宽度。                           |
| `indent-unit`               | 缩进单位,例如 `"  "` 或 `"\t"`。         |
| `allow-multiple-selections` | 允许多重选区(例如 Ctrl / Cmd + 点击)。   |
| `line-separator`            | 文档使用的换行符,默认为 `\n`。           |
| `placeholder`               | 文本为空时显示的字符串或 `HTMLElement`。 |

:::tip
启用 `tab` 后,Tab 键会被编辑器占用。键盘用户可以先按 Esc 再按 Tab 离开编辑器。
:::

## 自定义快捷键

向 `keymap` 传入 [`KeyBinding`](https://codemirror.net/docs/ref/#view.KeyBinding) 数组。如果 `run` 返回 `true`,该按键的默认行为将不会执行。

```vue
<script lang="ts" setup vapor>
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

## 监听事件

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

各事件的参数请参阅 [事件](../api/events)。

## 翻译编辑器界面

使用 `phrases` 可以翻译 CodeMirror 显示的文字(搜索面板、代码检查面板、折叠标记等)。可用的键请参阅 CodeMirror 的 [翻译示例](https://codemirror.net/examples/translate/)。

```vue
<script lang="ts" setup vapor>
import CodeMirror from 'vue-codemirror6';

const phrases: Record<string, string> = {
  // @codemirror/search
  'Go to line': '跳转到行',
  go: '确定',
  Find: '查找',
  Replace: '替换',
  next: '下一个',
  previous: '上一个',
  all: '全部',
  'match case': '区分大小写',
  'by word': '全字匹配',
  regexp: '正则表达式',
  replace: '替换',
  'replace all': '全部替换',
  close: '关闭',
  // @codemirror/lint
  Diagnostics: '诊断',
  'No diagnostics': '无诊断信息'
};
</script>

<template>
  <code-mirror basic :phrases="phrases" />
</template>
```

:::tip
与 vue-i18n 结合使用时,请将 `phrases` 设为响应式(例如 `computed`),以便在切换语言时更新编辑器。完整的翻译表和 vue-i18n 示例请参阅 [国际化](./i18n)。
:::

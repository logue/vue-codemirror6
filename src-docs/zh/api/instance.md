---
description: vue-codemirror6 组件实例暴露的属性和方法,包括兼容 CodeMirror 5 的辅助方法。
---

# 实例 API

通过模板 ref 访问实例。类型检查时请使用 `CodeMirrorExposed` 类型。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror, { type CodeMirrorExposed } from 'vue-codemirror6';

const cm = ref<CodeMirrorExposed>();

const insertDate = () => {
  cm.value?.replaceSelection(new Date().toISOString());
};
</script>

<template>
  <code-mirror ref="cm" basic />
  <button type="button" @click="insertDate">插入日期</button>
</template>
```

:::info
编辑器在挂载后创建。在 `ready` 事件触发之前,`view` 以及由它派生的值为 `undefined` 或空值。
:::

## 属性

| 属性              | 类型                                  | 说明                                                                                                  |
| ----------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `view`            | `EditorView \| undefined`             | [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView)。用于组件未封装的功能。              |
| `editor`          | `HTMLElement \| undefined`            | 包含编辑器的根元素。                                                                                  |
| `dom`             | `Element \| undefined`                | 可编辑的内容元素。                                                                                    |
| `selection`       | `EditorSelection \| undefined`        | 获取或设置 [选区](https://codemirror.net/docs/ref/#state.EditorSelection)。                           |
| `cursor`          | `number`                              | 获取或设置光标位置。                                                                                  |
| `focus`           | `boolean`                             | 获取或设置焦点状态。                                                                                  |
| `length`          | `number`                              | 文本长度。                                                                                            |
| `json`            | `Record<string, StateField<unknown>>` | 以可 JSON 序列化的对象获取或设置状态。                                                                |
| `diagnosticCount` | `number`                              | 代码检查的诊断数量。参见 [`diagnosticCount`](https://codemirror.net/docs/ref/#lint.diagnosticCount)。 |

## 方法

| 方法                 | 说明                                           |
| -------------------- | ---------------------------------------------- |
| `lint()`             | 立即运行代码检查。仅在指定了 `linter` 时有效。 |
| `forceReconfigure()` | 移除并重新注册所有扩展。                       |

## 兼容 CodeMirror 5 的方法

这些方法面向熟悉 [CodeMirror 5](https://codemirror.net/5/) 的用户。通常使用上面的属性和 `view` 就足够了,因此 **不建议主动使用**。

| 方法                                                                 | 说明                             |
| -------------------------------------------------------------------- | -------------------------------- |
| `getRange(from?: number, to?: number)`                               | 获取指定位置之间的文本。         |
| `getLine(number: number)`                                            | 获取指定行的内容。               |
| `lineCount()`                                                        | 获取行数。                       |
| `getCursor()`                                                        | 获取主选区的一端。               |
| `listSelections()`                                                   | 获取当前所有选区。               |
| `getSelection()`                                                     | 获取选中的文本。                 |
| `getSelections()`                                                    | 获取每个选区的文本。             |
| `somethingSelected()`                                                | 有文本被选中时返回 `true`。      |
| `replaceRange(replacement: string \| Text, from, to)`                | 替换 `from` 到 `to` 之间的文本。 |
| `replaceSelection(replacement: string \| Text)`                      | 替换选区内容。                   |
| `setCursor(position: number)`                                        | 设置光标位置。                   |
| `setSelection(anchor: number, head?: number)`                        | 设置单个选区。                   |
| `setSelections(ranges: readonly SelectionRange[], primary?: number)` | 设置多个选区。                   |
| `extendSelectionsBy(f: (range: SelectionRange) => number)`           | 将每个选区扩展到 `f` 的返回值。  |

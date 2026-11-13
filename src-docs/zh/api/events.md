---
description: vue-codemirror6 组件触发的事件及其参数。
---

# 事件

| 事件                | 参数                                                                | 触发时机                                    |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| `update:modelValue` | `string \| Text`                                                    | 文本发生变化时。供 `v-model` 使用。         |
| `ready`             | `{ view: EditorView; state: EditorState; container: HTMLElement }`  | 编辑器创建完成时(挂载后,仅客户端)。         |
| `focus`             | `boolean`                                                           | 编辑器获得(`true`)或失去(`false`)焦点时。   |
| `update`            | [`ViewUpdate`](https://codemirror.net/docs/ref/#view.ViewUpdate)    | 视图有任何更新时:文本、选区、焦点、视口等。 |
| `change`            | [`EditorState`](https://codemirror.net/docs/ref/#state.EditorState) | 文本发生变化时,参数为新的状态。             |
| `destroy`           | —                                                                   | 编辑器被销毁时(组件卸载时)。                |

```vue
<script lang="ts" setup vapor>
  import type { EditorState } from '@codemirror/state';
  import type { ViewUpdate } from '@codemirror/view';
  import CodeMirror from 'vue-codemirror6';

  const onUpdate = (update: ViewUpdate) => {
    if (update.selectionSet) {
      console.log('selection', update.state.selection.main);
    }
  };

  const onChange = (state: EditorState) => {
    console.log('lines', state.doc.lines);
  };
</script>

<template>
  <code-mirror basic @update="onUpdate" @change="onChange" />
</template>
```

作为 [Web Component](../guide/web-components) 使用时,这些事件以原生 `CustomEvent` 派发,参数可通过 `event.detail[0]` 获取。模型事件名为 `update:model-value`。

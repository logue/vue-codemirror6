---
description: vue-codemirror6 コンポーネントが発火するイベントとその引数です。
---

# イベント

| イベント            | 引数                                                                | 発火するタイミング                                                 |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `update:modelValue` | `string \| Text`                                                    | テキストが変更されたとき。`v-model` で使われます。                 |
| `ready`             | `{ view: EditorView; state: EditorState; container: HTMLElement }`  | エディタが生成されたとき(マウント後、クライアント側のみ)           |
| `focus`             | `boolean`                                                           | エディタがフォーカスを得た(`true`)または失った(`false`)とき        |
| `update`            | [`ViewUpdate`](https://codemirror.net/docs/ref/#view.ViewUpdate)    | テキスト、選択範囲、フォーカス、表示領域などビューが更新されたとき |
| `change`            | [`EditorState`](https://codemirror.net/docs/ref/#state.EditorState) | テキストが変更されたとき。新しい状態を受け取ります。               |
| `destroy`           | —                                                                   | エディタが破棄されたとき(コンポーネントのアンマウント時)           |

```vue
<script setup lang="ts">
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

[Web Component](../guide/web-components) として使う場合、これらはネイティブの `CustomEvent` として発火し、引数は `event.detail[0]` で取得できます。モデルのイベント名は `update:model-value` です。

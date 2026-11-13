---
description: Events emitted by the vue-codemirror6 component and their payloads.
---

# Events

| Event               | Payload                                                             | Emitted when                                                    |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| `update:modelValue` | `string \| Text`                                                    | The document changed. Used by `v-model`.                        |
| `ready`             | `{ view: EditorView; state: EditorState; container: HTMLElement }`  | The editor has been created (after mount, client side only).    |
| `focus`             | `boolean`                                                           | The editor gained (`true`) or lost (`false`) focus.             |
| `update`            | [`ViewUpdate`](https://codemirror.net/docs/ref/#view.ViewUpdate)    | Any update of the view: document, selection, focus, viewport, … |
| `change`            | [`EditorState`](https://codemirror.net/docs/ref/#state.EditorState) | The document changed. Receives the new state.                   |
| `destroy`           | —                                                                   | The editor was destroyed (component unmounted).                 |

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

When the component is used as a [Web Component](../guide/web-components), these are dispatched as native `CustomEvent`s and the payload is available as `event.detail[0]`. The model event is named `update:model-value`.

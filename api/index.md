> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# API Overview

The `CodeMirror` component has three kinds of API:

| Page                                             | Content                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| [Props](/vue-codemirror6/api/props.md)           | Options that configure the editor. Changes are applied without recreating it. |
| [Events](/vue-codemirror6/api/events.md)         | Notifications for loading, focus, document changes, and destruction.          |
| [Instance API](/vue-codemirror6/api/instance.md) | Properties and methods available through a template ref.                      |

```vue
<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { ref } from 'vue';
import CodeMirror, { type CodeMirrorExposed } from 'vue-codemirror6';

const value = ref('');
const cm = ref<CodeMirrorExposed>();
</script>

<template>
  <code-mirror
    ref="cm"
    v-model="value"
    basic
    :lang="javascript()"
    @ready="() => cm?.view?.focus()"
  />
</template>
```

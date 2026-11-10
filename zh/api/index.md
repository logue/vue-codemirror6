> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# API 概览

`CodeMirror` 组件提供三类 API:

| 页面                                            | 内容                         |
| --------------------------------------------- | -------------------------- |
| [Props](/vue-codemirror6/zh/api/props.md)     | 配置编辑器的选项。修改后无需重新创建编辑器即可生效。 |
| [事件](/vue-codemirror6/zh/api/events.md)       | 加载完成、焦点变化、文本变更和销毁的通知。      |
| [实例 API](/vue-codemirror6/zh/api/instance.md) | 通过模板 ref 可以使用的属性和方法。       |

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

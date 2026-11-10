---
description: 在 Nuxt 等服务端渲染框架中使用 vue-codemirror6。
---

# 服务端渲染

本组件兼容 SSR。CodeMirror 只在浏览器中(`onMounted` 时)创建,因此在服务端渲染时,组件只会输出空的容器元素,不会访问 `window` 或 `document`。

## Nuxt 3 / Nuxt 4

直接使用即可:

```vue
<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('console.log("Hello, World!");');
const lang = javascript();
</script>

<template>
  <code-mirror v-model="value" basic :lang="lang" />
</template>
```

## Nuxt 2 或遇到问题时

用 `<ClientOnly>` 包裹组件,使其只在浏览器中渲染:

```vue
<template>
  <client-only>
    <code-mirror v-model="value" basic :lang="lang" />
  </client-only>
</template>
```

:::info
编辑器在水合之后才会创建。因此在服务端,以及客户端触发 `ready` 事件之前,实例属性(`view`、`selection` 等)均为 `undefined`。
:::

---
description: Using vue-codemirror6 with server-side rendering frameworks such as Nuxt.
---

# Server-Side Rendering

The component is SSR compatible. CodeMirror is only created in the browser (in `onMounted`), so during server rendering the component outputs its empty container element without touching `window` or `document`.

## Nuxt 3 / Nuxt 4

Use the component directly:

```vue
<script lang="ts" setup vapor>
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

## Nuxt 2 or when problems occur

Wrap the component with `<ClientOnly>` so that it is rendered only in the browser:

```vue
<template>
  <client-only>
    <code-mirror v-model="value" basic :lang="lang" />
  </client-only>
</template>
```

:::info
Because the editor is created after hydration, the instance properties (`view`, `selection`, …) are `undefined` on the server and until the `ready` event is emitted on the client.
:::

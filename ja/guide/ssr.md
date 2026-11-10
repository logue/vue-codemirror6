> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# サーバーサイドレンダリング

このコンポーネントは SSR に対応しています。CodeMirror はブラウザ上(`onMounted`)でのみ生成されるため、サーバーでのレンダリング中は `window` や `document` に触れずに、空のコンテナ要素だけを出力します。

## Nuxt 3 / Nuxt 4

そのまま使えます。

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

## Nuxt 2 の場合や問題が起きる場合

コンポーネントを `<ClientOnly>` で囲んで、ブラウザでのみレンダリングするようにします。

```vue
<template>
  <client-only>
    <code-mirror v-model="value" basic :lang="lang" />
  </client-only>
</template>
```

:::info
エディタはハイドレーションの後に生成されます。そのため、サーバー上や、クライアントで `ready` イベントが発火するまでの間は、インスタンスのプロパティ(`view`、`selection` など)は `undefined` です。
:::

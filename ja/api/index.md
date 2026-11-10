> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# API の概要

`CodeMirror` コンポーネントの API は 3 種類あります。

| ページ                                               | 内容                            |
| ------------------------------------------------- | ----------------------------- |
| [Props](/vue-codemirror6/ja/api/props.md)         | エディタの設定。変更はエディタを作り直さずに反映されます。 |
| [イベント](/vue-codemirror6/ja/api/events.md)         | 読み込み完了、フォーカス、テキストの変更、破棄の通知    |
| [インスタンス API](/vue-codemirror6/ja/api/instance.md) | テンプレート ref から使えるプロパティとメソッド    |

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

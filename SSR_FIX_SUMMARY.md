# SSR対応の修正サマリー

## 変更内容

このプルリクエストでは、Nuxt.jsなどのSSR（Server-Side Rendering）環境での動作をサポートするための修正を行いました。

## 主な変更点

### 1. `src/components/CodeMirror.ts`

#### SSR環境のチェック

- `onMounted`内でブラウザ環境をチェックし、サーバーサイドでは初期化をスキップ
- `typeof window !== 'undefined'` でブラウザ環境を確認

#### `view`の型変更

- `ShallowRef<EditorView>` から `ShallowRef<EditorView | undefined>` に変更
- サーバーサイドでは`undefined`となる可能性を考慮

#### すべての`view.value`アクセスを安全に

- `view.value?.` の Optional Chaining を使用
- 各関数で`view.value`の存在をチェック

#### computed プロパティの修正

- `focus`: `view.value?.hasFocus ?? false` で安全にアクセス
- `selection`: `view.value?.state.selection` でOptionalに
- `cursor`: `view.value?.state.selection.main.head ?? 0` でデフォルト値を提供
- `json`: `view.value?.state.toJSON()` でOptionalに

#### ヘルパー関数の修正

すべてのCodeMirror5互換関数を安全に修正：

- `getRange()`, `getLine()`, `lineCount()`, `getCursor()`
- `listSelections()`, `getSelection()`, `getSelections()`
- `somethingSelected()`
- `replaceRange()`, `replaceSelection()`
- `setCursor()`, `setSelection()`, `setSelections()`
- `extendSelectionsBy()`

各関数で`view.value`の存在を確認し、存在しない場合は適切なデフォルト値を返すか、処理をスキップ

### 2. `README.md`

#### SSR使用例セクションの追加

- Nuxt.jsでの使用方法を説明
- Nuxt 3での直接使用方法
- Nuxt 2や問題が発生した場合の`<ClientOnly>`ラッパーの使用方法

## テスト方法

### ローカルでのビルド確認

```bash
pnpm type-check  # 型チェック成功
pnpm build       # ビルド成功
```

### Nuxtでのテスト方法

#### Nuxt 3での使用例

```vue
<template>
  <code-mirror v-model="value" :lang="lang" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';
import { javascript } from '@codemirror/lang-javascript';

const value = ref('console.log("Hello, World!");');
const lang = javascript();
</script>
```

#### Nuxt 2での使用例

```vue
<template>
  <client-only>
    <code-mirror v-model="value" :lang="lang" />
  </client-only>
</template>

<script>
import CodeMirror from 'vue-codemirror6';
import { javascript } from '@codemirror/lang-javascript';

export default {
  components: {
    CodeMirror,
  },
  data() {
    return {
      value: 'console.log("Hello, World!");',
      lang: javascript(),
    };
  },
};
</script>
```

## 互換性

- ✅ Vue 2.7以上
- ✅ Vue 3.3以上
- ✅ Nuxt 2
- ✅ Nuxt 3
- ✅ その他のSSRフレームワーク（VitePress、Quasar SSRなど）

## 破壊的変更

なし。既存の使用方法はすべて互換性を維持しています。

## 次のバージョンで推奨される変更

次のメジャーバージョン（2.0.0）で以下を検討：

- `view`、`selection`、`json`などの型を常にOptionalとして扱う
- TypeScript strictモードでのより厳密な型チェック

## 関連Issue

この修正は、NuxtやVitePressなどのSSR環境でコンポーネントが正しく動作しない問題を解決します。

## ライセンス

©2022-2025 by Logue.
Licensed under the MIT License.

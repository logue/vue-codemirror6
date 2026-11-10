---
description: vue-codemirror6 のインストール、最小構成のエディタの表示、グローバル登録の方法を説明します。
---

# はじめかた

## インストール

コンポーネントと `codemirror` をあわせてインストールします。

```sh
pnpm add vue-codemirror6 codemirror
```

言語サポート、リンター、テーマはそれぞれ別のパッケージです。必要なものをインストールしてください。

```sh
pnpm add @codemirror/lang-javascript
```

## 最小構成の例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('Cozy lummox gives smart squid who asks for job pen.');
</script>

<template>
  <code-mirror v-model="value" />
</template>
```

この状態では、行番号やキーバインドのないシンプルなエディタが表示されます。`basic` を付けると CodeMirror の [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup)(行番号、履歴、括弧の対応表示、検索など)が有効になります。

```vue
<template>
  <code-mirror v-model="value" basic />
</template>
```

:::tip
`basic` の代わりに `minimal` を指定すると [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup) になります。両方を指定した場合は `basic` が優先されます。
:::

## 言語を追加する

`lang` に `LanguageSupport` オブジェクトを渡すとシンタックスハイライトが有効になります。

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

## グローバル登録

パッケージが書き出している `install` 関数を使うと、コンポーネントを `CodeMirror` という名前で登録できます。

```ts
import { createApp } from 'vue';
import { install as CodeMirror } from 'vue-codemirror6';

import App from './App.vue';

createApp(App).use(CodeMirror).mount('#app');
```

登録後は、import しなくてもすべてのテンプレートで `<code-mirror>` を使えます。

## パッケージの export

| Export                | 内容                                                  |
| --------------------- | ----------------------------------------------------- |
| `default`             | Vue コンポーネント                                    |
| `install`             | コンポーネントをグローバル登録する Vue プラグイン関数 |
| `CodeMirror`          | `defineCustomElement` でラップしたコンポーネント      |
| `CodeMirrorExposed`   | テンプレート ref から使えるインスタンス API の型      |
| `Meta`                | パッケージのバージョンとビルド日時                    |
| `vue-codemirror6/umd` | `<script>` タグで読み込むための UMD ビルド            |

## 次のステップ

- [使い方](./usage) — `v-model`、スロット、読み取り専用、キーバインド
- [言語・リンター・テーマ](./languages-and-themes)

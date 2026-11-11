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
<script lang="ts" setup vapor>
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

| Export                                                                         | 内容                                                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `default`                                                                      | Vue コンポーネント                                                                                        |
| `install`                                                                      | コンポーネントをグローバル登録する Vue プラグイン関数                                                     |
| `CodeMirrorExposed`                                                            | テンプレート ref から使えるインスタンス API の型                                                          |
| `Meta`                                                                         | パッケージのバージョンとビルド日時                                                                        |
| `vue-codemirror6/wc`                                                           | `defineCustomElement` でラップしたコンポーネントと `register()`。[Web Component](./web-components) を参照 |
| `vue-codemirror6/wc-auto`                                                      | `vue-codemirror6/wc` と同じだが、import 時に `<code-mirror>` を登録する                                   |
| `vue-codemirror6/umd`、`vue-codemirror6/wc/umd`、`vue-codemirror6/wc-auto/umd` | CommonJS / AMD ローダー向けの UMD ビルド                                                                  |

## CDN(jsDelivr)から使う

vue-codemirror6 1.8.0 以降は、バンドラーなしでも使えます(Vue 3 のみ)。jsDelivr の ESM ファイルを [import map](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/script/type/importmap) で読み込み、アプリにコンポーネントを登録します。

```html
<script type="importmap">
  {
    "imports": {
      "vue-codemirror6": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/index.es.js",
      "vue": "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js",
      "vue-demi": "https://cdn.jsdelivr.net/npm/vue-demi@0.14/lib/v3/index.mjs",
      "codemirror": "https://cdn.jsdelivr.net/npm/codemirror@6/dist/index.js",
      "@codemirror/autocomplete": "https://cdn.jsdelivr.net/npm/@codemirror/autocomplete@6/dist/index.js",
      "@codemirror/commands": "https://cdn.jsdelivr.net/npm/@codemirror/commands@6/dist/index.js",
      "@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language@6/dist/index.js",
      "@codemirror/lint": "https://cdn.jsdelivr.net/npm/@codemirror/lint@6/dist/index.js",
      "@codemirror/search": "https://cdn.jsdelivr.net/npm/@codemirror/search@6/dist/index.js",
      "@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state@6/dist/index.js",
      "@codemirror/streamparser": "https://cdn.jsdelivr.net/npm/@codemirror/streamparser@6/dist/index.js",
      "@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view@6/dist/index.js",
      "@lezer/common": "https://cdn.jsdelivr.net/npm/@lezer/common@1/dist/index.js",
      "@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight@1/dist/index.js",
      "@lezer/lr": "https://cdn.jsdelivr.net/npm/@lezer/lr@1/dist/index.js",
      "@marijn/find-cluster-break": "https://cdn.jsdelivr.net/npm/@marijn/find-cluster-break@1/src/index.js",
      "crelt": "https://cdn.jsdelivr.net/npm/crelt@1/index.js",
      "style-mod": "https://cdn.jsdelivr.net/npm/style-mod@4/src/style-mod.js",
      "w3c-keyname": "https://cdn.jsdelivr.net/npm/w3c-keyname@2/index.js",

      "@codemirror/lang-javascript": "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript@6/dist/index.js",
      "@lezer/javascript": "https://cdn.jsdelivr.net/npm/@lezer/javascript@1/dist/index.js"
    }
  }
</script>

<div id="app">
  <code-mirror v-model="value" basic :lang="lang"></code-mirror>
</div>

<script type="module">
  import { createApp, ref } from 'vue';
  import CodeMirror from 'vue-codemirror6';
  import { javascript } from '@codemirror/lang-javascript';

  createApp({
    components: { CodeMirror },
    setup() {
      const value = ref('console.log("Hello, CodeMirror!");');
      const lang = javascript();
      return { value, lang };
    }
  }).mount('#app');
</script>
```

:::warning 依存パッケージは 1 つずつだけ読み込む
`@codemirror/state` などの `@codemirror/*` が 2 つ読み込まれると CodeMirror が動かなくなり、Vue が 2 つ読み込まれるとリアクティビティが壊れます。上の例のように各パッケージを 1 つの URL に対応させてください。jsDelivr の `/+esm` の URL は使わないでください。パッケージごとに依存のバージョンが別々に固定されるため、重複が起きやすくなります。
:::

- `vue.esm-browser.prod.js` にはテンプレートコンパイラが含まれているので、上の例のような DOM 内テンプレートが使えます。
- import map の最後の 2 行は `@codemirror/lang-javascript` 用です。使う言語パッケージと、その `@lezer/*` パーサーも同じように追加してください。
- Vue アプリを使わずにカスタム要素として使う場合は [Web Component](./web-components#cdnjsdelivrから使う) を参照してください。

## 次のステップ

- [使い方](./usage) — `v-model`、スロット、読み取り専用、キーバインド
- [言語・リンター・テーマ](./languages-and-themes)

---
description: vue-codemirror6 を Vue のテンプレート以外でネイティブのカスタム要素として使う方法を説明します。
---

# Web Component

同じコンポーネントを、Vue の [`defineCustomElement`](https://ja.vuejs.org/api/custom-elements.html#definecustomelement) でラップしたネイティブのカスタム要素としても提供しています(Vue 3 のみ)。Vue のカスタム要素の動作については、Vue のドキュメントの [Vue と Web コンポーネント](https://ja.vuejs.org/guide/extras/web-components.html) を参照してください。

エントリポイントは 2 つあります。

| エントリポイント          | 登録されるタグ                | `HTMLElementTagNameMap` の型 |
| ------------------------- | ----------------------------- | ---------------------------- |
| `vue-codemirror6/wc-auto` | `<code-mirror>`(自動)         | あり                         |
| `vue-codemirror6/wc`      | `register()` に渡したタグのみ | なし                         |

## 自動で登録する

`vue-codemirror6/wc-auto` を import すると `<code-mirror>` が登録されます。

```ts
import 'vue-codemirror6/wc-auto';
```

```html
<code-mirror></code-mirror>
```

## 任意のタグ名で登録する

`vue-codemirror6/wc` を import し、使いたいタグ名を `register()` に渡します。

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

default export を使って自分で登録することもできます。

```ts
import CodeMirrorElement from 'vue-codemirror6/wc';

customElements.define('my-editor', CodeMirrorElement);
```

:::warning 登録できるタグ名は 1 つだけ
同じコンストラクタは、1 つのカスタム要素レジストリに一度しか登録できません。登録するタグ名は 1 つにし、同じページで `vue-codemirror6/wc` と `vue-codemirror6/wc-auto` を併用しないでください。2 つ目のタグ名を登録しようとすると `NotSupportedError` になります。
:::

:::warning 型定義
`vue-codemirror6/wc` は `HTMLElementTagNameMap` に何も追加しません。タグの型は自分で宣言してください。

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

## CDN(jsDelivr)から使う

どちらのエントリポイントも、jsDelivr の ESM ファイルを [import map](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/script/type/importmap) で読み込めば、バンドラーなしで使えます(バージョン 1.8.0 以降)。

```html
<script type="importmap">
  {
    "imports": {
      "vue-codemirror6/wc-auto": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc-auto.es.js",
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

<code-mirror></code-mirror>

<script type="module">
  import 'vue-codemirror6/wc-auto';
  import { javascript } from '@codemirror/lang-javascript';

  const editor = document.querySelector('code-mirror');
  editor.basic = true;
  editor.lang = javascript();
  editor.modelValue = 'console.log("Hello, CodeMirror!");';
</script>
```

:::warning 依存パッケージは 1 つずつだけ読み込む
`@codemirror/state` などの `@codemirror/*` が 2 つ読み込まれると CodeMirror が動かなくなり、Vue が 2 つ読み込まれると要素が動かなくなります。上の例のように各パッケージを 1 つの URL に対応させてください。jsDelivr の `/+esm` の URL は使わないでください。パッケージごとに依存のバージョンが別々に固定されるため、重複が起きやすくなります。
:::

- 最後の 2 行は `@codemirror/lang-javascript` 用です。使う言語パッケージと、その `@lezer/*` パーサーも同じように追加してください。
- 任意のタグ名を使う場合は、代わりに `"vue-codemirror6/wc": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc.es.js"` を登録して `register()` を呼んでください。
- `*.umd.js`(`vue-codemirror6/umd`、`vue-codemirror6/wc/umd`、`vue-codemirror6/wc-auto/umd`)は CommonJS / AMD ローダー向けで、通常の `<script>` タグでは読み込めません。

## 補足

- Vue のテンプレート内で使う場合は、`compilerOptions.isCustomElement`(例: `tag => tag === 'code-mirror'`)でカスタム要素として扱うよう設定してください。
- エディタは open な Shadow Root の中に描画されます。
- 以下の例では `<code-mirror>` を使っています。`vue-codemirror6/wc` を使う場合は、登録したタグ名に読み替えてください。

## props の指定

- **プリミティブな props**(`string`、`boolean`、`number`)は、属性と DOM プロパティのどちらでも指定できます。
- **オブジェクト・配列・関数の props**(`lang`、`linter`、`extensions`、`theme`、`keymap` など)は、DOM プロパティでのみ指定できます。

最初の描画に反映させるには、要素を DOM に追加する前にプロパティを設定してください。

```ts
import { javascript } from '@codemirror/lang-javascript';

const element = document.createElement('code-mirror');
element.setAttribute('readonly', '');
element.modelValue = 'const x = 1;';
element.lang = javascript();

document.body.append(element);
```

## イベント

Vue の emit はネイティブの `CustomEvent` として発火します。emit の引数は配列として `event.detail` に入ります。

```ts
element.addEventListener('ready', event => {
  const [{ view }] = (event as CustomEvent).detail;
  console.log(view);
});

element.addEventListener('update:model-value', event => {
  const [value] = (event as CustomEvent).detail;
  console.log(value);
});
```

## インスタンス API

[インスタンス API](../api/instance) は要素から直接使えます。

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

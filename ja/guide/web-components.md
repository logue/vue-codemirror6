> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# Web Component

:::warning 実験的機能
Web Component 版は実験的な機能です。動作は今後変わる可能性があります。
:::

このパッケージは、Vue の [`defineCustomElement`](https://ja.vuejs.org/guide/extras/web-components.html) でラップしたコンポーネントも書き出しています。任意のタグ名で登録して使います。

```ts
import { CodeMirror } from 'vue-codemirror6';

customElements.define('code-mirror', CodeMirror);
```

```html
<code-mirror></code-mirror>
```

エディタは open な Shadow Root の中に描画されます。

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

[インスタンス API](/vue-codemirror6/ja/api/instance.md) は要素から直接使えます。

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

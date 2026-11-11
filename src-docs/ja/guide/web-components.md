---
description: vue-codemirror6 を Vue のテンプレート以外でネイティブのカスタム要素として使う方法を説明します(実験的機能)。
---

# Web Component

:::warning 実験的機能
Web Component 版は実験的な機能です。動作は今後変わる可能性があります。
:::

Web Component 版は別のエントリポイント `vue-codemirror6/wc` として提供しています(Vue 3 のみ)。Vue の [`defineCustomElement`](https://ja.vuejs.org/guide/extras/web-components.html) でコンポーネントをラップしたもので、import するだけで `<code-mirror>` が自動で登録されます。

```ts
import 'vue-codemirror6/wc';
```

```html
<code-mirror></code-mirror>
```

別のタグ名でも使いたい場合は `register()` を呼びます。同じコンストラクタは1つのレジストリに一度しか登録できないため、追加のタグ名はサブクラスとして登録されます。

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

:::warning 追加したタグ名の型定義
`HTMLElementTagNameMap` に追加されるのは `code-mirror` だけです。`register('my-editor')` で登録したタグには要素の型が付かないため、自分で宣言してください。

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

Vue のテンプレート内で使う場合は、`compilerOptions.isCustomElement`(例: `tag => tag === 'code-mirror'`)でカスタム要素として扱うよう設定してください。

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

[インスタンス API](../api/instance) は要素から直接使えます。

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

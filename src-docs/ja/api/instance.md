---
description: vue-codemirror6 コンポーネントのインスタンスが公開しているプロパティとメソッド(CodeMirror 5 互換のヘルパーを含む)です。
---

# インスタンス API

テンプレート ref からインスタンスにアクセスします。型チェックには `CodeMirrorExposed` 型を使ってください。

```vue
<script lang="ts" setup vapor>
  import { ref } from 'vue';
  import CodeMirror, { type CodeMirrorExposed } from 'vue-codemirror6';

  const cm = ref<CodeMirrorExposed>();

  const insertDate = () => {
    cm.value?.replaceSelection(new Date().toISOString());
  };
</script>

<template>
  <code-mirror ref="cm" basic />
  <button type="button" @click="insertDate">日付を挿入</button>
</template>
```

:::info
エディタはマウント後に生成されます。`ready` イベントが発火するまでは、`view` やそこから得られる値は `undefined` または空です。
:::

## プロパティ

| プロパティ        | 型                                    | 説明                                                                                                               |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `view`            | `EditorView \| undefined`             | [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView)。コンポーネントがラップしていない機能に使います。 |
| `editor`          | `HTMLElement \| undefined`            | エディタを含むルート要素                                                                                           |
| `dom`             | `Element \| undefined`                | 編集可能なコンテンツ要素                                                                                           |
| `selection`       | `EditorSelection \| undefined`        | [選択範囲](https://codemirror.net/docs/ref/#state.EditorSelection) を取得・設定します。                            |
| `cursor`          | `number`                              | カーソル位置を取得・設定します。                                                                                   |
| `focus`           | `boolean`                             | フォーカス状態を取得・設定します。                                                                                 |
| `length`          | `number`                              | テキストの長さ                                                                                                     |
| `json`            | `Record<string, StateField<unknown>>` | 状態を JSON シリアライズ可能なオブジェクトとして取得・設定します。                                                 |
| `diagnosticCount` | `number`                              | リンターの診断結果の件数。[`diagnosticCount`](https://codemirror.net/docs/ref/#lint.diagnosticCount) を参照。      |

## メソッド

| メソッド             | 説明                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `lint()`             | すぐにリンターを実行します。`linter` を指定している場合のみ動作します。 |
| `forceReconfigure()` | すべての拡張機能を外してから登録し直します。                            |

## CodeMirror 5 互換のメソッド

[CodeMirror 5](https://codemirror.net/5/) に慣れている方向けの互換メソッドです。通常は上記のプロパティと `view` で足りるため、**積極的な使用はおすすめしません**。

| メソッド                                                             | 説明                                            |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| `getRange(from?: number, to?: number)`                               | 指定した位置の間のテキストを取得します。        |
| `getLine(number: number)`                                            | 指定した行の内容を取得します。                  |
| `lineCount()`                                                        | 行数を取得します。                              |
| `getCursor()`                                                        | 主選択範囲の一方の端を取得します。              |
| `listSelections()`                                                   | 現在のすべての選択範囲を取得します。            |
| `getSelection()`                                                     | 選択中のテキストを取得します。                  |
| `getSelections()`                                                    | すべての選択範囲のテキストを取得します。        |
| `somethingSelected()`                                                | テキストが選択されていれば `true` を返します。  |
| `replaceRange(replacement: string \| Text, from, to)`                | `from` から `to` までのテキストを置き換えます。 |
| `replaceSelection(replacement: string \| Text)`                      | 選択範囲を置き換えます。                        |
| `setCursor(position: number)`                                        | カーソル位置を設定します。                      |
| `setSelection(anchor: number, head?: number)`                        | 単一の選択範囲を設定します。                    |
| `setSelections(ranges: readonly SelectionRange[], primary?: number)` | 複数の選択範囲を設定します。                    |
| `extendSelectionsBy(f: (range: SelectionRange) => number)`           | すべての選択範囲を `f` の結果まで拡張します。   |

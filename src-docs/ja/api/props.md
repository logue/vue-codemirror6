---
description: vue-codemirror6 コンポーネントの props の一覧です。型、デフォルト値、対応する CodeMirror のオプションを記載しています。
---

# Props

テンプレートではケバブケース(`tab-size`)、JavaScript ではキャメルケース(`tabSize`)で記述します。

## コンテンツ

| Prop          | 型                      | デフォルト  | 説明                                                                                                      |
| ------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `model-value` | `string \| Text`        | `''`        | テキスト。`v-model` で使います(`value` ではありません)。                                                  |
| `placeholder` | `string \| HTMLElement` | `undefined` | テキストが空のときに表示します。[placeholder](https://codemirror.net/docs/ref/#view.placeholder) を参照。 |
| `tag`         | `string`                | `'div'`     | ルート要素のタグ名                                                                                        |

## セットアップ

| Prop      | 型        | デフォルト | 説明                                                                                                                |
| --------- | --------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `basic`   | `boolean` | `false`    | [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup) を有効にします。                             |
| `minimal` | `boolean` | `false`    | [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup) を有効にします。`basic` が優先されます。 |

## 編集

| Prop                        | 型             | デフォルト  | 説明                                                                                                                       |
| --------------------------- | -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `readonly`                  | `boolean`      | `false`     | 変更を禁止します。フォーカスは可能です。[`readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly) を参照。 |
| `disabled`                  | `boolean`      | `false`     | 編集もフォーカスもできなくします。[`editable`](https://codemirror.net/docs/ref/#view.EditorView^editable) の反転値です。   |
| `wrap`                      | `boolean`      | `false`     | [行を折り返します](https://codemirror.net/docs/ref/#view.EditorView^lineWrapping)。                                        |
| `tab`                       | `boolean`      | `false`     | Tab キーでインデントします([`indentWithTab`](https://codemirror.net/examples/tab/))。                                      |
| `tab-size`                  | `number`       | `undefined` | [タブの幅](https://codemirror.net/docs/ref/#state.EditorState^tabSize)                                                     |
| `indent-unit`               | `string`       | `undefined` | [インデントの単位](https://codemirror.net/docs/ref/#language.indentUnit)                                                   |
| `allow-multiple-selections` | `boolean`      | `false`     | [複数選択を許可します](https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections)。                       |
| `line-separator`            | `string`       | `undefined` | [改行文字](https://codemirror.net/docs/ref/#state.EditorState^lineSeparator)。未指定の場合は `\n` です。                   |
| `keymap`                    | `KeyBinding[]` | `[]`        | 独自の [キーバインド](https://codemirror.net/docs/ref/#view.KeyBinding)                                                    |

## 言語とリンター

| Prop            | 型                | デフォルト  | 説明                                                                                                      |
| --------------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `lang`          | `LanguageSupport` | `undefined` | シンタックスハイライトの言語。[言語一覧](https://codemirror.net/#languages) を参照。                      |
| `linter`        | `LintSource`      | `undefined` | リンターのソース(`jsonParseLinter()`、`esLint(...)` など)                                                 |
| `linter-config` | `object`          | `{}`        | [リンターの設定](https://codemirror.net/docs/ref/#lint.linter^config)                                     |
| `force-linting` | `boolean`         | `false`     | すぐにリンターを実行します。[`forceLinting`](https://codemirror.net/docs/ref/#lint.forceLinting) を参照。 |
| `gutter`        | `boolean`         | `false`     | [リンターのガター](https://codemirror.net/docs/ref/#lint.lintGutter) を表示します。`linter` が必要です。  |
| `gutter-config` | `object`          | `undefined` | [ガターの設定](https://codemirror.net/docs/ref/#lint.lintGutter^config)                                   |

## 外観

| Prop      | 型                          | デフォルト  | 説明                                                                                            |
| --------- | --------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `dark`    | `boolean`                   | `false`     | エディタのテーマを暗い配色として扱います。                                                      |
| `theme`   | `Record<string, StyleSpec>` | `{}`        | [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme) に渡すスタイル定義 |
| `phrases` | `Record<string, string>`    | `undefined` | [UI の翻訳](https://codemirror.net/examples/translate/)                                         |

## スクロール

| Prop                       | 型        | デフォルト | 説明                                                                                                                                                                    |
| -------------------------- | --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scroll-into-view`         | `boolean` | `true`     | `modelValue` が外部から更新されたときに選択位置までスクロールします。[`scrollIntoView`](https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView) を参照。 |
| `preserve-scroll-position` | `boolean` | `false`    | `modelValue` が外部から更新されたときにスクロール位置を保ちます。[`scrollSnapshot`](https://codemirror.net/docs/ref/#view.EditorView.scrollSnapshot) を参照。           |

## 拡張機能

| Prop         | 型            | デフォルト | 説明                                                                                                                  |
| ------------ | ------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| `extensions` | `Extension[]` | `[]`       | 追加の [拡張機能](https://codemirror.net/docs/ref/#state.Extension)。props から生成される拡張機能の後に追加されます。 |

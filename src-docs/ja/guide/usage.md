---
description: vue-codemirror6 の基本的な使い方。v-model、スロット、読み取り専用と無効化、キーバインド、イベント、UI の翻訳について説明します。
---

# 使い方

## `v-model` による双方向バインディング

テキストは `value` ではなく `modelValue` でバインドされるので、ほかの Vue コンポーネントと同じように `v-model` を使えます。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('');
</script>

<template>
  <code-mirror v-model="value" basic placeholder="何か入力してください…" />
  <pre>{{ value }}</pre>
</template>
```

`modelValue` を外部から変更すると、エディタの内容が置き換わります。そのときの表示は次の 2 つの props で制御できます。

- `scroll-into-view`(デフォルト `true`):更新後の選択位置までスクロールします。
- `preserve-scroll-position`(デフォルト `false`):現在のスクロール位置を保ちます。ログやストリーミング出力のように、テキストを追記し続ける場合に便利です。

## スロットで初期テキストを指定する

`v-model` の代わりに、コンポーネントの中に初期テキストを書くこともできます。使われるのは最初の子ノードのテキストだけです。

```vue
<script setup lang="ts">
import { json, jsonParseLinter } from '@codemirror/lang-json';
import CodeMirror from 'vue-codemirror6';
</script>

<template>
  <code-mirror basic readonly :lang="json()" :linter="jsonParseLinter()">
    <pre>
{
  "key": "value"
}</pre>
  </code-mirror>
</template>
```

:::warning

- スロットの内容は `v-model` の値を上書きするので、両方を同時に使わないでください。スロットは、読み取り専用でシンタックスハイライトを表示するだけの用途を想定しています。
- 空白が詰められないように、テキストは `<pre>` で囲んでください。
- スロットは Vue 2.7 では動作しません。

:::

## 読み取り専用と無効化

| Prop       | 編集 | フォーカス・選択 | CodeMirror のオプション                                                                     |
| ---------- | ---- | ---------------- | ------------------------------------------------------------------------------------------- |
| `readonly` | 不可 | 可               | [`EditorState.readOnly`](https://codemirror.net/docs/ref/#state.EditorState^readOnly)       |
| `disabled` | 不可 | 不可             | [`EditorView.editable`](https://codemirror.net/docs/ref/#view.EditorView^editable) の反転値 |

シンタックスハイライトの表示だけに使う場合は `disabled` を指定してください。

```vue
<template>
  <code-mirror v-model="value" basic :readonly="isReadonly" :disabled="isDisabled" />
</template>
```

## 編集の挙動

| Prop                        | 効果                                                     |
| --------------------------- | -------------------------------------------------------- |
| `wrap`                      | 行を折り返します。                                       |
| `tab`                       | Tab キーでフォーカスを移動する代わりにインデントします。 |
| `tab-size`                  | タブ文字の幅                                             |
| `indent-unit`               | インデントの単位(例:`"  "` や `"\t"`)                    |
| `allow-multiple-selections` | 複数選択を許可します(Ctrl / Cmd + クリックなど)。        |
| `line-separator`            | 改行文字。デフォルトは `\n` です。                       |
| `placeholder`               | テキストが空のときに表示する文字列または `HTMLElement`   |

:::tip
`tab` を指定すると Tab キーがエディタ内で使われます。キーボード操作の場合は、Esc を押してから Tab を押すとエディタの外に移動できます。
:::

## キーバインドの追加

`keymap` に [`KeyBinding`](https://codemirror.net/docs/ref/#view.KeyBinding) の配列を渡します。`run` が `true` を返すと、そのキーのデフォルトの動作は実行されません。

```vue
<script setup lang="ts">
import type { KeyBinding } from '@codemirror/view';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('');

const keymap: KeyBinding[] = [
  {
    key: 'Mod-s',
    run: () => {
      console.log('save', value.value);
      return true;
    }
  }
];
</script>

<template>
  <code-mirror v-model="value" basic :keymap="keymap" />
</template>
```

## イベントを受け取る

```vue
<template>
  <code-mirror
    v-model="value"
    @ready="({ view }) => console.log('ready', view)"
    @focus="focused => (isFocused = focused)"
    @update="update => console.log(update.docChanged)"
  />
</template>
```

各イベントの引数は [イベント](../api/events) を参照してください。

## エディタの UI を翻訳する

`phrases` を使うと、CodeMirror が表示する文字列(検索パネル、リンターのパネル、折りたたみマーカーなど)を翻訳できます。指定できるキーは CodeMirror の [翻訳の例](https://codemirror.net/examples/translate/) を参照してください。

```vue
<script setup lang="ts">
import CodeMirror from 'vue-codemirror6';

const phrases: Record<string, string> = {
  // @codemirror/search
  'Go to line': '行き先の行',
  go: 'OK',
  Find: '検索',
  Replace: '置き換え',
  next: '▼',
  previous: '▲',
  all: 'すべて',
  'match case': '大文字と小文字を区別',
  'by word': '単語単位',
  regexp: '正規表現',
  replace: '置き換え',
  'replace all': 'すべて置き換え',
  close: '閉じる',
  // @codemirror/lint
  Diagnostics: 'エラー',
  'No diagnostics': 'エラーなし'
};
</script>

<template>
  <code-mirror basic :phrases="phrases" />
</template>
```

:::tip
vue-i18n と組み合わせる場合は、ロケールの切り替えに追従するよう `phrases` をリアクティブ(`computed` など)にしてください。翻訳表の全体と vue-i18n の例は [多言語化](./i18n) を参照してください。
:::

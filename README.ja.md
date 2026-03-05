# vue-codemirror6

[English](README.md) | 日本語

<p align="center">
  <img src="https://user-images.githubusercontent.com/480173/224358008-6ffad05d-1d97-4c18-8554-7d41b03f88ab.png" alt="logo" width="300" height="300" />
</p>

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/vue-codemirror6/badge)](https://www.jsdelivr.com/package/npm/vue-codemirror6)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-codemirror6.svg?style=flat)](https://www.npmjs.com/package/vue-codemirror6)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/vue-codemirror6/file/README.md)
[![npm version](https://img.shields.io/npm/v/vue-codemirror6.svg)](https://www.npmjs.com/package/vue-codemirror6)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/vue-codemirror6)
[![Twitter Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://twitter.com/logue256)

Vueで[CodeMirror6](https://codemirror.net/6/)を使用するためのコンポーネントです。このコンポーネントはVue2とVue3の両方で動作します。

- [変更履歴](./CHANGELOG.md)

## 使い方

```sh
yarn add vue-codemirror6 codemirror
```

Vue 2.7以下の場合は、[@vue/composition-api](https://www.npmjs.com/package/@vue/composition-api)が別途必要です。

```sh
yarn add vue-codemirror6 @vue/composition-api
```

このコンポーネントは、一般的なVueコンポーネントと同様に`v-model`で双方向バインディングを処理できます。

## Props

| Props                     | Type                              | 説明                                                                                                                                                                                                                 |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| model-value               | string \| Text                    | テキスト値。(`value`ではありません)                                                                                                                                                                                  |
| basic                     | boolean                           | [basicSetup](https://codemirror.net/docs/ref/#codemirror.basicSetup)を使用します。                                                                                                                                   |
| minimal                   | boolean                           | [miniSetup](https://codemirror.net/docs/ref/#codemirror.minimalSetup)を使用します。`basic` propも指定されている場合は、そちらの設定が優先されます。                                                                  |
| dark                      | boolean                           | ダークモードの切り替え。                                                                                                                                                                                             |
| placeholder               | string                            | 空白の場合にプレースホルダーテキスト（またはHTML DOM）を追加します。                                                                                                                                                 |
| wrap                      | boolean                           | テキストの行折り返し。[lineWrapping](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)を参照してください。                                                                                            |
| tab                       | boolean                           | タブインデントを有効にします。                                                                                                                                                                                       |
| allow-multiple-selections | boolean                           | 複数選択を許可します。[allowMultipleSelections](https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections)を参照してください。                                                                      |
| tab-size                  | number                            | この状態で使用するタブサイズを設定します。                                                                                                                                                                           |
| line-separator            | string                            | 改行（区切り文字）を設定します。（デフォルトは`\n`です。）                                                                                                                                                           |
| theme                     | { [selector: string]: StyleSpec } | テーマを指定します。例えば、[@codemirror/theme-one-dark](https://github.com/codemirror/theme-one-dark)を使用する場合は、`oneDark`をインポートしてこのpropに設定します。                                              |
| readonly                  | boolean                           | カーソルを表示したり、テキストをドラッグできますが、値を編集することはできません。                                                                                                                                   |
| disabled                  | boolean                           | CodeMirrorのeditableの逆の値です。`readonly`に似ていますが、この値をtrueに設定するとドラッグも無効になります。                                                                                                       |
| lang                      | LanguageSupport                   | 構文ハイライトを使用したい言語。<https://codemirror.net/6/#languages>を参照してください。                                                                                                                            |
| phrases                   | Record&lt;string, string&gt;      | 表示される文字列を多言語化したい場合はここで指定します。<https://codemirror.net/6/examples/translate/>を参照してください。                                                                                           |
| extensions                | Extension[]                       | CodeMirrorを拡張する機能拡張が含まれます。                                                                                                                                                                           |
| linter                    | LintSource                        | リンターを設定します。`@codemirror/lang-javascript`の場合は`esLint([任意のルール])`関数、`@codemirror/json`の場合は`jsonParseLinter()`関数を入力します。詳細については、各言語ライブラリのソースを参照してください。 |
| linterConfig              | Object                            | <https://codemirror.net/docs/ref/#lint.linter^config>を参照してください。                                                                                                                                            |
| forceLinting              | boolean                           | <https://codemirror.net/docs/ref/#lint.forceLinting>を参照してください。                                                                                                                                             |
| gutter                    | boolean                           | `linter`が指定されている場合、エラーがあった行に🔴を表示します。`linter`が指定されていない場合は機能しません。                                                                                                       |
| gutterConfig              | Object                            | <https://codemirror.net/docs/ref/#lint.lintGutter^config>を参照してください。                                                                                                                                        |
| tag                       | string                            | コンポーネントで使用されるHTMLタグ。（デフォルトは`div`タグです。）                                                                                                                                                  |
| scrollIntoView            | boolean                           | 外部更新でフォームをスクロールできるようにします。（デフォルトは`true`です。）                                                                                                                                       |
| keymap                    | KeyBinding[]                      | キーバインディングは、キー名をコマンドスタイルの関数に関連付けます。<https://codemirror.net/docs/ref/#view.KeyBinding>を参照してください。                                                                           |

⚠ 注意: `lang`と`linter`は、`extensions`にまとめて設定することもできます。これらは、以前のバージョンのCodeMirror設定との互換性とpropsの型付けのために分離されています。

### サポートされている言語

#### 公式

- [`@codemirror/lang-angular`](https://www.npmjs.com/package/@codemirror/lang-angular)
- [`@codemirror/lang-cpp`](https://www.npmjs.com/package/@codemirror/lang-cpp)
- [`@codemirror/lang-css`](https://www.npmjs.com/package/@codemirror/lang-css)
- [`@codemirror/lang-html`](https://www.npmjs.com/package/@codemirror/lang-html)
- [`@codemirror/lang-java`](https://www.npmjs.com/package/@codemirror/lang-java)
- [`@codemirror/lang-javascript`](https://www.npmjs.com/package/@codemirror/lang-javascript)
- [`@codemirror/lang-json`](https://www.npmjs.com/package/@codemirror/lang-json)
- [`@codemirror/lang-lezer`](https://www.npmjs.com/package/@codemirror/lang-lezer)
- [`@codemirror/lang-markdown`](https://www.npmjs.com/package/@codemirror/lang-markdown)
- [`@codemirror/lang-php`](https://www.npmjs.com/package/@codemirror/lang-php)
- [`@codemirror/lang-python`](https://www.npmjs.com/package/@codemirror/lang-python)
- [`@codemirror/lang-rust`](https://www.npmjs.com/package/@codemirror/lang-rust)
- [`@codemirror/lang-sql`](https://www.npmjs.com/package/@codemirror/lang-sql)
- [`@codemirror/lang-vue`](https://www.npmjs.com/package/@codemirror/lang-vue)
- [`@codemirror/lang-west`](https://www.npmjs.com/package/@codemirror/lang-west)
- [`@codemirror/lang-xml`](https://www.npmjs.com/package/@codemirror/lang-xml)

### 非公式

- [`@phoenix-plugin-registry/petetnt.brackets-codemirror-fortran`](https://www.npmjs.com/package/@phoenix-plugin-registry/petetnt.brackets-codemirror-fortran)
- [`@phoenix-plugin-registry/petetnt.brackets-codemirror-go`](https://www.npmjs.com/package/@phoenix-plugin-registry/petetnt.brackets-codemirror-go)
- [`@acarl005/lang-sql`](https://www.npmjs.com/package/@acarl005/lang-sql)
- [`@ark-us/codemirror-lang-taylor`](https://www.npmjs.com/package/@ark-us/codemirror-lang-taylor)
- [`@formulavize/lang-fiz`](https://www.npmjs.com/package/@formulavize/lang-fiz)
- [`@gravitywiz/codemirror-lang-gfcalc`](https://www.npmjs.com/package/@gravitywiz/codemirror-lang-gfcalc)
- [`@nextjournal/lang-clojure`](https://www.npmjs.com/package/@nextjournal/lang-clojure)
- [`@plutojl/lang-julia`](https://www.npmjs.com/package/@plutojl/lang-julia)
- [`@polybase/codemirror-lang-javascript`](https://www.npmjs.com/package/@polybase/codemirror-lang-javascript)
- [`@replit/codemirror-lang-nix`](https://www.npmjs.com/package/@replit/codemirror-lang-nix)
- [`@replit/codemirror-lang-csharp`](https://www.npmjs.com/package/@replit/codemirror-lang-csharp)
- [`@replit/codemirror-lang-solidity`](https://www.npmjs.com/package/@replit/codemirror-lang-solidity)
- [`@replit/codemirror-lang-svelte`](https://www.npmjs.com/package/@replit/codemirror-lang-svelte)
- [`@zhijiu/lang-sql`](https://www.npmjs.com/package/@zhijiu/lang-sql)
- [`codemirror-lang-bool`](https://www.npmjs.com/package/codemirror-lang-bool)
- [`codemirror-lang-brainfuck`](https://www.npmjs.com/package/codemirror-lang-brainfuck)
- [`codemirror-lang-cherry`](https://www.npmjs.com/package/codemirror-lang-cherry)
- [`codemirror-lang-chordpro`](https://www.npmjs.com/package/codemirror-lang-chordpro)
- [`codemirror-lang-circom`](https://www.npmjs.com/package/codemirror-lang-circom)
- [`codemirror-lang-edn`](https://www.npmjs.com/package/codemirror-lang-edn)
- [`codemirror-lang-ejs`](https://www.npmjs.com/package/codemirror-lang-ejs)
- [`codemirror-lang-fsl`](https://www.npmjs.com/package/codemirror-lang-fsl)
- [`codemirror-lang-gml`](https://www.npmjs.com/package/codemirror-lang-gml)
- [`codemirror-lang-golfscript`](https://www.npmjs.com/package/codemirror-lang-golfscript)
- [`codemirror-lang-homescript`](https://www.npmjs.com/package/codemirror-lang-homescript)
- [`codemirror-lang-html-n8n`](https://www.npmjs.com/package/codemirror-lang-html-n8n)
- [`codemirror-lang-inform7`](https://www.npmjs.com/package/codemirror-lang-inform7)
- [`codemirror-lang-j`](https://www.npmjs.com/package/codemirror-lang-j)
- [`codemirror-lang-janet`](https://www.npmjs.com/package/codemirror-lang-janet)
- [`codemirror-lang-k`](https://www.npmjs.com/package/codemirror-lang-k)
- [`codemirror-lang-karol`](https://www.npmjs.com/package/codemirror-lang-karol)
- [`codemirror-lang-mermaid`](https://www.npmjs.com/package/codemirror-lang-mermaid)
- [`codemirror-lang-n8n-expression`](https://www.npmjs.com/package/codemirror-lang-n8n-expression)
- [`codemirror-lang-prolog`](https://www.npmjs.com/package/codemirror-lang-prolog)
- [`codemirror-lang-qpen`](https://www.npmjs.com/package/codemirror-lang-qpen)
- [`codemirror-lang-qtam`](https://www.npmjs.com/package/codemirror-lang-qtam)
- [`codemirror-lang-r`](https://www.npmjs.com/package/codemirror-lang-r)
- [`codemirror-lang-rome-ast`](https://www.npmjs.com/package/codemirror-lang-rome-ast)
- [`codemirror-lang-rome`](https://www.npmjs.com/package/codemirror-lang-rome)
- [`codemirror-lang-rush`](https://www.npmjs.com/package/codemirror-lang-rush)
- [`codemirror-lang-scopescript`](https://www.npmjs.com/package/codemirror-lang-scopescript)
- [`codemirror-lang-statement`](https://www.npmjs.com/package/codemirror-lang-statement)
- [`gcode-lang-codemirror`](https://www.npmjs.com/package/gcode-lang-codemirror)
- [`gmail-lang`](https://www.npmjs.com/package/gmail-lang)
- [`lang-bqn`](https://www.npmjs.com/package/lang-bqn)
- [`lang-clojure`](https://www.npmjs.com/package/lang-clojure)
- [`lang-d`](https://www.npmjs.com/package/lang-d)
- [`lang-feel`](https://www.npmjs.com/package/lang-feel)
- [`lang-firestore`](https://www.npmjs.com/package/lang-firestore)

### サポートされているテーマ

- [`@codemirror/theme-one-dark`](https://github.com/codemirror/theme-one-dark)
- [`upleveled/theme-vs-code-dark-plus`](https://github.com/upleveled/theme-vs-code-dark-plus)
- [`codemirror6-bootstrap-theme`](https://github.com/logue/codemirror6-bootstrap-theme)

## 例

最小限で動作させるには、以下のようにマークアップします。

```vue
<template>
  <code-mirror v-model="value" />
</template>

<script>
import { ref, defineComponent } from 'vue';

import CodeMirror from 'vue-codemirror6';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    const value = ref('Cozy lummox gives smart squid who asks for job pen.');

    return { value };
  },
});
</script>
```

### スロットを使用した例

スロットの内容は既存の`v-model`を上書きします。このため、`v-model`を使用せずに`readonly` propで単に表示する場合に使用することをお勧めします。

また、スロット内のテキストが自動的にフォーマットされないように、`<pre>`タグを挿入します。

```vue
<template>
  <code-mirror :lang="lang" :linter="linter">
    <pre>
{
  "key": "value"
}</pre
    >
  </code-mirror>
</template>

<script>
import { ref, defineComponent } from 'vue';

import { json, jsonParseLinter } from '@codemirror/lang-json';

import CodeMirror from 'vue-codemirror6';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    const lang = json();
    const linter = jsonParseLinter();
    return { lang, linter };
  },
});
</script>
```

### SSR（Nuxt.jsなど）での使用

このコンポーネントはSSR互換になりました。CodeMirrorはクライアント側でのみ初期化され、サーバー側レンダリング中にコンポーネントがエラーなく安全にレンダリングされます。

Nuxt 3を使用している場合は、コンポーネントを直接使用できます：

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

Nuxt 2を使用している場合や問題が発生した場合は、コンポーネントを`<ClientOnly>`でラップできます：

```vue
<template>
  <client-only>
    <code-mirror v-model="value" :lang="lang" />
  </client-only>
</template>
```

### 完全な例

[vite-vue3-ts-starter](https://github.com/logue/vite-vue3-ts-starter)でMarkdownエディターとして使用する場合。

```vue
<script lang="ts" setup>
import { ref, defineComponent, type Ref } from 'vue';

// コンポーネントの読み込み
import CodeMirror from 'vue-codemirror6';

// CodeMirror拡張機能
import { markdown as md } from '@codemirror/lang-markdown';
import type { LanguageSupport } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';

/** テキスト */
const value: Ref<string> = ref('');

/** ダークモード **/
const dark: Ref<boolean> = ref(
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

/**
 * CodeMirror言語
 *
 * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
 */
const lang: LanguageSupport = md();

/**
 * 国際化設定。
 * この例では、表示言語を日本語にしています。
 * vue-i18nと組み合わせて使用する場合は、リアクティブである必要があります。
 *
 * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
 */
const phrases: Record<string, string> = {
  // @codemirror/view
  'Control character': '制御文字',
  // @codemirror/commands
  'Selection deleted': '選択を削除',
  // @codemirror/language
  'Folded lines': '折り畳まれた行',
  'Unfolded lines': '折り畳める行',
  to: '行き先',
  'folded code': '折り畳まれたコード',
  unfold: '折り畳みを解除',
  'Fold line': '行を折り畳む',
  'Unfold line': '行の折り畳む解除',
  // @codemirror/search
  'Go to line': '行き先の行',
  go: 'OK',
  Find: '検索',
  Replace: '置き換え',
  next: '▼',
  previous: '▲',
  all: 'すべて',
  'match case': '一致条件',
  'by word': '全文検索',
  regexp: '正規表現',
  replace: '置き換え',
  'replace all': 'すべてを置き換え',
  close: '閉じる',
  'current match': '現在の一致',
  'replaced $ matches': '$ 件の一致を置き換え',
  'replaced match on line $': '$ 行の一致を置き換え',
  'on line': 'した行',
  // @codemirror/autocomplete
  Completions: '自動補完',
  // @codemirror/lint
  Diagnostics: 'エラー',
  'No diagnostics': 'エラーなし',
};
</script>

<template>
  <code-mirror
    v-model="value"
    basic
    :dark="dark"
    :lang="lang"
    :phrases="phrases"
  />
</template>
```

## イベント

| イベント | 説明                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| ready    | CodeMirrorが読み込まれたとき。                                                                                           |
| focus    | フォーカスが変更されたとき。                                                                                             |
| update   | CodeMirrorの状態が変更されたとき。[ViewUpdate](https://codemirror.net/docs/ref/#view.ViewUpdate)オブジェクトを返します。 |
| change   | 値が変更されたとき。[EditorState](https://codemirror.net/docs/ref/#state.EditorState)を返します。                        |

## パラメータ / 関数

```vue
<script setup lang="ts">
import { ref, onMounted, type Ref, type PropType } from 'vue';
import CodeMirror from 'vue-codemirror6';

const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref();

onMounted(() => {
  console.log(cm.value?.json);
});
</script>
<template>
  <code-mirror ref="cm" />
</template>
```

| 関数 / パラメータ  | 説明                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| view               | [EditorView](https://codemirror.net/docs/ref/#view.EditorView)を取得および設定します。                        |
| selection          | [EditorSelection](https://codemirror.net/docs/ref/#state.EditorSelection)インスタンスを取得および設定します。 |
| cursor             | [Cursor](https://codemirror.net/docs/ref/#state.EditorSelection^cursor)の位置を取得および設定します。         |
| json               | 状態をJSON直列化可能なオブジェクトとして取得および設定します。                                                |
| focus              | [Focus](https://codemirror.net/docs/ref/#view.EditorView.focus)を取得および設定します。                       |
| lint()             | リンターを強制実行します（`linter`propが指定されている場合のみ）。                                            |
| forceReconfigure() | すべての拡張機能を再登録します。                                                                              |

### CodeMirror5の後方互換関数

以下の説明は、[codemirror5](https://codemirror.net/5/)に精通している方向けの互換メソッドです。
通常、上記のメソッドで十分であるため、**積極的な使用は推奨されません**。

| 関数                                                                | 説明                                                                                     |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| getRange(from?: number, to?: number)                                | エディター内の指定されたポイント間のテキストを取得します。                               |
| getLine(number: number)                                             | 行の内容を取得します。                                                                   |
| lineCount()                                                         | エディターの行数を取得します。                                                           |
| getCursor()                                                         | 主選択の一方の端を取得します。                                                           |
| listSelections()                                                    | 現在のすべての選択のリストを取得します。                                                 |
| getSelection()                                                      | 現在選択されているコードを取得します。                                                   |
| getSelections()                                                     | 指定された配列の長さは、アクティブな選択の数と同じである必要があります。                 |
| somethingSelected()                                                 | テキストが選択されている場合はtrueを返します。                                           |
| replaceRange(replacement: string \| Text, from: number, to: number) | fromからtoまでのドキュメントの部分を指定された文字列で置き換えます。                     |
| replaceSelection(replacement: string \| Text)                       | 選択を指定された文字列で置き換えます。                                                   |
| setCursor(position: number)                                         | カーソル位置を設定します。                                                               |
| setSelection(anchor: number, head?: number)                         | 単一の選択範囲を設定します。                                                             |
| setSelections(ranges: readonly SelectionRange[], primary?: number)  | 新しい選択のセットを設定します。                                                         |
| extendSelectionsBy(f: Function)                                     | すべての既存の選択に指定された関数を適用し、結果に対してextendSelectionsを呼び出します。 |

## 推奨事項

CodeMirrorは比較的大容量であるため、[vite](https://vitejs.dev)を使用する場合は、ビルド時に以下のように[`manualChunks`](https://vitejs.dev/guide/build.html#chunking-strategy)オプションを使用して別ファイルとして出力するように設定することをお勧めします。

```ts
const config: UserConfig = {
  // ...
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ...
          codemirror: ['vue-codemirror6'],
          'codemirror-lang': [
            // 必要に応じて以下を追加してください。
            '@codemirror/lang-html',
            '@codemirror/lang-javascript',
            '@codemirror/lang-markdown',
          ],
          // ...
        },
      },
    },
  },
  // ...
};
```

## 開発

### テスト

このプロジェクトは、ユニットテストに[Vitest](https://vitest.dev/)を使用しています。

```bash
# テストを実行
pnpm test

# ウォッチモードでテストを実行
pnpm test:watch

# UIを使用してテストを実行
pnpm test:ui

# カバレッジを使用してテストを実行
pnpm test:coverage
```

テストスイートには以下が含まれます：

- **コンポーネントテスト**: 基本的なレンダリング、props、イベント、v-modelバインディングのテスト
- **SSRテスト**: Nuxt.jsやその他のSSRフレームワークの適切なサーバー側レンダリング互換性の確保
- **メソッドテスト**: 公開されているすべてのメソッドが正しく動作することを検証
- **エッジケース**: エラー処理と異常なシナリオのテスト

## ライセンス

©2022-2026 by Logue.
[MITライセンス](LICENSE)の下でライセンスされています。

## 🎨 開発者のために作られました

このテンプレートは、**UI/UXの優れた品質**と**最新の開発者体験**に焦点を当てて構築されています。これを維持するには、すべてがシームレスに動作することを確認するための継続的なテストと更新が必要です。

このプロジェクトの細部へのこだわりを評価していただける場合は、Vue.jsとMetaverseエコシステム全体での私の仕事をサポートするために、小額のスポンサーシップをいただければ幸いです。

[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

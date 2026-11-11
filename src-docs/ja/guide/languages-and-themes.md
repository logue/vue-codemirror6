---
description: vue-codemirror6 でのシンタックスハイライト、リンター、ガター、テーマ、ダークモード、独自の拡張機能の設定方法を説明します。
---

# 言語・リンター・テーマ

## 言語

言語パッケージをインストールし、その `LanguageSupport` オブジェクトを `lang` に渡します。

```vue
<script setup lang="ts">
import { markdown } from '@codemirror/lang-markdown';
import CodeMirror from 'vue-codemirror6';

const lang = markdown();
</script>

<template>
  <code-mirror basic wrap :lang="lang" />
</template>
```

公式の言語パッケージには次のものがあります。

`@codemirror/lang-angular`、`lang-cpp`、`lang-css`、`lang-html`、`lang-java`、`lang-javascript`、`lang-json`、`lang-lezer`、`lang-markdown`、`lang-php`、`lang-python`、`lang-rust`、`lang-sql`、`lang-vue`、`lang-wast`、`lang-xml`

コミュニティ製のパッケージも多数あります。[CodeMirror の言語一覧](https://codemirror.net/#languages) と下記の一覧を参照してください。

<details>
<summary>コミュニティ製の言語パッケージ</summary>

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

</details>

## リンター

`linter` に [`LintSource`](https://codemirror.net/docs/ref/#lint.LintSource) を渡します。`gutter` を付けると、問題のある行にマーカーが表示されます。

```vue
<script setup lang="ts">
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('{ "key": "value", }');
</script>

<template>
  <code-mirror v-model="value" basic gutter :lang="json()" :linter="jsonParseLinter()" />
</template>
```

JavaScript の場合、`@codemirror/lang-javascript` の `esLint()` と [eslint-linter-browserify](https://github.com/UziTech/eslint-linter-browserify) を組み合わせて使えます。

```ts
import { esLint } from '@codemirror/lang-javascript';
import eslint from 'eslint-linter-browserify';

const linter = esLint(new eslint.Linter(), {
  languageOptions: {
    parserOptions: { ecmaVersion: 2022, sourceType: 'module' }
  },
  rules: { semi: ['error', 'never'] }
});
```

| Prop            | 説明                                                                                 |
| --------------- | ------------------------------------------------------------------------------------ |
| `linter`        | リンターのソース                                                                     |
| `linter-config` | `delay` などの [リンターの設定](https://codemirror.net/docs/ref/#lint.linter^config) |
| `force-linting` | エディタがアイドル状態になるのを待たずに、すぐにリンターを実行します。               |
| `gutter`        | リンターのガターを表示します。`linter` を指定していない場合は効果がありません。      |
| `gutter-config` | [ガターの設定](https://codemirror.net/docs/ref/#lint.lintGutter^config)              |

診断結果の件数は [インスタンス](../api/instance) の `diagnosticCount` で取得でき、`lint()` で任意のタイミングでリンターを実行できます。

:::tip
エディタ内で <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>(macOS では <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>)を押すとリンターのパネルが開き、<kbd>F8</kbd> で次の問題に移動できます。
:::

## テーマとダークモード

- `dark` は、エディタの背景が暗いことを CodeMirror に伝えます。選択範囲やパネルなどの組み込み UI が暗い配色になります。
- `theme` には [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView^theme) に渡すスタイル定義のオブジェクトを指定します。

```vue
<script setup lang="ts">
import CodeMirror from 'vue-codemirror6';

const theme = {
  '&': { fontSize: '14px' },
  '.cm-content': { fontFamily: 'Menlo, monospace' },
  '.cm-gutters': { backgroundColor: 'transparent', border: 'none' }
};
</script>

<template>
  <code-mirror basic :dark="isDark" :theme="theme" />
</template>
```

配布されているテーマの多くは拡張機能の形式なので、`extensions` で追加します。

```vue
<script setup lang="ts">
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from 'vue-codemirror6';
</script>

<template>
  <code-mirror basic dark :extensions="[oneDark]" />
</template>
```

例:[`@codemirror/theme-one-dark`](https://github.com/codemirror/theme-one-dark)、[`@uiw/codemirror-themes`](https://github.com/uiwjs/react-codemirror/tree/master/themes)、[`codemirror6-bootstrap-theme`](https://github.com/logue/codemirror6-bootstrap-theme)

## その他の拡張機能

CodeMirror の [`Extension`](https://codemirror.net/docs/ref/#state.Extension) は何でも `extensions` で渡せます。ほかの props から生成される拡張機能と組み合わせて適用されます。

```vue
<script setup lang="ts">
import { EditorView } from '@codemirror/view';
import CodeMirror from 'vue-codemirror6';

const extensions = [EditorView.contentAttributes.of({ spellcheck: 'true' })];
</script>

<template>
  <code-mirror basic :extensions="extensions" />
</template>
```

:::info
`lang` と `linter` も `extensions` で指定できます。これらが独立した props になっているのは、型付けと以前のバージョンとの互換性のためです。
:::

props が変わるとコンポーネントはエディタを自動的に再設定します。コンポーネントが検知できない変更をした場合は、インスタンスの `forceReconfigure()` を呼び出してください。

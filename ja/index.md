> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# vue-codemirror6

Vue で使う CodeMirror 6

> CodeMirror 6 エディタを Vue 2.7 と Vue 3 で使えるようにする軽量なラッパーコンポーネント

[はじめる](/ja/guide/getting-started) | [Playground](/ja/playground) | [GitHub](https://github.com/logue/vue-codemirror6)

## Features

- [💚 **Vue 2.7 と Vue 3 に対応**](/ja/guide/introduction): vue-demi をベースにしているため、同じコンポーネントを Vue 2.7 と Vue 3 のどちらでも使えます。
- [🔁 **双方向バインディング**](/ja/guide/usage): 通常の入力欄と同じように v-model でテキストをバインドできます。外部からの更新時にスクロール位置を保つこともできます。
- [🎨 **言語・リンター・テーマ**](/ja/guide/languages-and-themes): CodeMirror の LanguageSupport、LintSource、テーマを props で渡せます。任意の拡張機能も追加できます。
- [🌐 **SSR 対応**](/ja/guide/ssr): CodeMirror はクライアント側でのみ初期化されるため、Nuxt などの SSR フレームワークでも安全にレンダリングできます。
- [🧩 **Web Component**](/ja/guide/web-components): 同じコンポーネントをカスタム要素としても書き出しているので、Vue 以外の環境でも使えます(実験的機能)。
- [🛠️ **エディタ API**](/ja/api/instance): テンプレート ref から EditorView や選択範囲、CodeMirror 5 互換のヘルパーメソッドにアクセスできます。

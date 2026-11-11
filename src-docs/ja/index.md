---
description: vue-codemirror6 は Vue 2.7 / Vue 3 で使える CodeMirror 6 エディタコンポーネントです。v-model、リンター、SSR に対応しています。
pageType: home

hero:
  name: vue-codemirror6
  text: Vue で使う CodeMirror 6
  tagline: CodeMirror 6 エディタを Vue 2.7 と Vue 3 で使えるようにする軽量なラッパーコンポーネント
  actions:
    - theme: brand
      text: はじめる
      link: /ja/guide/getting-started
    - theme: alt
      text: Playground
      link: /ja/playground
    - theme: alt
      text: GitHub
      link: https://github.com/logue/vue-codemirror6
  image:
    src: https://user-images.githubusercontent.com/480173/224358008-6ffad05d-1d97-4c18-8554-7d41b03f88ab.png
    alt: vue-codemirror6 のロゴ
features:
  - title: Vue 2.7 と Vue 3 に対応
    details: vue-demi をベースにしているため、同じコンポーネントを Vue 2.7 と Vue 3 のどちらでも使えます。
    icon: 💚
    link: /ja/guide/introduction
  - title: 双方向バインディング
    details: 通常の入力欄と同じように v-model でテキストをバインドできます。外部からの更新時にスクロール位置を保つこともできます。
    icon: 🔁
    link: /ja/guide/usage
  - title: 言語・リンター・テーマ
    details: CodeMirror の LanguageSupport、LintSource、テーマを props で渡せます。任意の拡張機能も追加できます。
    icon: 🎨
    link: /ja/guide/languages-and-themes
  - title: SSR 対応
    details: CodeMirror はクライアント側でのみ初期化されるため、Nuxt などの SSR フレームワークでも安全にレンダリングできます。
    icon: 🌐
    link: /ja/guide/ssr
  - title: Web Component
    details: 同じコンポーネントをカスタム要素としても書き出しているので、Vue 以外の環境でも使えます。
    icon: 🧩
    link: /ja/guide/web-components
  - title: エディタ API
    details: テンプレート ref から EditorView や選択範囲、CodeMirror 5 互換のヘルパーメソッドにアクセスできます。
    icon: 🛠️
    link: /ja/api/instance
---

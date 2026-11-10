> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# はじめに

**vue-codemirror6** は、[CodeMirror 6](https://codemirror.net/6/) を Vue で使うためのコンポーネントです。[vue-demi](https://github.com/vueuse/vue-demi) をベースにしているため、同じコンポーネントが Vue 2.7 と Vue 3 の両方で動作します。

CodeMirror 6 はモジュール構成のコードエディタです。このコンポーネントは CodeMirror のすべての概念をそのまま公開するのではなく、よく使う設定を props にまとめ、それ以外は `extensions` やエディタのインスタンスから利用できるようにしています。

## 機能

- テキストの **`v-model` バインディング**
- **よく使う設定を props で指定**:`basic` / `minimal` セットアップ、折り返し、Tab キーでのインデント、読み取り専用・無効化、プレースホルダー、ダークモードなど
- 任意の CodeMirror パッケージを渡せる **言語・リンター・テーマの props**
- `ready`、`focus`、`update`、`change`、`destroy` の **イベント**
- [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView)、選択範囲、カーソル、リンターの診断結果、CodeMirror 5 互換のヘルパーにアクセスできる **インスタンス API**
- **SSR 対応**:エディタはクライアント側でのみ生成されます
- 同じコンポーネントの **Web Component 版**(実験的機能)

## 動作環境

| 環境         | バージョン                  |
| ---------- | ---------------------- |
| Vue        | `^2.7.14` または `^3.3.4` |
| CodeMirror | `codemirror` `^6.0.0`  |
| 出力形式       | ESM(デフォルト)と UMD ビルド    |

`@codemirror/*` パッケージ(`state`、`view`、`language`、`lint`、`commands`、`autocomplete`、`search`)は peer dependencies です。`codemirror` パッケージをインストールすると一緒に入ります。

## 次のステップ

- [はじめかた](/vue-codemirror6/ja/guide/getting-started.md) — パッケージをインストールして最初のエディタを表示します。
- [Playground](/vue-codemirror6/ja/playground.md) — ブラウザで動作を試せます。
- [Props](/vue-codemirror6/ja/api/props.md) — 指定できるオプションの一覧です。

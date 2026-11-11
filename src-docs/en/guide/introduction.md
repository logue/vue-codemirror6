---
description: What vue-codemirror6 is, which Vue versions it supports, and what it provides on top of CodeMirror 6.
---

# Introduction

**vue-codemirror6** is a component for using [CodeMirror 6](https://codemirror.net/6/) in Vue. It is built on [vue-demi](https://github.com/vueuse/vue-demi), so the same component works in both Vue 2.7 and Vue 3.

CodeMirror 6 is a modular code editor. Instead of exposing every CodeMirror concept directly, this component turns the most common settings into props and keeps the rest available through `extensions` and the editor instance.

## Features

- **`v-model` binding** for the document text.
- **Common settings as props**: `basic` / `minimal` setup, line wrapping, tab indentation, read-only and disabled modes, placeholder, dark mode, and more.
- **Language, linter, and theme props** that accept any CodeMirror package.
- **Events** for `ready`, `focus`, `update`, `change`, and `destroy`.
- **Instance API** to access the [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView), selection, cursor, lint diagnostics, and CodeMirror 5 style helpers.
- **SSR compatibility**: the editor is only created on the client.
- **Web Component build** of the same component.

## Supported environments

| Environment | Version                     |
| ----------- | --------------------------- |
| Vue         | `^2.7.14` or `^3.3.4`       |
| CodeMirror  | `codemirror` `^6.0.0`       |
| Output      | ESM (default) and UMD build |

The `@codemirror/*` packages (`state`, `view`, `language`, `lint`, `commands`, `autocomplete`, `search`) are peer dependencies. They are installed together with the `codemirror` package.

## Next steps

- [Getting Started](./getting-started) — install the package and render your first editor.
- [Playground](../playground) — try the live demo.
- [Props](../api/props) — the full list of options.

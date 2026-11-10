> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# vue-codemirror6

CodeMirror 6 for Vue

> A lightweight wrapper component that brings the CodeMirror 6 editor to Vue 2.7 and Vue 3.

[Get Started](/guide/getting-started) | [Playground](/playground) | [GitHub](https://github.com/logue/vue-codemirror6)

## Features

- [💚 **Vue 2.7 & Vue 3**](/guide/introduction): Built on vue-demi, so the same component works in both Vue 2.7 and Vue 3 projects.
- [🔁 **Two-way binding**](/guide/usage): Bind the document with v-model just like a native input. External updates can keep the scroll position.
- [🎨 **Languages, linters, and themes**](/guide/languages-and-themes): Pass any CodeMirror LanguageSupport, LintSource, or theme through props, or add raw extensions.
- [🌐 **SSR ready**](/guide/ssr): CodeMirror is only initialized on the client, so the component renders safely in Nuxt and other SSR frameworks.
- [🧩 **Web Component**](/guide/web-components): The same component is also exported as a custom element for use outside Vue (experimental).
- [🛠️ **Full editor API**](/api/instance): Access the EditorView, selection, and CodeMirror 5 style helper methods through a template ref.

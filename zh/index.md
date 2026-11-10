> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# vue-codemirror6

在 Vue 中使用 CodeMirror 6

> 一个轻量的封装组件,让 CodeMirror 6 编辑器可以在 Vue 2.7 和 Vue 3 中使用。

[快速开始](/zh/guide/getting-started) | [演练场](/zh/playground) | [GitHub](https://github.com/logue/vue-codemirror6)

## Features

- [💚 **支持 Vue 2.7 和 Vue 3**](/zh/guide/introduction): 基于 vue-demi 构建,同一个组件可以在 Vue 2.7 和 Vue 3 项目中使用。
- [🔁 **双向绑定**](/zh/guide/usage): 像原生输入框一样使用 v-model 绑定文本。外部更新时还可以保持滚动位置。
- [🎨 **语言、代码检查与主题**](/zh/guide/languages-and-themes): 通过 props 传入 CodeMirror 的 LanguageSupport、LintSource 或主题,也可以添加任意扩展。
- [🌐 **支持 SSR**](/zh/guide/ssr): CodeMirror 只在客户端初始化,因此可以在 Nuxt 等 SSR 框架中安全渲染。
- [🧩 **Web Component**](/zh/guide/web-components): 同一组件也以自定义元素的形式导出,可以在 Vue 之外使用(实验性)。
- [🛠️ **完整的编辑器 API**](/zh/api/instance): 通过模板 ref 访问 EditorView、选区以及兼容 CodeMirror 5 的辅助方法。

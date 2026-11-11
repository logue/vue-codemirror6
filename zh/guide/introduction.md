> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# 简介

**vue-codemirror6** 是一个在 Vue 中使用 [CodeMirror 6](https://codemirror.net/6/) 的组件。它基于 [vue-demi](https://github.com/vueuse/vue-demi) 构建,因此同一个组件可以同时在 Vue 2.7 和 Vue 3 中运行。

CodeMirror 6 是一个模块化的代码编辑器。本组件没有直接暴露 CodeMirror 的所有概念,而是把最常用的设置整理成 props,其余功能仍可通过 `extensions` 和编辑器实例使用。

## 功能

- 文本的 **`v-model` 绑定**
- **常用设置即 props**:`basic` / `minimal` 预设、自动换行、Tab 缩进、只读与禁用模式、占位文本、深色模式等
- 可传入任意 CodeMirror 包的 **语言、代码检查和主题 props**
- `ready`、`focus`、`update`、`change`、`destroy` **事件**
- 可访问 [`EditorView`](https://codemirror.net/docs/ref/#view.EditorView)、选区、光标、代码检查结果以及兼容 CodeMirror 5 的辅助方法的 **实例 API**
- **SSR 兼容**:编辑器只在客户端创建
- 同一组件的 **Web Component 版本**

## 运行环境

| 环境         | 版本                    |
| ---------- | --------------------- |
| Vue        | `^2.7.14` 或 `^3.3.4`  |
| CodeMirror | `codemirror` `^6.0.0` |
| 输出格式       | ESM(默认)和 UMD 构建       |

`@codemirror/*` 系列包(`state`、`view`、`language`、`lint`、`commands`、`autocomplete`、`search`)是 peer dependencies,安装 `codemirror` 包时会一并安装。

## 下一步

- [快速开始](/vue-codemirror6/zh/guide/getting-started.md) — 安装并渲染第一个编辑器。
- [演练场](/vue-codemirror6/zh/playground.md) — 在线体验演示。
- [Props](/vue-codemirror6/zh/api/props.md) — 所有选项的列表。

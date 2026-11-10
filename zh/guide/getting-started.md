> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# 快速开始

## 安装

将组件与 `codemirror` 一起安装:

```sh
pnpm add vue-codemirror6 codemirror
```

语言支持、代码检查和主题都是独立的包,请按需安装,例如:

```sh
pnpm add @codemirror/lang-javascript
```

## 最简示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('Cozy lummox gives smart squid who asks for job pen.');
</script>

<template>
  <code-mirror v-model="value" />
</template>
```

这样会渲染一个没有行号和快捷键的简单编辑器。添加 `basic` 即可启用 CodeMirror 的 [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup)(行号、撤销历史、括号匹配、搜索等):

```vue
<template>
  <code-mirror v-model="value" basic />
</template>
```

:::tip
使用 `minimal` 代替 `basic` 可启用 [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup)。两者同时指定时以 `basic` 为准。
:::

## 添加语言

向 `lang` 传入 `LanguageSupport` 对象即可启用语法高亮:

```vue
<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('console.log("Hello, World!");');
const lang = javascript();
</script>

<template>
  <code-mirror v-model="value" basic :lang="lang" />
</template>
```

## 全局注册

包中导出的 `install` 函数会将组件注册为 `CodeMirror`:

```ts
import { createApp } from 'vue';
import { install as CodeMirror } from 'vue-codemirror6';

import App from './App.vue';

createApp(App).use(CodeMirror).mount('#app');
```

注册后,无需导入即可在任意模板中使用 `<code-mirror>`。

## 包的导出

| 导出                    | 说明                             |
| --------------------- | ------------------------------ |
| `default`             | Vue 组件                         |
| `install`             | 全局注册组件的 Vue 插件函数               |
| `CodeMirror`          | 用 `defineCustomElement` 包装后的组件 |
| `CodeMirrorExposed`   | 通过模板 ref 访问的实例 API 类型          |
| `Meta`                | 包的版本号和构建日期                     |
| `vue-codemirror6/umd` | 用于 `<script>` 标签加载的 UMD 构建     |

## 下一步

- [基本用法](/vue-codemirror6/zh/guide/usage.md) — `v-model`、插槽、只读模式和快捷键
- [语言、代码检查与主题](/vue-codemirror6/zh/guide/languages-and-themes.md)

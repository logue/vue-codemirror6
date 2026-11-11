---
description: 安装 vue-codemirror6、渲染最简单的编辑器,以及全局注册组件。
---

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
<script lang="ts" setup vapor>
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
<script lang="ts" setup vapor>
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

| 导出                                                                           | 说明                                                                                             |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `default`                                                                      | Vue 组件                                                                                         |
| `install`                                                                      | 全局注册组件的 Vue 插件函数                                                                      |
| `CodeMirrorExposed`                                                            | 通过模板 ref 访问的实例 API 类型                                                                 |
| `Meta`                                                                         | 包的版本号和构建日期                                                                             |
| `vue-codemirror6/wc`                                                           | 用 `defineCustomElement` 包装后的组件以及 `register()`。请参阅 [Web Component](./web-components) |
| `vue-codemirror6/wc-auto`                                                      | 与 `vue-codemirror6/wc` 相同,但导入时会注册 `<code-mirror>`                                      |
| `vue-codemirror6/umd`、`vue-codemirror6/wc/umd`、`vue-codemirror6/wc-auto/umd` | 用于 CommonJS / AMD 加载器的 UMD 构建                                                            |

## 通过 CDN(jsDelivr)使用

vue-codemirror6 1.8.0 或更高版本无需打包工具即可使用(仅支持 Vue 3)。通过 [import map](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script/type/importmap) 从 jsDelivr 加载 ESM 文件,并在应用中注册组件:

```html
<script type="importmap">
  {
    "imports": {
      "vue-codemirror6": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/index.es.js",
      "vue": "https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.prod.js",
      "vue-demi": "https://cdn.jsdelivr.net/npm/vue-demi@0.14/lib/v3/index.mjs",
      "codemirror": "https://cdn.jsdelivr.net/npm/codemirror@6/dist/index.js",
      "@codemirror/autocomplete": "https://cdn.jsdelivr.net/npm/@codemirror/autocomplete@6/dist/index.js",
      "@codemirror/commands": "https://cdn.jsdelivr.net/npm/@codemirror/commands@6/dist/index.js",
      "@codemirror/language": "https://cdn.jsdelivr.net/npm/@codemirror/language@6/dist/index.js",
      "@codemirror/lint": "https://cdn.jsdelivr.net/npm/@codemirror/lint@6/dist/index.js",
      "@codemirror/search": "https://cdn.jsdelivr.net/npm/@codemirror/search@6/dist/index.js",
      "@codemirror/state": "https://cdn.jsdelivr.net/npm/@codemirror/state@6/dist/index.js",
      "@codemirror/streamparser": "https://cdn.jsdelivr.net/npm/@codemirror/streamparser@6/dist/index.js",
      "@codemirror/view": "https://cdn.jsdelivr.net/npm/@codemirror/view@6/dist/index.js",
      "@lezer/common": "https://cdn.jsdelivr.net/npm/@lezer/common@1/dist/index.js",
      "@lezer/highlight": "https://cdn.jsdelivr.net/npm/@lezer/highlight@1/dist/index.js",
      "@lezer/lr": "https://cdn.jsdelivr.net/npm/@lezer/lr@1/dist/index.js",
      "@marijn/find-cluster-break": "https://cdn.jsdelivr.net/npm/@marijn/find-cluster-break@1/src/index.js",
      "crelt": "https://cdn.jsdelivr.net/npm/crelt@1/index.js",
      "style-mod": "https://cdn.jsdelivr.net/npm/style-mod@4/src/style-mod.js",
      "w3c-keyname": "https://cdn.jsdelivr.net/npm/w3c-keyname@2/index.js",

      "@codemirror/lang-javascript": "https://cdn.jsdelivr.net/npm/@codemirror/lang-javascript@6/dist/index.js",
      "@lezer/javascript": "https://cdn.jsdelivr.net/npm/@lezer/javascript@1/dist/index.js"
    }
  }
</script>

<div id="app">
  <code-mirror v-model="value" basic :lang="lang"></code-mirror>
</div>

<script type="module">
  import { createApp, ref } from 'vue';
  import CodeMirror from 'vue-codemirror6';
  import { javascript } from '@codemirror/lang-javascript';

  createApp({
    components: { CodeMirror },
    setup() {
      const value = ref('console.log("Hello, CodeMirror!");');
      const lang = javascript();
      return { value, lang };
    }
  }).mount('#app');
</script>
```

:::warning 每个依赖只加载一次
如果加载了两份 `@codemirror/state`(或其他 `@codemirror/*` 包),CodeMirror 将无法工作;如果加载了两份 Vue,响应式系统将会失效。请像上面的示例那样把每个包映射到唯一的 URL,并且不要使用 jsDelivr 的 `/+esm` URL:它会为每个包分别固定依赖版本,容易导致重复加载。
:::

- `vue.esm-browser.prod.js` 包含模板编译器,因此可以使用上面示例中的 DOM 内模板。
- import map 的最后两项用于 `@codemirror/lang-javascript`。请以同样的方式添加你使用的语言包及其 `@lezer/*` 解析器包。
- 如需在不使用 Vue 应用的情况下作为自定义元素使用,请参阅 [Web Component](./web-components#通过-cdnjsdelivr使用)。

## 下一步

- [基本用法](./usage) — `v-model`、插槽、只读模式和快捷键
- [语言、代码检查与主题](./languages-and-themes)

---
description: 在 Vue 模板之外,将 vue-codemirror6 作为原生自定义元素使用(实验性)。
---

# Web Component

:::warning 实验性功能
Web Component 版本仍处于实验阶段,行为可能会发生变化。
:::

本包还导出了用 Vue 的 [`defineCustomElement`](https://cn.vuejs.org/guide/extras/web-components.html) 包装的组件。可以用任意标签名注册:

```ts
import { CodeMirror } from 'vue-codemirror6';

customElements.define('code-mirror', CodeMirror);
```

```html
<code-mirror></code-mirror>
```

编辑器渲染在一个 open 模式的 Shadow Root 中。

## 设置 props

- **基本类型的 props**(`string`、`boolean`、`number`)可以通过属性(attribute)或 DOM 属性(property)设置。
- **对象、数组和函数类型的 props**(`lang`、`linter`、`extensions`、`theme`、`keymap` 等)只能通过 DOM 属性设置。

在元素插入文档之前设置属性,即可在首次渲染时生效:

```ts
import { javascript } from '@codemirror/lang-javascript';

const element = document.createElement('code-mirror');
element.setAttribute('readonly', '');
element.modelValue = 'const x = 1;';
element.lang = javascript();

document.body.append(element);
```

## 事件

Vue 的 emit 会以原生 `CustomEvent` 的形式派发,emit 的参数以数组形式放在 `event.detail` 中。

```ts
element.addEventListener('ready', event => {
  const [{ view }] = (event as CustomEvent).detail;
  console.log(view);
});

element.addEventListener('update:model-value', event => {
  const [value] = (event as CustomEvent).detail;
  console.log(value);
});
```

## 实例 API

[实例 API](../api/instance) 直接暴露在元素上:

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

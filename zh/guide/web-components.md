> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# Web Component

:::warning 实验性功能
Web Component 版本仍处于实验阶段,行为可能会发生变化。
:::

Web Component 版本作为独立的入口 `vue-codemirror6/wc` 提供(仅支持 Vue 3),它使用 Vue 的 [`defineCustomElement`](https://cn.vuejs.org/guide/extras/web-components.html) 包装组件。导入后会自动注册 `<code-mirror>`:

```ts
import 'vue-codemirror6/wc';
```

```html
<code-mirror></code-mirror>
```

如需使用其他标签名,请调用 `register()`。由于同一个构造函数在一个注册表中只能定义一次,额外的标签名会以子类的形式注册:

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

:::warning 额外标签名的类型定义
只有 `code-mirror` 会被添加到 `HTMLElementTagNameMap`。通过 `register('my-editor')` 注册的标签没有元素类型,请自行声明:

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

在 Vue 模板中使用时,请通过 `compilerOptions.isCustomElement`(例如 `tag => tag === 'code-mirror'`)将其标记为自定义元素。

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

[实例 API](/vue-codemirror6/zh/api/instance.md) 直接暴露在元素上:

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

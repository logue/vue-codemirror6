> For AI agents: the complete documentation index is available at /vue-codemirror6/zh/llms.txt, the full documentation bundle is available at /vue-codemirror6/zh/llms-full.txt.

# Web Component

同一组件也以原生自定义元素的形式提供,它使用 Vue 的 [`defineCustomElement`](https://cn.vuejs.org/api/custom-elements.html#definecustomelement) 包装(仅支持 Vue 3)。关于 Vue 自定义元素的行为,请参阅 Vue 文档中的 [Vue 与 Web Components](https://cn.vuejs.org/guide/extras/web-components.html)。

共有两个入口:

| 入口                        | 注册的标签                | `HTMLElementTagNameMap` 类型 |
| ------------------------- | -------------------- | -------------------------- |
| `vue-codemirror6/wc-auto` | `<code-mirror>`(自动)  | 包含                         |
| `vue-codemirror6/wc`      | 仅传给 `register()` 的标签 | 不包含                        |

## 自动注册

导入 `vue-codemirror6/wc-auto` 即可注册 `<code-mirror>`:

```ts
import 'vue-codemirror6/wc-auto';
```

```html
<code-mirror></code-mirror>
```

## 使用自定义标签名注册

导入 `vue-codemirror6/wc`,并将想要的标签名传给 `register()`:

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

也可以使用默认导出自行注册:

```ts
import CodeMirrorElement from 'vue-codemirror6/wc';

customElements.define('my-editor', CodeMirrorElement);
```

:::warning 每个页面只能注册一个标签名
同一个构造函数在一个自定义元素注册表中只能定义一次。请只注册一个标签名,并且不要在同一页面中同时使用 `vue-codemirror6/wc` 和 `vue-codemirror6/wc-auto`;注册第二个标签名会抛出 `NotSupportedError`。
:::

:::warning 类型定义
`vue-codemirror6/wc` 不会向 `HTMLElementTagNameMap` 添加任何内容,请自行声明标签的类型:

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

## 通过 CDN(jsDelivr)使用

两个入口都可以通过 [import map](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/script/type/importmap) 从 jsDelivr 加载 ESM 文件,无需打包工具即可使用(需要 1.8.0 或更高版本):

```html
<script type="importmap">
  {
    "imports": {
      "vue-codemirror6/wc-auto": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc-auto.es.js",
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

<code-mirror></code-mirror>

<script type="module">
  import 'vue-codemirror6/wc-auto';
  import { javascript } from '@codemirror/lang-javascript';

  const editor = document.querySelector('code-mirror');
  editor.basic = true;
  editor.lang = javascript();
  editor.modelValue = 'console.log("Hello, CodeMirror!");';
</script>
```

:::warning 每个依赖只加载一次
如果加载了两份 `@codemirror/state`(或其他 `@codemirror/*` 包),CodeMirror 将无法工作;如果加载了两份 Vue,元素将无法工作。请像上面的示例那样把每个包映射到唯一的 URL,并且不要使用 jsDelivr 的 `/+esm` URL:它会为每个包分别固定依赖版本,容易导致重复加载。
:::

- 最后两项用于 `@codemirror/lang-javascript`。请以同样的方式添加你使用的语言包及其 `@lezer/*` 解析器包。
- 如需使用自定义标签名,请改为映射 `"vue-codemirror6/wc": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc.es.js"` 并调用 `register()`。
- `*.umd.js` 构建(`vue-codemirror6/umd`、`vue-codemirror6/wc/umd`、`vue-codemirror6/wc-auto/umd`)用于 CommonJS / AMD 加载器,无法通过普通的 `<script>` 标签加载。

## 补充说明

- 在 Vue 模板中使用时,请通过 `compilerOptions.isCustomElement`(例如 `tag => tag === 'code-mirror'`)将其标记为自定义元素。
- 编辑器渲染在一个 open 模式的 Shadow Root 中。
- 以下示例使用 `<code-mirror>`;使用 `vue-codemirror6/wc` 时,请替换为你注册的标签名。

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

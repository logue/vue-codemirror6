> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# Web Component

The same component is also available as a native custom element, wrapped with Vue's [`defineCustomElement`](https://vuejs.org/api/custom-elements.html#definecustomelement) (Vue 3 only). See [Vue and Web Components](https://vuejs.org/guide/extras/web-components.html) in the Vue documentation for how Vue custom elements behave.

There are two entry points:

| Entry point               | Registers a tag                       | Element type for `HTMLElementTagNameMap` |
| ------------------------- | ------------------------------------- | ---------------------------------------- |
| `vue-codemirror6/wc-auto` | `<code-mirror>`, automatically        | Included                                 |
| `vue-codemirror6/wc`      | Only the tag you pass to `register()` | Not included                             |

## Automatic registration

Importing `vue-codemirror6/wc-auto` registers `<code-mirror>`:

```ts
import 'vue-codemirror6/wc-auto';
```

```html
<code-mirror></code-mirror>
```

## Registering your own tag name

Import `vue-codemirror6/wc` and call `register()` with the tag name you want:

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

You can also define it yourself with the default export:

```ts
import CodeMirrorElement from 'vue-codemirror6/wc';

customElements.define('my-editor', CodeMirrorElement);
```

:::warning One tag name per page
A constructor can only be defined once per custom element registry. Register a single tag name, and do not combine `vue-codemirror6/wc` with `vue-codemirror6/wc-auto` on the same page; defining a second tag name throws `NotSupportedError`.
:::

:::warning Type definitions
`vue-codemirror6/wc` does not add anything to `HTMLElementTagNameMap`, so declare the type of your tag yourself:

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

## Using from a CDN (jsDelivr)

Both entries can be used without a bundler by loading the ESM files from jsDelivr through an [import map](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/script/type/importmap) (version 1.8.0 or later):

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

:::warning Load each dependency only once
CodeMirror stops working when two copies of `@codemirror/state` (or other `@codemirror/*` packages) are loaded, and the element stops working when two copies of Vue are loaded. Map every package to a single URL as above, and do not use jsDelivr's `/+esm` URLs: they pin dependency versions independently for each package, which easily leads to duplicates.
:::

- The last two entries are for `@codemirror/lang-javascript`. Add the language packages you use, together with their `@lezer/*` parser packages, the same way.
- To use your own tag name, map `"vue-codemirror6/wc": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc.es.js"` instead and call `register()`.
- The `*.umd.js` builds (`vue-codemirror6/umd`, `vue-codemirror6/wc/umd`, `vue-codemirror6/wc-auto/umd`) are for CommonJS / AMD loaders and cannot be loaded with a plain `<script>` tag.

## Notes

- When using the element inside Vue templates, mark it as a custom element with `compilerOptions.isCustomElement` (e.g. `tag => tag === 'code-mirror'`).
- The editor is rendered inside an open shadow root.
- The examples below use `<code-mirror>`; replace it with your own tag name when using `vue-codemirror6/wc`.

## Setting props

- **Primitive props** (`string`, `boolean`, `number`) can be set as attributes or as DOM properties.
- **Object, array, and function props** (`lang`, `linter`, `extensions`, `theme`, `keymap`, …) can only be set as DOM properties.

Set properties before the element is connected to apply them on the first render:

```ts
import { javascript } from '@codemirror/lang-javascript';

const element = document.createElement('code-mirror');
element.setAttribute('readonly', '');
element.modelValue = 'const x = 1;';
element.lang = javascript();

document.body.append(element);
```

## Events

Vue emits are dispatched as native `CustomEvent`s. The emitted arguments are available as an array in `event.detail`.

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

## Instance API

The [instance API](/vue-codemirror6/api/instance.md) is exposed directly on the element:

```ts
import type { CodeMirrorExposed } from 'vue-codemirror6';

const editor = element as unknown as CodeMirrorExposed;
editor.replaceRange('bye', 0, 5);
console.log(editor.view?.state.doc.toString());
```

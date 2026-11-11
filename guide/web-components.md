> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# Web Component

:::warning Experimental
The Web Component build is experimental and its behavior may change.
:::

The Web Component build is shipped as a separate entry point, `vue-codemirror6/wc` (Vue 3 only). It wraps the component with Vue's [`defineCustomElement`](https://vuejs.org/guide/extras/web-components.html). Importing it registers `<code-mirror>` automatically:

```ts
import 'vue-codemirror6/wc';
```

```html
<code-mirror></code-mirror>
```

To use an additional tag name, call `register()`. Each extra tag name is registered with a subclass, because a constructor can only be defined once per registry:

```ts
import { register } from 'vue-codemirror6/wc';

register('my-editor');
```

:::warning Type definitions for additional tag names
Only `code-mirror` is added to `HTMLElementTagNameMap`. Tags registered with `register('my-editor')` get no element type, so declare it yourself:

```ts
import type CodeMirrorElement from 'vue-codemirror6/wc';

declare global {
  interface HTMLElementTagNameMap {
    'my-editor': InstanceType<typeof CodeMirrorElement>;
  }
}
```

:::

When using the element inside Vue templates, mark it as a custom element with `compilerOptions.isCustomElement` (e.g. `tag => tag === 'code-mirror'`).

The editor is rendered inside an open shadow root.

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

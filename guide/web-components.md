> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

# Web Component

:::warning Experimental
The Web Component build is experimental and its behavior may change.
:::

The package also exports the component wrapped with Vue's [`defineCustomElement`](https://vuejs.org/guide/extras/web-components.html). Register it under any tag name:

```ts
import { CodeMirror } from 'vue-codemirror6';

customElements.define('code-mirror', CodeMirror);
```

```html
<code-mirror></code-mirror>
```

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

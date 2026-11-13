---
description: Install vue-codemirror6, render a minimal editor, and register the component globally.
---

# Getting Started

## Installation

Install the component together with `codemirror`:

```sh
pnpm add vue-codemirror6 codemirror
```

Language support, linters, and themes are separate packages. Install the ones you need, for example:

```sh
pnpm add @codemirror/lang-javascript
```

## Minimal example

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

This renders a plain editor without line numbers or key bindings. Add the `basic` prop to enable CodeMirror's [`basicSetup`](https://codemirror.net/docs/ref/#codemirror.basicSetup) (line numbers, history, bracket matching, search, and more):

```vue
<template>
  <code-mirror v-model="value" basic />
</template>
```

:::tip
Use `minimal` instead of `basic` for [`minimalSetup`](https://codemirror.net/docs/ref/#codemirror.minimalSetup). If both are set, `basic` takes precedence.
:::

## Adding a language

Pass a `LanguageSupport` object to the `lang` prop to enable syntax highlighting:

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

## Global registration

The package exports an `install` function that registers the component as `CodeMirror`:

```ts
import { createApp } from 'vue';
import { install as CodeMirror } from 'vue-codemirror6';

import App from './App.vue';

createApp(App).use(CodeMirror).mount('#app');
```

After that, `<code-mirror>` can be used in any template without importing it.

## Package exports

| Export                                                                         | Description                                                                                                 |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `default`                                                                      | The Vue component.                                                                                          |
| `install`                                                                      | Vue plugin function that registers the component globally.                                                  |
| `CodeMirrorExposed`                                                            | Type of the instance API exposed through a template ref.                                                    |
| `Meta`                                                                         | Package version and build date.                                                                             |
| `vue-codemirror6/wc`                                                           | The component wrapped with `defineCustomElement`, plus `register()`. See [Web Component](./web-components). |
| `vue-codemirror6/wc-auto`                                                      | Same as `vue-codemirror6/wc`, but registers `<code-mirror>` on import.                                      |
| `vue-codemirror6/umd`, `vue-codemirror6/wc/umd`, `vue-codemirror6/wc-auto/umd` | UMD builds for CommonJS / AMD loaders.                                                                      |

## Using from a CDN (jsDelivr)

vue-codemirror6 1.8.0 or later can be used without a bundler (Vue 3 only). Load the ESM files from jsDelivr through an [import map](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/script/type/importmap), and register the component in your app:

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

:::warning Load each dependency only once
CodeMirror stops working when two copies of `@codemirror/state` (or other `@codemirror/*` packages) are loaded, and Vue's reactivity breaks when two copies of Vue are loaded. Map every package to a single URL as above, and do not use jsDelivr's `/+esm` URLs: they pin dependency versions independently for each package, which easily leads to duplicates.
:::

- `vue.esm-browser.prod.js` includes the template compiler, so in-DOM templates like the one above work.
- The last two entries of the import map are for `@codemirror/lang-javascript`. Add the language packages you use, together with their `@lezer/*` parser packages, the same way.
- To use the editor as a custom element without a Vue app, see [Web Component](./web-components#using-from-a-cdn-jsdelivr).

## Next steps

- [Usage](./usage) — `v-model`, slots, read-only mode, and key bindings.
- [Languages, Linters & Themes](./languages-and-themes)

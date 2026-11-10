> For AI agents: the complete documentation index is available at /vue-codemirror6/llms.txt, the full documentation bundle is available at /vue-codemirror6/llms-full.txt.

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
<script setup lang="ts">
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

| Export                | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `default`             | The Vue component.                                         |
| `install`             | Vue plugin function that registers the component globally. |
| `CodeMirror`          | The component wrapped with `defineCustomElement`.          |
| `CodeMirrorExposed`   | Type of the instance API exposed through a template ref.   |
| `Meta`                | Package version and build date.                            |
| `vue-codemirror6/umd` | UMD build for loading with a `<script>` tag.               |

## Next steps

- [Usage](/vue-codemirror6/guide/usage.md) — `v-model`, slots, read-only mode, and key bindings.
- [Languages, Linters & Themes](/vue-codemirror6/guide/languages-and-themes.md)

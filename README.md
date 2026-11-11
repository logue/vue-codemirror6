# vue-codemirror6

<p align="center">
  <img src="https://user-images.githubusercontent.com/480173/224358008-6ffad05d-1d97-4c18-8554-7d41b03f88ab.png" alt="logo" width="300" height="300" />
</p>

[![npm version](https://img.shields.io/npm/v/vue-codemirror6.svg)](https://www.npmjs.com/package/vue-codemirror6)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-codemirror6.svg?style=flat)](https://www.npmjs.com/package/vue-codemirror6)
[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/vue-codemirror6/badge)](https://www.jsdelivr.com/package/npm/vue-codemirror6)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@logue/vue-codemirror6/file/README.md)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/vue-codemirror6)
[![X Follow](https://img.shields.io/twitter/follow/logue256?style=plastic)](https://x.com/logue256)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/logue?label=Sponsor&logo=github&color=ea4aaa)](https://github.com/sponsors/logue)

A component for using [CodeMirror 6](https://codemirror.net/6/) with Vue. Works with both Vue 2.7 and Vue 3.

**📖 Documentation: <https://logue.dev/vue-codemirror6/>**
([English](https://logue.dev/vue-codemirror6/) | [日本語](https://logue.dev/vue-codemirror6/ja/) | [简体中文](https://logue.dev/vue-codemirror6/zh/))

## Installation

```sh
pnpm add vue-codemirror6 codemirror
```

For Vue 2.7 or below, [@vue/composition-api](https://www.npmjs.com/package/@vue/composition-api) is also required.

## Quick Start

```vue
<script lang="ts" setup vapor>
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('Hello, CodeMirror!');
</script>

<template>
  <code-mirror v-model="value" basic />
</template>
```

Props, events, languages, themes, SSR, Web Component usage and more are covered in the [documentation](https://logue.dev/vue-codemirror6/).

## Using from a CDN (jsDelivr)

vue-codemirror6 1.8.0 or later can be used without a bundler (Vue 3 only). Load the ESM files from jsDelivr through an [import map](https://developer.mozilla.org/docs/Web/HTML/Reference/Elements/script/type/importmap):

```html
<script type="importmap">
  {
    "imports": {
      "vue-codemirror6": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/index.es.js",
      "vue-codemirror6/wc": "https://cdn.jsdelivr.net/npm/vue-codemirror6@1/dist/wc.es.js",
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
```

- Map every package to **one** URL, as above. Loading two copies of `@codemirror/state` (or Vue) breaks the editor, so avoid jsDelivr's `/+esm` URLs here; they pin dependency versions independently per package.
- The last two entries are for `@codemirror/lang-javascript`. Add the language packages you use (and their `@lezer/*` parsers) the same way.
- You only need the `vue-codemirror6*` entries you actually import.
- The `*.umd.js` files are for CommonJS / AMD loaders and cannot be used from a plain `<script>` tag.

### As a Vue component

```html
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

`vue.esm-browser.prod.js` includes the template compiler, so in-DOM templates like the one above work.

### As a Web Component

```html
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

To register a different tag name, import `register` from `vue-codemirror6/wc` and call `register('my-editor')`.

See the [documentation](https://logue.dev/vue-codemirror6/guide/getting-started#using-from-a-cdn-jsdelivr) for details.

## Links

- [Documentation](https://logue.dev/vue-codemirror6/)
- [Demo](https://logue.dev/vue-codemirror6/demo/)
- [CHANGELOG](./CHANGELOG.md)

## License

©2022-2026 by Logue.
Licensed under the [MIT License](LICENSE).

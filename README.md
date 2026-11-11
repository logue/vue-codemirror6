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
<script setup lang="ts">
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

const value = ref('Hello, CodeMirror!');
</script>

<template>
  <code-mirror v-model="value" basic />
</template>
```

Props, events, languages, themes, SSR, Web Component usage and more are covered in the [documentation](https://logue.dev/vue-codemirror6/).

## Links

- [Documentation](https://logue.dev/vue-codemirror6/)
- [Playground](https://logue.dev/vue-codemirror6/playground)
- [CHANGELOG](./CHANGELOG.md)

## License

©2022-2026 by Logue.
Licensed under the [MIT License](LICENSE).

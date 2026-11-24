<script lang="ts" setup vapor>
  import { json, jsonParseLinter } from '@codemirror/lang-json';

  import CodeMirror from 'vue-codemirror6';

  // Sync Dark mode
  defineProps<{
    dark?: boolean;
  }>();
</script>

<!-- prettier-ignore -->
<template>
  <code-mirror
    basic
    readonly
    :dark="dark"
    :lang="json()"
    :linter="jsonParseLinter()"
  >
    <pre>{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 component for Vue3"
}</pre>
  </code-mirror>
</template>

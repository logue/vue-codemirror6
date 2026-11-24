<script lang="ts" setup vapor>
  import { markdown } from '@codemirror/lang-markdown';
  import { type Ref, ref } from 'vue';

  import CodeMirror from 'vue-codemirror6';
  import VueMarkdown from 'vue-markdown-wasm';

  /** Demo text */
  const input: Ref<string> = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  // Sync dark mode
  defineProps<{
    dark?: boolean;
  }>();
</script>

<template>
  <!-- Nested in a cds-column, cds-grid becomes a subgrid: side by side from md up, stacked on sm. -->
  <cds-grid with-row-gap>
    <cds-column sm="4" md="4" lg="8">
      <code-mirror v-model="input" :dark="dark" :lang="markdown()" basic wrap />
    </cds-column>
    <cds-column sm="4" md="4" lg="8">
      <vue-markdown v-model="input" class="markdown-body" />
    </cds-column>
  </cds-grid>
</template>

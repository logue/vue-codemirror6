<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { markdown } from '@codemirror/lang-markdown';
// eslint-disable-next-line import-x/no-unresolved -- This is a demo component, and the CodeMirror component is only used here for demonstration purposes. It is not intended to be imported in other components.
import CodeMirror from 'vue-codemirror6';
import VueMarkdown from 'vue-markdown-wasm';

/** Demo text */
const input: Ref<string> = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

// Sync dark mode
defineProps<{ dark?: boolean }>();
</script>

<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        ref="cm"
        v-model="input"
        :dark="dark"
        :lang="markdown()"
        wrap
        basic
      />
    </div>
    <div class="col-6">
      <vue-markdown
        v-model="input"
        :data-color-mode="dark ? 'dark' : 'light'"
        class="markdown-body"
      />
    </div>
  </div>
</template>

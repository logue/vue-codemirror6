<script
  lang="ts"
  setup
  vapor
>
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
  <div class="row">
    <div class="col-6">
      <code-mirror
        basic
        wrap
        ref="cm"
        v-model="input"
        :dark="dark"
        :lang="markdown()"
      />
    </div>
    <div class="col-6">
      <vue-markdown
        class="markdown-body"
        v-model="input"
        :data-color-mode="dark ? 'dark' : 'light'"
      />
    </div>
  </div>
</template>

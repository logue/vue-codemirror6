<script setup>
import { ref, watch } from 'vue';

import CodeMirror from 'vue-codemirror6';
import { ready, parse } from 'markdown-wasm';
import { markdown } from '@codemirror/lang-markdown';

const lang = markdown();

/** Demo text */
const input = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

/** Result Text */
const output = ref('');

// Realtime convert Markdown
const onReady = async () => {
  await ready;
  output.value = parse(input.value);
};

watch(input, () => onReady());

/** Get ViewUpdate */
const onViewUpdate = update => console.log(update);

defineProps({ dark: Boolean });
</script>

<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        v-model="input"
        :dark="dark"
        :lang="lang"
        wrap
        basic
        @ready="onReady"
        @update="onViewUpdate"
      />
    </div>
    <div class="col-6">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="output" />
    </div>
  </div>
  <teleport to="head">
    <component
      :is="'script'"
      src="https://cdn.jsdelivr.net/npm/markdown-wasm@1.2.0/dist/markdown.min.js"
    />
  </teleport>
</template>

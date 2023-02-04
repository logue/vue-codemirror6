<script setup>
import { ref } from 'vue';

import CodeMirror from 'vue-codemirror6';
import VueMarkdown from 'vue-markdown-wasm';
import { markdown } from '@codemirror/lang-markdown';

/** Demo text */
const input = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

// Sync dark mode
defineProps({ dark: Boolean });
</script>

<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        v-model="input"
        :dark="dark"
        :lang="markdown()"
        wrap
        basic
        @ready="onReady"
      />
    </div>
    <div class="col-6">
      <vue-markdown v-model="input" class="markdown-body" />
    </div>
  </div>
</template>

<style lang="scss">
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.min.css);

.markdown-body {
  h1 > a.anchor,
  h2 > a.anchor,
  h3 > a.anchor,
  h4 > a.anchor,
  h5 > a.anchor,
  h6 > a.anchor {
    display: block;
    float: left;
    height: 1.2em;
    width: 1em;
    margin-left: -1em;
    position: relative;
    outline: none;
  }
  /*.anchor:target { background: yellow; }*/
  h1 > a.anchor:before,
  h2 > a.anchor:before,
  h3 > a.anchor:before,
  h4 > a.anchor:before,
  h5 > a.anchor:before,
  h6 > a.anchor:before {
    visibility: hidden;
    position: absolute;
    opacity: 0.2;
    right: 0;
    top: 0;
    width: 1.2em;
    line-height: inherit;
    content: '🔗';
  }
  h1 > a.anchor:hover:before,
  h2 > a.anchor:hover:before,
  h3 > a.anchor:hover:before,
  h4 > a.anchor:hover:before,
  h5 > a.anchor:hover:before,
  h6 > a.anchor:hover:before {
    visibility: visible;
    opacity: 0.8;
  }
  h1:hover .anchor:before,
  h2:hover .anchor:before,
  h3:hover .anchor:before,
  h4:hover .anchor:before,
  h5:hover .anchor:before,
  h6:hover .anchor:before {
    visibility: visible;
  }
}
</style>

<template>
  <div id="app" class="container">
    <h1>Vue CodeMirror6 Markdown Editor Demo</h1>
    <p class="lead">* markdowm-wasm is used for HTML conversion of Markdown.</p>
    <div class="row">
      <code-mirror
        class="col"
        v-model="value"
        :lang="lang"
        :extensions="extensions"
        @update="onCmUpdate"
      />
      <div class="col p-3 m-2 bg-light text-dark" v-html="markdown" />
    </div>
  </div>
</template>

<script lang="ts">
import CodeMirror from '@/components/CodeMirror.vue';
import Vue from 'vue';

import { basicSetup } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import type { ViewUpdate } from '@codemirror/view';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
      extensions: [basicSetup],
      lang: markdown(),
      value:
        '# The quick brown fox jumps over the lazy dog.\n\n**Lorem ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      markdown: '',
    };
  },
  watch: {
    value() {
      window['markdown'].ready.then(markdown => {
        this.markdown = markdown.parse(this.value);
      });
    },
  },
  async beforeCreate() {
    // Load Bootstrap style
    const link = document.createElement('link');
    link.href =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    // Load Markdown wasm
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://cdn.jsdelivr.net/gh/rsms/markdown-wasm@v1.1.2/dist/markdown.js';
    document.body.appendChild(script);
  },

  created() {
    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      this.markdown = markdown.parse(this.value);
    });
  },

  methods: {
    /**
     * Hook codemirror view update event
     *
     * @param update view update
     */
    onCmUpdate(update: ViewUpdate) {
      console.log(update);
    },
  },
});
</script>

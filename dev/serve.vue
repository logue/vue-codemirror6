<template>
  <div id="app" class="container">
    <h1>Vue CodeMirror6 Markdown Editor Demo</h1>
    <h2>Normal Method</h2>
    <p>
      This is an example of simply pouring text into CodeMirror using
      <code>v-model</code>
      . Here, the input text is converted to Markdown in real time using
      <a href="https://github.com/rsms/markdown-wasm">markdown-wasm</a>
      .
    </p>
    <div class="row">
      <div class="col">
        <code-mirror v-model="demo" :lang="cmLang" :extensions="cmExtensions" />
      </div>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="col p-3 m-2 bg-light text-dark" v-html="markdown" />
    </div>
    <hr />
    <h2>Slot Method</h2>
    <p>
      In this sample, the text is put directly inside the
      <code>&lt;code-mirror&gt;</code>
      tag to make it the initial string. On the Vue side, it is evaluated as a
      DOM node and only the text node is used as the value.
    </p>
    <div class="row">
      <div class="col">
        <code-mirror :extensions="cmExtensions">
          How razorback-jumping frogs can level six piqued gymnasts!
        </code-mirror>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CodeMirror from '@/components/CodeMirror.vue';

import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from '@codemirror/basic-setup';
import type { ViewUpdate } from '@codemirror/view';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
      demo: '# The quick brown fox jumps over the lazy dog.\n\n[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      markdown: '',
    };
  },
  computed: {
    cmExtensions: {
      get() {
        return [basicSetup];
      },
    },
    cmLang: {
      get() {
        return markdown();
      },
    },
  },
  watch: {
    demo() {
      console.log('value changed');
      window['markdown'].ready.then(markdown => {
        this.markdown = markdown.parse(this.demo);
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
  },
  created() {
    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      this.markdown = markdown.parse(this.demo);
    });
  },

  methods: {
    /**
     * Hook codemirror view update event
     *
     * @param update - view update
     */
    onCmUpdate(update: ViewUpdate) {
      console.log(update);
    },
  },
});
</script>

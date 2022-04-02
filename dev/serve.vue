<template>
  <div id="app" class="container">
    <h1>Vue CodeMirror6 Markdown Editor Demo</h1>
    <h2>Normal Method</h2>
    <p>
      This is an example of simply pouring text into CodeMirror using
      <code>v-model</code>
      .
    </p>
    <code-mirror :extensions="extensions" :lang="markupLang" readonly>
      <pre>
&lt;template&gt;
  &lt;code-mirror
    v-model="demo"
    :lang="demoLang"
    :extensions="demoExtension"
  /&gt;
&lt;/template&gt;

&lt;script&gt;
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
      demo: `# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
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
      window['markdown'].ready.then(markdown => {
        this.markdown = markdown.parse(this.demo);
      });
    },
  },
  created() {
    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      this.markdown = markdown.parse(this.demo);
    });
  },
});
&lt;/script&gt;
</pre
      >
    </code-mirror>
    Sample:
    <div class="row">
      <div class="col">
        <code-mirror
          v-model="demo"
          :lang="demoLang"
          :extensions="extensions"
          @update="onViewUpdate"
        />
      </div>
      <div class="col">
        Here, the input text is converted to Markdown in real time using
        <a href="https://github.com/rsms/markdown-wasm">markdown-wasm</a>
        .
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="p-3 m-2 bg-light text-dark" v-html="output" />
      </div>
    </div>
    <hr />
    <h2>Slot Method</h2>
    <p>
      In this sample, the text is put directly inside the
      <code>&lt;code-mirror&gt;</code>
      tag to make it the initial string. On the Vue side, it is evaluated as a
      DOM node and only the text node is used as the value.
    </p>
    Markup:
    <code-mirror :extensions="extensions" :lang="markupLang" readonly>
      <pre>
&lt;code-mirror readonly&gt;
  How razorback-jumping frogs can level six piqued gymnasts!
&lt;/code-mirror&gt;</pre
      >
    </code-mirror>
    Sample:
    <code-mirror readonly>
      How razorback-jumping frogs can level six piqued gymnasts!
    </code-mirror>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from 'vue-demi';

import CodeMirror from '@/components/CodeMirror.vue';

import { markdown as md } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from '@codemirror/basic-setup';
import { html } from '@codemirror/lang-html';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Markdown demo */
    const demoLang = ref(md());
    /** Markdown demo source */
    const demo = ref(
      `# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    );
    /** Markdown outputs */
    const output = ref('');
    /** Default extensions */
    const extensions = [basicSetup];
    /** HTML lang */
    const markupLang = ref(html());
    /** JavaScript Lang */
    const scriptLang = ref(javascript());

    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      output.value = markdown.parse(demo.value);
    });

    // Realtime convert Markdown
    watch(demo, current => {
      // console.log('value changed', current);
      window['markdown'].ready.then(markdown => {
        output.value = markdown.parse(current);
      });
    });

    // Methods
    const onViewUpdate = update => {
      console.log(update);
    };

    return {
      demoLang,
      demo,
      output,
      extensions,
      markupLang,
      scriptLang,
      onViewUpdate,
    };
  },
});
</script>

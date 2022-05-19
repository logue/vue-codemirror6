<template>
  <div>
    <h1>Vue CodeMirror6 Markdown Editor Demo</h1>
    <p>
      A rough demo of Vue Codemirror in action. You can switch between dark
      modes from the
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-circle-half"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
      </svg>
      icon in the upper left.
    </p>
    <h2>Normal Method</h2>
    <p>
      This is an example of simply pouring text into CodeMirror using
      <code>v-model</code>
      .
    </p>
    <p>
      <code>basic</code>
      is an alias for loading
      <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank">
        basic-setup
      </a>
      .
      <br />
      Use
      <code>wrap</code>
      when you want to use columns. (Enable text wrapping)
      <br />
      The value of
      <code>@update</code>
      gets the
      <a
        href="https://codemirror.net/6/docs/ref/#view.ViewUpdate"
        target="_blank"
      >
        ViewUpdate
      </a>
      object at that time when there is any update in the target form. In this
      example, the contents are output to the console log of the browser.
    </p>
    <code-mirror :lang="cmLangHtml" readonly :dark="dark" basic>
      <pre>
&lt;template&gt;
  &lt;code-mirror
    v-model="input"
    :lang="cmLang"
    basic
    wrap
    @update="onViewUpdate"
  /&gt;
  &lt;div v-html="output" /&gt;
&lt;/template&gt;

&lt;script&gt;
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { markdown as md } from '@codemirror/lang-markdown';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Demo text */
    const input = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    /** Result Text */
    const output = ref('');

    /** CodeMirror Language */
    const cmLang = ref(md());

    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      output.value = markdown.parse(input.value);
    });

    // Realtime convert Markdown
    watch(demo, current => {
      // console.log('value changed', current);
      window['markdown'].ready.then(markdown => {
        output.value = markdown.parse(input.value);
      });
    });

    /** Get ViewUpdate */
    const onViewUpdate = update => console.log(update);

    return {
      input,
      output,
      cmLang,
      onViewUpdate,
    };
  },
});
&lt;/script&gt;
</pre
      >
    </code-mirror>
    <h3>Sample</h3>
    <p>
      When you run the above sample, the output will be roughly as follows.
      Change the value and see that it is reflected in the right output in real
      time. Changing the value will output a
      <code>ViewUpdate</code>
      object in the console log.
    </p>
    <div class="row">
      <div class="col">
        <code-mirror
          v-model="demo"
          :lang="cmLangMd"
          :theme="cmTheme"
          :dark="dark"
          wrap
          basic
          tab
          @update="onViewUpdate"
        />
      </div>
      <div class="col">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="p-3 bg-light text-dark" v-html="output" />
      </div>
    </div>
    <p>
      This conversion to Markdown uses
      <a href="https://github.com/rsms/markdown-wasm" target="_blank">
        markdown-wasm
      </a>
      .
    </p>
    <hr />
    <h2>Slot Method</h2>
    <p>
      In this sample, the text is put directly inside the
      <code>&lt;code-mirror&gt;</code>
      tag to make it the initial string. On the Vue side, it is evaluated as a
      DOM node and only the text node is used as the value.
    </p>
    <h3>Markup</h3>
    <code-mirror :lang="cmLangHtml" readonly basic :dark="dark">
      <pre>
&lt;code-mirror readonly&gt;
  &lt;pre&gt;How razorback-jumping frogs can level six piqued gymnasts!&lt;/pre&gt;
&lt;/code-mirror&gt;</pre
      >
    </code-mirror>
    <h3>Sample</h3>
    <code-mirror readonly :dark="dark">
      <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
    </code-mirror>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from 'vue-demi';

import CodeMirror from '@/';

import { markdown as md } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';

export default defineComponent({
  components: {
    CodeMirror,
  },
  props: {
    dark: { type: Boolean, default: false },
  },
  setup() {
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
    /** Markdown Lang*/
    const cmLangMd = ref(md());
    /** HTML lang */
    const cmLangHtml = ref(html());

    const cmTheme = ref({
      '.cm-lineWrapping': {
        wordBreak: 'break-all',
      },
    });

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
    const onViewUpdate = update => console.log(update);

    return {
      demo,
      output,
      cmLangMd,
      cmLangHtml,
      cmTheme,
      onViewUpdate,
    };
  },
});
</script>

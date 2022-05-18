<template>
  <div id="app" class="container">
    <h1>Vue CodeMirror6 Markdown Editor Demo</h1>
    <h2>Normal Method</h2>
    <p>
      This is an example of simply pouring text into CodeMirror using
      <code>v-model</code>
      .
    </p>
    <code-mirror
      :extensions="extensions"
      :lang="markupLang"
      readonly
      :dark="dark"
    >
      <pre>
&lt;template&gt;
  &lt;code-mirror
    v-model="demo"
    :lang="demoLang"
    :extensions="demoExtension"
    wrap
  /&gt;
&lt;/template&gt;

&lt;script&gt;
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from '@codemirror/basic-setup';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Demo text */
    const demo = ref(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    /** Result Text */
    const markdown = ref('');

    /** CodeMirror Extensions */
    const cmExtensions = ref([basicSetup]);

    /** CodeMirror Language */
    const cmLang = ref(markdown());

    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      markdown.value = markdown.parse(demo.value);
    });

    // Realtime convert Markdown
    watch(demo, current => {
      // console.log('value changed', current);
      window['markdown'].ready.then(markdown => {
        markdown.value = markdown.parse(demo.value);
      });
    });

    return {
      demo,
      markdown,
      cmExtensions,
      cmLang,
    };
  },
});
&lt;/script&gt;
</pre
      >
    </code-mirror>
    <h3>Sample</h3>
    <p>
      The actual execution result is as follows. In this sample, the markdwon
      entered in the form on the left is reflected on the right side in real
      time using
      <a href="https://github.com/rsms/markdown-wasm">markdown-wasm</a>
      .
    </p>
    <div class="row">
      <div class="col">
        <code-mirror
          v-model="demo"
          :lang="demoLang"
          :extensions="extensions"
          :theme="cmTheme"
          :dark="dark"
          wrap
          @update="onViewUpdate"
        />
      </div>
      <div class="col">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="p-3 bg-light text-dark" v-html="output" />
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
    <code-mirror
      :extensions="extensions"
      :lang="markupLang"
      readonly
      :dark="dark"
    >
      <pre>
&lt;code-mirror readonly&gt;
  &lt;pre&gt;How razorback-jumping frogs can level six piqued gymnasts!&lt;/pre&gt;
&lt;/code-mirror&gt;</pre
      >
    </code-mirror>
    Sample:
    <code-mirror readonly :dark="dark">
      <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
    </code-mirror>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from 'vue-demi';

import CodeMirror from '@/';

import { markdown as md } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from '@codemirror/basic-setup';
import { html } from '@codemirror/lang-html';

export default defineComponent({
  components: {
    CodeMirror,
  },
  props: {
    dark: { type: Boolean, default: false },
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
    /** Markdown Lang*/
    /** HTML lang */
    const markupLang = ref(html());
    /** JavaScript Lang */
    const scriptLang = ref(javascript());

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
      demoLang,
      demo,
      output,
      extensions,
      markupLang,
      scriptLang,
      cmTheme,
      onViewUpdate,
    };
  },
});
</script>

<template>
  <div class="container">
    <section class="mb-5">
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
    </section>
    <section class="mb-5">
      <h2>Normal Method</h2>
      <p>
        This is an example of simply pouring text into CodeMirror using
        <code>v-model</code>
        .
      </p>
      <p>
        <code>basic</code>
        is an alias for loading
        <a
          href="https://codemirror.net/6/docs/ref/#basic-setup"
          target="_blank"
        >
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
    const cmLang = md();

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
        Change the value and see that it is reflected in the right output in
        real time. Changing the value will output a
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
    </section>
    <section>
      <h2>Slot Method</h2>
      <p>
        In this sample, the text is put directly inside the
        <code>&lt;code-mirror&gt;</code>
        tag to make it the initial string. On the Vue side, it is evaluated as a
        DOM node and only the text node is used as the value.
      </p>
      <p>
        It's just for simple syntax highlighting. Do not use with
        <code>v-model</code>
        .
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
    </section>
    <section>
      <h2>Linter and cross binding demo</h2>
      <p>This is a sample using JavaScript and linter.</p>
      <p>
        When using
        <code>lintGutter</code>
        prop, 🔴 is displayed on the line with the error.
        <br />
        Click 🔴 or press a
        <kbd>Ctrl</kbd>
        -
        <kbd>Shift</kbd>
        -
        <kbd>m</kbd>
        (
        <kbd>Cmd</kbd>
        -
        <kbd>Shift</kbd>
        -
        <kbd>m</kbd>
        on macOS), the error content will be displayed on the panel.
        <kbd>F8</kbd>
        key shows the next error.
      </p>
      <p>
        This sample uses
        <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank">
          eslint4b-prebuilt
        </a>
        for the eslint linter.
      </p>
      <code-mirror :lang="cmLangHtml" readonly :dark="dark" basic>
        <pre>
&lt;template&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-6"&gt;
      &lt;code-mirror
        v-model="value"
        :lang="cmLangJs"
        :linter="cmLintJs"
        :dark="dark"
        lintGutter
        basic
      /&gt;
    &lt;/div&gt;
    &lt;div class="col-6"&gt;
      &lt;textarea v-model="value" rows="3" class="form-control"&gt;&lt;/textarea&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { defineComponent } from 'vue';
// for less than vue 2.6.x
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { javascript, esLint } from '@codemirror/lang-javascript';
import Linter from "eslint4b-prebuilt";

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Value Text */
    const value = ref(
`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`
    );

    /** CodeMirror Language */
    const cmLang = javascript();
    /** CodeMirror Linter */
    const cmLinter = esLint(new Linter());

    return {
      value,
      cmLang,
      cmLinter,
    };
  },
});
&lt;/script&gt;
</pre
        >
      </code-mirror>
      <h3>Sample</h3>
      <p>Make sure you see 🔴 when you change the value to get an error.</p>
      <div class="row">
        <div class="col-6">
          <code-mirror
            v-model="demo2"
            :lang="cmLangJs"
            :linter="cmLintJs"
            :dark="dark"
            lint-gutter
            basic
          />
        </div>
        <div class="col-6">
          <textarea
            v-model="demo2"
            aria-label="two way bind test"
            rows="3"
            class="form-control"
          />
        </div>
      </div>
      <p>Also, make sure that changing either value reflects that value.</p>
    </section>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from 'vue-demi';

import CodeMirror from '@/';

import { javascript, esLint } from '@codemirror/lang-javascript';
import { markdown as md } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';

import Linter from 'eslint4b-prebuilt';

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

    const demo2 = ref(
      `document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`
    );
    /** Markdown outputs */
    const output = ref('');
    /** Markdown Lang*/
    const cmLangMd = md();
    /** HTML lang */
    const cmLangHtml = html();
    /** JavaScript */
    const cmLangJs = javascript();
    /** JavaScript Linter */
    const cmLintJs = esLint(new Linter());

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
      demo2,
      output,
      cmLangMd,
      cmLangHtml,
      cmLangJs,
      cmLintJs,
      cmTheme,
      onViewUpdate,
    };
  },
});
</script>

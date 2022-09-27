<!-- eslint-disable no-irregular-whitespace -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="container">
    <section class="mb-3">
      <h2>Markdown Editor Demo</h2>
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
    @ready="onReady"
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

    // Realtime convert Markdown
    const onReady = async () =>
      await markdown.ready;
      output.value = markdown.parse(input.value);
    });

    /** Get ViewUpdate */
    const onViewUpdate = update => console.log(update);

    return {
      input,
      output,
      cmLang,
      onReady,
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
            @ready="onReady"
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
    <section class="mb-3">
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
&lt;code-mirror :editable="false"&gt;
  &lt;pre&gt;How razorback-jumping frogs can level six piqued gymnasts!&lt;/pre&gt;
&lt;/code-mirror&gt;</pre
        >
      </code-mirror>
      <h3>Sample</h3>
      <code-mirror :editable="false" :dark="dark">
        <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
      </code-mirror>
    </section>
    <section class="mb-3">
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
        <a
          href="https://github.com/UziTech/eslint-linter-browserify"
          target="_blank"
        >
          eslint-linter-browserify
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
import eslint from 'eslint-linter-browserify';

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
    /** JavaScript Linter */
    const cmLinter = esLint(
      // eslint-disable-next-line
      new eslint.Linter(),
      {
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        env: {
          browser: true,
          node: true,
        },
      }
    );

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
            warp
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
    <section>
      <h2>
        Toggle
        <a
          href="https://codemirror.net/docs/ref/#state.EditorState^readOnly"
          target="_blank"
        >
          <code>readonly</code>
        </a>
        and
        <a
          href="https://codemirror.net/docs/ref/#state.EditorState^readOnly"
          target="_blank"
        >
          <code>editable</code>
        </a>
        a demo
      </h2>
      <p>
        <code>readonly</code>
        specifies whether the state is rewritable or not. Similar to
        <code>editable</code>
        , except that it is focusable. In short, set
        <code>editable</code>
        to
        <code>false</code>
        if you want to use it as a simple syntax highlighter.
      </p>
      <div class="form-check form-switch">
        <input
          id="readonly"
          v-model="isReadonly"
          type="checkbox"
          class="form-check-input"
          role="switch"
          :aria-checked="isReadonly"
        />
        <label class="form-check-label" for="readonly">Readonly</label>
      </div>
      <div class="form-check form-switch">
        <input
          id="editable"
          v-model="isEditable"
          type="checkbox"
          class="form-check-input"
          role="switch"
          :aria-checked="isEditable"
        />
        <label class="form-check-label" for="editable">Editable</label>
      </div>
      <code-mirror
        :dark="dark"
        basic
        :readonly="isReadonly"
        :editable="isEditable"
      >
        <pre>
色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず</pre
        >
      </code-mirror>
    </section>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from 'vue-demi';

import CodeMirror from '@/';

import { javascript, esLint } from '@codemirror/lang-javascript';
import { markdown as md } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';

import eslint from 'eslint-linter-browserify';

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
    const cmLintJs = esLint(
      // eslint-disable-next-line
      new eslint.Linter(),
      {
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        env: {
          browser: true,
          node: true,
        },
      }
    );

    const cmTheme = ref({
      '.cm-lineWrapping': {
        wordBreak: 'break-all',
      },
    });

    /** Readonly */
    const isReadonly = ref(true);
    /** Editable */
    const isEditable = ref(true);

    // Realtime convert Markdown
    watch(demo, async current => {
      output.value = window.markdown.parse(current);
    });

    // Methods
    const onViewUpdate = update => console.log('onViewUpdate Event: ', update);

    const onReady = async () => {
      await window.markdown.ready;
      output.value = window.markdown.parse(demo.value);
    };

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
      onReady,
      isReadonly,
      isEditable,
    };
  },
});
</script>

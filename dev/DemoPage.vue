<template>
  <div class="container">
    <section class="mb-5">
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
      <code-mirror
        v-model="markdownDemoSrc"
        :dark="dark"
        :lang="cmLangHtml"
        basic
        readonly
      />
      <h3>Demo</h3>
      <markdown-demo class="mb-3" :dark="dark" />
      <div class="alert alert-warning d-flex align-items-center" role="alert">
        <div class="bi flex-shrink-0 me-2 fs-2" role="img" aria-label="Info:">
          ⚠
        </div>
        <div>
          <p>
            Please use
            <code>@codemirror/lang-markdown@6.0.2</code>
            .
          </p>
          <p>
            The
            <a href="https://github.com/rsms/markdown-wasm" target="_blank">
              markdown-wasm
            </a>
            used in this demo has the path of
            <code>markdown.wasm</code>
            hard-coded, so depending on how you use it, you may need to rewrite
            <code>markdown-wasm/dist/markdown.es.js</code>
          </p>
        </div>
      </div>
    </section>
    <section class="mb-5">
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
      <code-mirror
        v-model="slotDemoSrc"
        :dark="dark"
        :lang="cmLangHtml"
        basic
        readonly
      />
      <h3>Sample</h3>
      <slot-demo :dark="dark" />
    </section>
    <section class="mb-5">
      <h2>Linter and cross binding demo</h2>
      <p>This is a sample using JavaScript and linter.</p>
      <p>
        When using
        <code>gutter</code>
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
      <code-mirror
        v-model="linterAndCrossBindingDemoSrc"
        :dark="dark"
        :lang="cmLangHtml"
        basic
        readonly
      />
      <h3>Sample</h3>
      <p>Make sure you see 🔴 when you change the value to get an error.</p>
      <linter-and-cross-binding-demo :dark="dark" />
      <p>Also, make sure that changing either value reflects that value.</p>
    </section>
    <section class="mb-5">
      <h2>
        Toggle
        <code>readonly</code>
        and
        <code>disabled</code>
        a demo
      </h2>
      <p>
        <a
          href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable"
          target="_blank"
        >
          <code>readonly</code>
        </a>
        a specifies whether the state is rewritable or not. Similar to
        <code>disabled</code>
        (Inverse value of
        <a
          href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable"
          target="_blank"
        >
          <code>editable</code>
        </a>
        ) , except that it is focusable. In short, add
        <code>disabled</code>
        prop to if you want to use it as a simple syntax highlighter.
      </p>
      <code-mirror
        v-model="readonlyAndDisabledDemoSrc"
        :dark="dark"
        :lang="cmLangHtml"
        basic
        readonly
      />
      <h3>Demo</h3>
      <readonly-and-disabled-demo :dark="dark" />
    </section>
  </div>
</template>

<script>
/* eslint-disable import/no-duplicates */
import { defineComponent } from 'vue';

import CodeMirror from 'vue-codemirror6';

import { html } from '@codemirror/lang-html';

import MarkdownDemo from './components/MarkdownDemo.vue';
import MarkdownDemoSrc from './components/MarkdownDemo.vue?raw';
import SlotDemo from './components/SlotDemo.vue';
import SlotDemoSrc from './components/SlotDemo.vue?raw';
import ReadonlyAndDisabledDemo from './components/ReadonlyAndDisabledDemo.vue';
import ReadonlyAndDisabledDemoSrc from './components/ReadonlyAndDisabledDemo.vue?raw';
import LinterAndCrossBindingDemo from './components/LinterAndCrossBindingDemo.vue';
import LinterAndCrossBindingDemoSrc from './components/LinterAndCrossBindingDemo.vue?raw';

export default defineComponent({
  components: {
    MarkdownDemo,
    SlotDemo,
    ReadonlyAndDisabledDemo,
    LinterAndCrossBindingDemo,
    CodeMirror,
  },
  props: {
    dark: { type: Boolean, default: false },
  },
  setup() {
    /** HTML lang */
    const cmLangHtml = html();

    return {
      markdownDemoSrc: MarkdownDemoSrc.trim(),
      slotDemoSrc: SlotDemoSrc.trim(),
      readonlyAndDisabledDemoSrc: ReadonlyAndDisabledDemoSrc.trim(),
      linterAndCrossBindingDemoSrc: LinterAndCrossBindingDemoSrc.trim(),
      cmLangHtml,
    };
  },
});
</script>

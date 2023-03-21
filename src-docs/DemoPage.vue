<!-- eslint-disable import/no-duplicates -->
<script setup lang="ts">
import CodeMirror from 'vue-codemirror6';
import { useDark } from '@vueuse/core';
import { vue } from '@codemirror/lang-vue';

import MarkdownDemo from './components/MarkdownDemo.vue';
import MarkdownDemoSrc from './components/MarkdownDemo.vue?raw';
import SlotDemo from './components/SlotDemo.vue';
import SlotDemoSrc from './components/SlotDemo.vue?raw';
import ReadonlyAndDisabledDemo from './components/ReadonlyAndDisabledDemo.vue';
import ReadonlyAndDisabledDemoSrc from './components/ReadonlyAndDisabledDemo.vue?raw';
import LinterAndCrossBindingDemo from './components/LinterAndCrossBindingDemo.vue';
import LinterAndCrossBindingDemoSrc from './components/LinterAndCrossBindingDemo.vue?raw';

const dark = useDark();

const markdownDemoSrc = MarkdownDemoSrc.trim();
const slotDemoSrc = SlotDemoSrc.trim();
const readonlyAndDisabledDemoSrc = ReadonlyAndDisabledDemoSrc.trim();
const linterAndCrossBindingDemoSrc = LinterAndCrossBindingDemoSrc.trim();
</script>

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
      </p>
      <code-mirror
        v-model="markdownDemoSrc"
        :dark="dark"
        :lang="vue()"
        basic
        wrap
        readonly
      />
      <h3>Demo</h3>
      <markdown-demo class="mb-3" :dark="dark" />
      <div class="alert alert-info d-flex align-items-center my-3" role="alert">
        <div class="bi flex-shrink-0 me-2 fs-2" role="img" aria-label="Info:">
          <i class="bi bi-info-circle" />
        </div>
        <div>
          The process of converting Markdown to HTML uses
          <a href="https://github.com/logue/vue-markdown-wasm" target="_blank">
            vue-markdown-wasm
          </a>
          .
          <br />
          Full demo is
          <a href="https://logue.dev/vue-markdown-wasm" target="_blank">here</a>
          .
        </div>
      </div>
    </section>
    <section class="mb-5">
      <h2>Slot Method</h2>
      <p>
        In this sample, the text is put directly inside the
        <code>&lt;code-mirror&gt;</code>
        tag to make it the initial string. On the Vue side, it is evaluated as a
        DOM node and only the text node is used as the value. In addition, it
        does not work with Vue2.7.
      </p>
      <p>
        It's just for simple syntax highlighting. Do not use with
        <code>v-model</code>
        .
      </p>
      <code-mirror
        v-model="slotDemoSrc"
        :dark="dark"
        :lang="vue()"
        basic
        wrap
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
        :lang="vue()"
        basic
        wrap
        readonly
      />
      <h3>Sample</h3>
      <p>Make sure you see 🔴 when you change the value to get an error.</p>
      <p>
        The value of
        <code>@update</code>
        gets the
        <a
          href="https://codemirror.net/6/docs/ref/#view.ViewUpdate"
          target="_blank"
        >
          ViewUpdate
        </a>
        object at that time when there is any update in the target form.
      </p>
      <p>
        In this demo code, the
        <a
          href="https://codemirror.net/docs/ref/#lint.diagnosticCount"
          target="_blank"
        >
          diagnosticCount
        </a>
        function is used to display the count of locations where grammatical
        errors are found.
      </p>
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
        :lang="vue()"
        basic
        wrap
        readonly
      />
      <h3>Demo</h3>
      <readonly-and-disabled-demo :dark="dark" />
    </section>
  </div>
</template>

<style>
.vue-codemirror * {
  font-family: var(--bs-font-monospace);
}
</style>

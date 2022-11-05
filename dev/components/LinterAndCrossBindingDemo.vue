<script setup>
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

import { javascript, esLint } from '@codemirror/lang-javascript';
import eslint from 'eslint-linter-browserify';
import { diagnosticCount } from '@codemirror/lint';

const value = ref(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`);

const errorCount = ref(0);

const lang = javascript();

const linter = esLint(
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

defineProps({ dark: Boolean });

/** Get ViewUpdate */
const onUpdate = update => (errorCount.value = diagnosticCount(update.state));
</script>

<template>
  <!-- eslint-disable vuejs-accessibility/form-control-has-label -->
  <!-- eslint-disable vuejs-accessibility/label-has-for -->
  <div class="row">
    <div class="col-6 mb-3">
      <code-mirror
        v-model="value"
        :lang="lang"
        :linter="linter"
        :dark="dark"
        gutter
        wrap
        basic
        @update="onUpdate"
        @diagnostic-count="errorCount"
      />
    </div>
    <div class="col-6 mb-3">
      <textarea v-model="value" rows="4" class="form-control" />
    </div>
    <div class="col-12 mb-3">
      <label for="count" class="visually-hidden">Linter Error Count</label>
      <div class="input-group">
        <div class="input-group-text">Linter Error Count</div>
        <input
          id="count"
          type="number"
          class="form-control"
          :value="errorCount"
          readonly
        />
      </div>
      <p>
        <kbd>Ctrl-Shift-m</kbd>
        (
        <kbd>Cmd-Shift-m</kbd>
        on macOS) to show lint panel.
        <kbd>F8</kbd>
        key shows the next error.
      </p>
    </div>
  </div>
</template>

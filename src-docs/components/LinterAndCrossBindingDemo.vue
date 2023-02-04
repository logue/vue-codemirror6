<script setup>
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

import { diagnosticCount } from '@codemirror/lint';
import { esLint, javascript } from '@codemirror/lang-javascript';
import eslint from 'eslint-linter-browserify';

/** Demo code */
const value = ref(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`);

/** Linter Error count */
const errorCount = ref(0);

/**
 * JavaScript language Linter Setting.
 * Using eslint-linter-browserify
 *
 * @see {@link https://github.com/UziTech/eslint-linter-browserify#eslint-linter-browserify}
 */
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

// Sync Dark mode
defineProps({ dark: Boolean });

/** Get ViewUpdate for update lint error count. */
const onUpdate = update => {
  if (update.flags === 0) {
    return;
  }
  errorCount.value = diagnosticCount(update.state);
};
</script>

<template>
  <div class="row">
    <div class="col-6 mb-3">
      <code-mirror
        v-model="value"
        :dark="dark"
        :lang="javascript()"
        :linter="linter"
        basic
        gutter
        wrap
        @update="onUpdate"
      />
    </div>
    <div class="col-6 mb-3">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label, vue/html-self-closing -->
      <textarea v-model="value" rows="4" class="form-control"></textarea>
    </div>
    <div class="col-12 mb-3">
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
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

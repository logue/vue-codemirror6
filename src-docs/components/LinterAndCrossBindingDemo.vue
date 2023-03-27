<script setup lang="ts">
import { ref, type Ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

import { esLint, javascript } from '@codemirror/lang-javascript';
// @ts-ignore
import eslint from 'eslint-linter-browserify';
import { diagnosticCount, type LintSource } from '@codemirror/lint';
import type { ViewUpdate } from '@codemirror/view';

// Sync Dark mode
defineProps({ dark: Boolean });

/** CodeMirror Instance */
const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref();

/** Demo code */
const value: Ref<string> = ref(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`);

/** Linter Error count */
const errorCount: Ref<number> = ref(0);

/**
 * JavaScript language Linter Setting.
 * Using eslint-linter-browserify
 *
 * @see {@link https://github.com/UziTech/eslint-linter-browserify#eslint-linter-browserify}
 */
const linter: LintSource = esLint(
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
</script>

<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        ref="cm"
        v-model="value"
        :dark="dark"
        :lang="javascript()"
        :linter="linter"
        basic
        class="mb-3"
        gutter
        wrap
      />
      <div class="row mb-3">
        <div class="col-6">
          <div class="input-group">
            <label for="count" class="input-group-text">Count</label>
            <input
              id="count"
              type="text"
              :value="cm?.length"
              class="form-control"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="input-group">
            <label for="diagnosticCount" class="input-group-text">
              Diagnostic Count
            </label>
            <input
              id="diagnosticCount"
              type="number"
              class="form-control"
              :value="cm?.diagnosticCount"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label, vue/html-self-closing -->
      <textarea v-model="value" rows="4" class="form-control"></textarea>
    </div>
  </div>
  <p>
    <kbd>Ctrl-Shift-m</kbd>
    (
    <kbd>Cmd-Shift-m</kbd>
    on macOS) to show lint panel.
    <kbd>F8</kbd>
    key shows the next error.
  </p>
</template>

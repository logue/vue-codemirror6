<script
  lang="ts"
  setup
  vapor
>
import { esLint, javascript } from '@codemirror/lang-javascript';
// Uses linter.mjs
import eslint from 'eslint-linter-browserify';
import { type Ref, ref } from 'vue';
// eslint-disable-next-line import-x/no-unresolved -- This is a demo component, and the CodeMirror component is only used here for demonstration purposes. It is not intended to be imported in other components.
import type CodeMirror from 'vue-codemirror6';

// Sync Dark mode
defineProps<{
  dark?: boolean;
}>();

/** CodeMirror Instance */
const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref();

/** Demo code */
const value: Ref<string> = ref(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`);

const focused: Ref<boolean> = ref(false);

/**
 * JavaScript language Linter Setting.
 * Using eslint-linter-browserify
 *
 * @see {@link https://github.com/UziTech/eslint-linter-browserify#eslint-linter-browserify}
 */
const linter = esLint(new eslint.Linter(), {
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  rules: {
    semi: [
      'error',
      'never',
    ],
  },
});

const onFocus = (f: boolean): void => {
  focused.value = f;
};
</script>

<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        basic
        class="mb-3"
        gutter
        wrap
        ref="cm"
        v-model="value"
        :dark="dark"
        :lang="javascript()"
        :linter="linter"
        @focus="onFocus"
      />
      <div class="row mb-3">
        <div class="col-4">
          <div class="input-group">
            <label
              class="input-group-text"
              for="count"
              >Count</label
            >
            <input
              class="form-control"
              id="count"
              readonly
              type="text"
              :value="cm?.length"
            />
          </div>
        </div>
        <div class="col-5">
          <div class="input-group">
            <label
              class="input-group-text"
              for="diagnosticCount"
            >
              Diagnostic Count
            </label>
            <input
              class="form-control"
              id="diagnosticCount"
              readonly
              type="number"
              :value="cm?.diagnosticCount"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="form-check form-check-inline">
            <input
              checked
              class="form-check-input"
              disabled
              id="focused"
              type="checkbox"
              v-model="focused"
            />
            <label
              class="form-check-label"
              for="focused"
              >Focused</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label, vue/html-self-closing -->
      <textarea
        class="form-control"
        rows="4"
        v-model="value"
      ></textarea>
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

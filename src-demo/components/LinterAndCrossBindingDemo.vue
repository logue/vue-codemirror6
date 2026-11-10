<script lang="ts" setup vapor>
import { esLint, javascript } from '@codemirror/lang-javascript';
// Uses linter.mjs
import eslint from 'eslint-linter-browserify';
import { type Ref, ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

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
      sourceType: 'module'
    }
  },
  rules: {
    semi: ['error', 'never']
  }
});

const onFocus = (f: boolean): void => {
  focused.value = f;
};

/** Sync from the Carbon textarea back to the editor */
const onInput = (event: Event): void => {
  value.value = (event.target as HTMLTextAreaElement).value;
};
</script>

<template>
  <div class="demo-split">
    <div class="demo-stack">
      <code-mirror
        ref="cm"
        v-model="value"
        :dark="dark"
        :lang="javascript()"
        :linter="linter"
        basic
        gutter
        wrap
        @focus="onFocus"
      />
      <div class="demo-inline">
        <cds-text-input :value="String(cm?.length ?? 0)" label="Count" readonly size="sm" />
        <cds-text-input
          :value="String(cm?.diagnosticCount ?? 0)"
          label="Diagnostic count"
          readonly
          size="sm"
        />
        <cds-checkbox disabled label-text="Focused" :checked="focused" />
      </div>
    </div>
    <div>
      <cds-textarea :value="value" label="Sync" rows="6" @input="onInput" />
    </div>
  </div>
  <p>
    <kbd>Ctrl-Shift-m</kbd>
    (
    <kbd>Cmd-Shift-m</kbd>
    on macOS) shows the lint panel.
    <kbd>F8</kbd>
    jumps to the next error.
  </p>
</template>

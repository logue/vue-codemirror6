<script lang="ts" setup vapor>
import { esLint, javascript } from "@codemirror/lang-javascript";
// Uses linter.mjs
import eslint from "eslint-linter-browserify";
import { type Ref, ref } from "vue";

import CodeMirror from "vue-codemirror6";

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
      sourceType: "module",
    },
  },
  rules: {
    semi: ["error", "never"],
  },
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
  <cds-grid with-row-gap>
    <cds-column sm="4" md="4" lg="8">
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
      <cds-stack orientation="horizontal" gap="5">
        <cds-text-input :value="String(cm?.length ?? 0)" label="Count" readonly size="sm" />
        <cds-text-input
          :value="String(cm?.diagnosticCount ?? 0)"
          label="Diagnostic count"
          readonly
          size="sm"
        />
        <cds-checkbox disabled label-text="Focused" :checked="focused" />
      </cds-stack>
    </cds-column>
    <cds-column sm="4" md="4" lg="8">
      <cds-stack gap="5">
        <cds-textarea :value="value" label="Sync" rows="6" @input="onInput" />
        <p>
          <kbd>Ctrl-Shift-m</kbd>
          (
          <kbd>Cmd-Shift-m</kbd>
          on macOS) shows the lint panel.
          <kbd>F8</kbd>
          jumps to the next error.
        </p>
      </cds-stack>
    </cds-column>
  </cds-grid>
</template>

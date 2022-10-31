<script setup>
import { ref } from 'vue';
import CodeMirror from 'vue-codemirror6';

import { javascript, esLint } from '@codemirror/lang-javascript';
import eslint from 'eslint-linter-browserify';

const value = ref(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`);

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
</script>

<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        v-model="value"
        :lang="lang"
        :linter="linter"
        :dark="dark"
        gutter
        wrap
        basic
      />
    </div>
    <div class="col-6">
      <textarea v-model="value" rows="5" class="form-control" />
    </div>
  </div>
</template>

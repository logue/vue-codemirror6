<template>
  <div id="app">
    <h1>Vue CodeMirror6 Test</h1>
    <code-mirror v-model="value" :extensions="extensions" />
    <hr />
    <h2>CodeMirror Value</h2>
    <p v-text="value" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CodeMirror from '@/components/CodeMirror.vue';

import { basicSetup } from '@codemirror/basic-setup';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
      extensions: [basicSetup],
      value: 'The quick brown fox jumps over the lazy dog.',
    };
  },
  watch: {
    value() {
      console.log(this.value);
    },
  },
});
</script>

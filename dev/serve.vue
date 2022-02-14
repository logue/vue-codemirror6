<template>
  <div id="app">
    <h1>Vue CodeMirror6 Test</h1>
    <code-mirror v-model="value" />
    <hr />
    <h2>CodeMirror Value</h2>
    <p v-text="value" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CodeMirror from '../src/components/CodeMirror.vue';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
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

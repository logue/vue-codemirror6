<script lang="ts" setup>
import { ref } from 'vue';

// eslint-disable-next-line import-x/no-unresolved -- This is a demo component, and the CodeMirror component is only used here for demonstration purposes. It is not intended to be imported in other components.
import CodeMirror from 'vue-codemirror6';

const temp = ref('Press Shift+Ctrl+Enter here to see the console log.');
</script>

<template>
  <code-mirror
    v-model="temp"
    :keymap="[
      {
        key: 'Shift-Ctrl-Enter',
        run: () => {
          console.log('Shift+Ctrl+Enter');
          return true;
        },
      },
    ]"
    tab
    basic
  />
</template>

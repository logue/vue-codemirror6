<script lang="ts" setup>
import { ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

const temp = ref('Press Shift+Ctrl+Enter here to see the console log.');
</script>

<template>
  <code-mirror
    v-model="temp"
    tab
    basic
    :keymap="[
      {
        key: 'Shift-Ctrl-Enter',
        run: () => {
          console.log('Shift+Ctrl+Enter');
          return true;
        },
      },
    ]"
  />
</template>

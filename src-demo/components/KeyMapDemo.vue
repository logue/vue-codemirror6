<script lang="ts" setup vapor>
import type { KeyBinding } from '@codemirror/view';
import { ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

// Sync dark mode
defineProps<{
  dark?: boolean;
}>();

const temp = ref('Press Shift+Ctrl+Enter here to see the console log.');

/** Custom key bindings */
const keymap: KeyBinding[] = [
  {
    key: 'Shift-Ctrl-Enter',
    run: () => {
      console.log('Shift+Ctrl+Enter');
      return true;
    }
  }
];
</script>

<template>
  <code-mirror v-model="temp" basic tab :dark="dark" :keymap="keymap" />
</template>

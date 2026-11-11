<script lang="ts" setup vapor>
import type { KeyBinding } from '@codemirror/view';
import { ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

// Sync dark mode
defineProps<{
  dark?: boolean;
}>();

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
  <code-mirror basic tab :dark="dark" :keymap="keymap">
    <pre>
Press Shift+Ctrl+Enter here to see the console log.

山下旌旗在望，山头鼓角相闻。
敌军围困万千重，我自岿然不动。
早已森严壁垒，更加众志成城。
黄洋界上炮声隆，报道敌军宵遁。</pre>
  </code-mirror>
</template>

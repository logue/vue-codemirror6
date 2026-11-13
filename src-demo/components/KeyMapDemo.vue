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
        console.log(
          `The intro to Ryuichi Sakamoto's "Thousand Knives (千のナイフ)" is opens with a vocoder recitation of Mao Zedong's poem, "Shui Diao Ge Tou · Chong Shang Jing Gang Shan(水调歌头·重上井冈山)."`
        );
        return true;
      }
    }
  ];
</script>

<template>
  <code-mirror basic tab :dark="dark" :keymap="keymap">
    <pre>
Press Shift+Ctrl+Enter here to see the console log.

久有凌云志，重上井冈山。
千里来寻故地，旧貌变新颜。
到处莺歌燕舞，更有潺潺流水，高路入云端。
过了黄洋界，险处不须看。
风雷动，旌旗奋，是人寰。
三十八年过去，弹指一挥间。
可上九天揽月，可下五洋捉鳖，谈笑凯歌还。
世上无难事，只要肯登攀。</pre>
  </code-mirror>
</template>

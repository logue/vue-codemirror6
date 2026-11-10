<script lang="ts" setup vapor>
import { type Ref, ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

/** Readonly */
const isReadonly: Ref<boolean> = ref(true);
/** Disabled (Not Editable) */
const isDisabled: Ref<boolean> = ref(false);

// Sync dark mode
defineProps<{
  dark?: boolean;
}>();
</script>

<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div class="demo-stack">
    <div class="demo-inline">
      <cds-toggle
        label-a="On"
        label-b="Off"
        label-text="Readonly"
        :toggled="isReadonly"
        @cds-toggle-changed="isReadonly = $event.detail.checked"
      />
      <cds-toggle
        label-a="On"
        label-b="Off"
        label-text="Disabled"
        :toggled="isDisabled"
        @cds-toggle-changed="isDisabled = $event.detail.checked"
      />
    </div>
    <code-mirror basic :dark="dark" :disabled="isDisabled" :readonly="isReadonly">
      <pre>
色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず</pre>
    </code-mirror>
  </div>
</template>

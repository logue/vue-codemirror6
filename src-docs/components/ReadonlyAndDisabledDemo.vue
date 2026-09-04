<script
  lang="ts"
  setup
  vapor
>
import { type Ref, ref } from 'vue';

// eslint-disable-next-line import-x/no-unresolved -- This is a demo component, and the CodeMirror component is only used here for demonstration purposes. It is not intended to be imported in other components.
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
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      id="readonly"
      role="switch"
      type="checkbox"
      v-model="isReadonly"
      :aria-checked="isReadonly"
    />
    <label
      class="form-check-label"
      for="readonly"
      >Readonly</label
    >
  </div>
  <div class="form-check form-switch">
    <input
      class="form-check-input"
      id="disabled"
      role="switch"
      type="checkbox"
      v-model="isDisabled"
      :aria-checked="isDisabled"
    />
    <label
      class="form-check-label"
      for="disabled"
      >Disabled</label
    >
  </div>
  <code-mirror
    basic
    :dark="dark"
    :disabled="isDisabled"
    :readonly="isReadonly"
  >
    <pre>
色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず</pre>
  </code-mirror>
</template>

<script lang="ts" setup vapor>
/** Carbon toggle that switches between the white and g100 themes. */
const dark = defineModel<boolean>({ required: true });

const onChange = (event: CustomEvent<{ checked: boolean }>): void => {
  dark.value = event.detail.checked;
};
</script>

<template>
  <cds-toggle
    hidelabel
    label-a="Dark"
    label-b="Light"
    label-text="Dark mode"
    size="sm"
    :toggled="dark"
    @cds-toggle-changed="onChange"
  />
</template>

<script
  lang="ts"
  setup
  vapor
>
/** Bootstrap 5.3 Toggle Dark mode */

import { useDark, useToggle } from '@vueuse/core';
import { watch } from 'vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

watch(
  () => isDark.value,
  (dark) =>
    (document.documentElement.dataset as DOMStringMap).bsTheme === dark
      ? 'dark'
      : 'light',
  {
    immediate: true,
  },
);
</script>

<template>
  <a
    aria-label="Toggle Dark Mode"
    href="#"
    @click="toggleDark()"
  >
    <svg
      class="bi bi-circle-half"
      fill="currentColor"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>circle-half</title>
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
    </svg>
  </a>
</template>

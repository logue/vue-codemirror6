<script setup lang="ts">
/** Bootstrap 5.3 Toggle Dark mode */
import { watch } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

watch(
  () => isDark.value,
  dark =>
    document.documentElement.setAttribute(
      'data-bs-theme',
      dark ? 'dark' : 'light'
    )
);
</script>

<template>
  <a href="#" @click="toggleDark()">
    <i class="bi bi-circle-half" />
  </a>
</template>

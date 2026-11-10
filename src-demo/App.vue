<script lang="ts" setup vapor>
import ToggleTheme from './components/ToggleTheme.vue';
import { useDemoHost } from './composables/useDemoHost';
import DemoPage from './DemoPage.vue';

const { isDark, isEmbedded } = useDemoHost();
</script>

<template>
  <!-- When embedded in the docs site, the site itself provides the header and theme switch. -->
  <header v-if="!isEmbedded" class="demo-header">
    <h1 class="demo-header__title">Vue CodeMirror6 Demo</h1>
    <div class="demo-header__actions">
      <cds-link href="https://github.com/logue/vue-codemirror6">GitHub</cds-link>
      <toggle-theme v-model="isDark" />
    </div>
  </header>

  <main class="demo-main">
    <demo-page :dark="isDark" />
  </main>
</template>

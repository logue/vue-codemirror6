<script setup lang="ts">
  import { ref, watchEffect } from 'vue';

  import PageContent from './components/PageContent.vue';
  import ToggleTheme from './components/ToggleTheme.vue';
  import { isEmbedded, useEmbed } from './composables/useEmbed';
  import LogoGithub20 from '@carbon/icons/es/logo--github/20.js';

  const dark = ref(globalThis.matchMedia('(prefers-color-scheme: dark)').matches);

  useEmbed(dark);

  watchEffect(() => {
    document.documentElement.dataset.carbonTheme = dark.value ? 'g100' : 'white';
  });

  if (isEmbedded) document.documentElement.dataset.embedded = '';

  // `cds-header-global-action` only gets the header-action styling when it
  // renders a <button> (it queries `button`), so it must not be given `href`.
  function openRepository(): void {
    globalThis.open('https://github.com/logue/vue-codemirror6', '_blank', 'noopener');
  }
</script>

<template>
  <cds-header v-if="!isEmbedded" aria-label="Vue CodeMirror6 Demo">
    <cds-header-name prefix="">Vue CodeMirror6 Demo</cds-header-name>
    <div class="cds--header__global">
      <div class="header-theme-toggle">
        <ToggleTheme v-model="dark" />
      </div>
      <cds-header-global-action
        tooltip-text="GitHub"
        tooltip-alignment="right"
        aria-label="GitHub"
        @click="openRepository"
      >
        <cds-icon slot="icon" :icon="LogoGithub20" />
      </cds-header-global-action>
    </div>
  </cds-header>

  <main class="app-main">
    <PageContent :dark="dark" />
  </main>

  <footer v-if="!isEmbedded" class="app-footer">
    <p>
      &copy; 2026 by <a href="https://logue.dev/">Logue</a>. Licensed under the
      <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.
    </p>
  </footer>
</template>

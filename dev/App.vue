<script setup>
import { ref, watch } from 'vue-demi';

import DemoPage from './DemoPage.vue';

/** CodeMirror Component */

/** Dark mode */
const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
watch(dark, () => {
  const body = document.body.classList;
  const navbar = document.querySelector('.navbar').classList;
  const header = document.querySelector('.header').classList;
  const main = document.querySelector('main').classList;
  const footer = document.querySelector('.footer').classList;
  if (dark.value) {
    body.remove('text-white', 'bg-black');
    body.add('text-black', 'bg-white');
    navbar.remove('navbar-dark', 'bg-dark');
    navbar.add('navbar-light', 'bg-light');
    header.remove('bg-light', 'text-dark');
    header.add('bg-dark', 'text-light');
    main.remove('bg-white', 'text-dark');
    main.add('bg-black', 'text-light');
    footer.remove('bg-light', 'text-dark');
    footer.add('bg-dark', 'text-light');
  } else {
    body.remove('text-black', 'bg-white');
    body.add('text-white', 'bg-black');
    navbar.add('navbar-dark', 'bg-dark');
    navbar.remove('navbar-light', 'bg-light');
    header.remove('bg-dark', 'text-light');
    header.add('bg-light', 'text-dark');
    main.add('bg-white', 'text-dark');
    main.remove('bg-black', 'text-light');
    footer.add('bg-light', 'text-dark');
    footer.remove('bg-dark', 'text-light');
  }
});
</script>

<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid d-flex justify-content-between">
      <a class="navbar-brand" href="#">Vue CodeMirror6</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarCollapse" class="collapse navbar-collapse flex-grow-0">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/logue/vue-codemirror6">
              <i class="bi bi-github" />
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="dark = !dark">
              <i class="bi bi-circle-half" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="header bg-light">
    <div class="container py-3">
      <h1>Vue CodeMirror6 Demo</h1>
      <p class="lead">
        A rough demo of Vue Codemirror in action. You can switch between dark
        modes from the
        <i class="bi bi-circle-half" />
        icon in the upper left.
      </p>
    </div>
  </header>

  <main class="flex-shrink-0 pt-4 bg-white">
    <demo-page :dark="dark" />
  </main>

  <footer class="footer mt-auto py-3 mb-0 bg-light">
    <div class="container mb-0">
      &copy; 2022 by
      <a href="http://logue.dev/">Logue</a>
      . Licensed under the
      <a href="http://opensource.org/licenses/mit-license.php">MIT License</a>
      .
    </div>
  </footer>
  <teleport to="head">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha256-wLz3iY/cO4e6vKZ4zRmo4+9XDpMcgKOvv/zEU3OMlRo="
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
      integrity="sha256-4RctOgogjPAdwGbwq+rxfwAmSpZhWaafcZR9btzUk18="
      crossorigin="anonymous"
    />
  </teleport>
</template>

<style>
.vue-codemirror * {
  font-family: var(--bs-font-monospace);
}
</style>

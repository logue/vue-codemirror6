<script setup lang="ts">
import ToggleTheme from './components/ToggleTheme.vue';
import DemoPage from './DemoPage.vue';
</script>

<!-- eslint-disable vuejs-accessibility/anchor-has-content -->
<template>
  <nav class="navbar navbar-expand-md bg-dark" data-bs-theme="dark">
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
            <toggle-theme class="nav-link" attribute="data-bs-theme" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="bg-body-tertiary">
    <div class="container py-3">
      <h1>Vue CodeMirrror6 Demo</h1>
      <p class="lead">
        A rough demo of Vue CodeMirror6 in action. You can switch between dark
        modes from the
        <i class="bi bi-circle-half" />
        icon in the upper left.
      </p>
    </div>
  </header>

  <main class="flex-glow-0 pt-4 bg-body">
    <demo-page />
  </main>

  <footer class="footer mt-auto py-3 mb-0 bg-body-tertiary">
    <div class="container mb-0">
      &copy; 2022-2023 by
      <a href="http://logue.dev/">Logue</a>
      . Licensed under the
      <a href="http://opensource.org/licenses/mit-license.php">MIT License</a>
      .
    </div>
  </footer>
</template>

<style>
.vue-codemirror * {
  font-family: var(--bs-font-monospace);
}
</style>

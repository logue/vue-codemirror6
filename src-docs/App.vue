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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
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

<template>
  <div>
    <header>
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
                <a
                  class="nav-link"
                  aria-current="page"
                  href="https://logue.dev/"
                >
                  Home
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://github.com/logue/vue-codemirror6"
                >
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
                <a class="nav-link" href="#" @click="dark = !dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-circle-half"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main role="main" class="flex-shrink-0 pt-4 bg-white">
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
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue-demi';

import DemoPage from './DemoPage.vue';

/** CodeMirror Component */
export default defineComponent({
  components: {
    DemoPage,
  },
  setup() {
    /** Dark mode */
    const dark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
    watch(dark, () => {
      const navbar = document.querySelector('.navbar').classList;
      const main = document.querySelector('main').classList;
      const footer = document.querySelector('.footer').classList;
      if (dark.value) {
        navbar.remove('navbar-dark', 'bg-dark');
        navbar.add('navbar-light', 'bg-light');
        main.remove('bg-white', 'text-dark');
        main.add('bg-black', 'text-light');
        footer.remove('bg-light', 'text-dark');
        footer.add('bg-dark', 'text-light');
      } else {
        navbar.add('navbar-dark', 'bg-dark');
        navbar.remove('navbar-light', 'bg-light');
        main.add('bg-white', 'text-dark');
        main.remove('bg-black', 'text-light');
        footer.add('bg-light', 'text-dark');
        footer.remove('bg-dark', 'text-light');
      }
    });

    return {
      dark,
    };
  },
});
</script>

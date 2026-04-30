/// <reference types="vite/client" />

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Vite env extension point; add VITE_APP_* variable types here as needed
interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

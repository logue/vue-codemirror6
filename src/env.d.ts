/// <reference types="@rsbuild/core/types" />
/// <reference types="@rslib/core/types" />
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*?source' {
  const content: string;
  export default content;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Rsbuild env extension point; add PUBLIC_* variable types here as needed
interface ImportMetaEnv {
  // see https://rsbuild.rs/guide/advanced/env-vars
  // add .env variables.
}

/** Build-time constants injected via `source.define` in rsbuild.config.ts / rslib.config.ts */
declare const __APP_VERSION__: string;
declare const __BUILD_DATE__: string;
declare const __DEMO_BUILD__: boolean;

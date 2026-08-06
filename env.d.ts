/* rslint-disable @typescript-eslint/no-explicit-any */
/** biome-ignore-all lint/suspicious/noExplicitAny: for custom file type (such as yaml, vue etc.) reading. */

// see rslib.config.ts for details
declare const __APP_VERSION__: string;
declare const __BUILD_DATE__: string;

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module '*?source' {
  const content: string;
  export default content;
}

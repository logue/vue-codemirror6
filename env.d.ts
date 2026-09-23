/* rslint-disable @typescript-eslint/no-explicit-any */
/** biome-ignore-all lint/correctness/noUnusedVariables: define variables use. */
/** biome-ignore-all lint/suspicious/noExplicitAny: for custom file type (such as yaml, vue etc.) reading. */

// see rslib.config.ts for details
interface ImportMetaEnv {
  readonly APP_VERSION: string;
  readonly BUILD_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // rslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/ban-types
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    any
  >;
  export default component;
}

declare module '*?source' {
  const content: string;
  export default content;
}

declare module '*.vue?source' {
  const content: string;
  export default content;
}

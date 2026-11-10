// declare module '*.css';
declare module '*.scss';

interface ImportMetaEnv {
  /** package.json version value. */
  readonly APP_VERSION: string;
  /** Last build date */
  readonly BUILD_DATE: string;
  /** Static Site Generation to Markdown */
  readonly SSG_MD: boolean;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>;
  export default component;
}

/** Raw SFC source loaded via `src-demo/loaders/vue-source-loader.js`. */
declare module '*.vue?source' {
  const content: string;
  export default content;
}

/*
// Example when you are using rsbuild-plugin-yaml, comment out below:
declare module '*.yml' {
  const content: Record<string, any>;
  export default content;
}
declare module '*.yaml' {
  const content: Record<string, any>;
  export default content;
}
*/

---
description: Tips for keeping CodeMirror out of your main bundle when building an application that uses vue-codemirror6.
---

# Bundling Tips

CodeMirror and its language packages are relatively large. Splitting them into their own chunks keeps your main bundle small and lets browsers cache the editor separately.

## Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: ['vue-codemirror6'],
          'codemirror-lang': [
            // Add the languages you use.
            '@codemirror/lang-html',
            '@codemirror/lang-javascript',
            '@codemirror/lang-markdown'
          ]
        }
      }
    }
  }
});
```

## Rsbuild

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  splitChunks: {
    cacheGroups: {
      codemirror: {
        test: /node_modules[\\/](@codemirror|codemirror|@lezer)[\\/]/,
        name: 'codemirror',
        chunks: 'all'
      }
    }
  }
});
```

## Lazy loading

If the editor is not needed on the first screen, load it asynchronously:

```ts
import { defineAsyncComponent } from 'vue';

const CodeMirror = defineAsyncComponent(() => import('vue-codemirror6'));
```

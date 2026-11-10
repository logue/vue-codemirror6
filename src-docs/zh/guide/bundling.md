---
description: 构建使用 vue-codemirror6 的应用时,将 CodeMirror 从主包中拆分出来的技巧。
---

# 打包建议

CodeMirror 及其语言包体积相对较大。将它们拆分为独立的 chunk,可以减小主包体积,并让浏览器单独缓存编辑器部分。

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
            // 按需添加使用的语言。
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

## 懒加载

如果首屏不需要编辑器,可以异步加载:

```ts
import { defineAsyncComponent } from 'vue';

const CodeMirror = defineAsyncComponent(() => import('vue-codemirror6'));
```

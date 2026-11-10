> For AI agents: the complete documentation index is available at /vue-codemirror6/ja/llms.txt, the full documentation bundle is available at /vue-codemirror6/ja/llms-full.txt.

# バンドルのヒント

CodeMirror と言語パッケージは比較的サイズが大きいです。別のチャンクに分けると、メインのバンドルを小さく保てるうえ、ブラウザがエディタ部分を個別にキャッシュできます。

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
            // 使う言語を追加してください。
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

## 遅延読み込み

最初の画面でエディタが不要な場合は、非同期で読み込めます。

```ts
import { defineAsyncComponent } from 'vue';

const CodeMirror = defineAsyncComponent(() => import('vue-codemirror6'));
```

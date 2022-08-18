# vue-codemirror6

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/vue-codemirror6/badge)](https://www.jsdelivr.com/package/npm/vue-codemirror6)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-codemirror6.svg?style=flat)](https://www.npmjs.com/package/vue-codemirror6)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/vue-codemirror6/file/README.md)
[![npm version](https://img.shields.io/npm/v/vue-codemirror6.svg)](https://www.npmjs.com/package/vue-codemirror6)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/vue-codemirror6)

A component for using [CodeMirror6](https://codemirror.net/6/) with Vue. Unrelated to [surmon-china's vue-codemirror](https://github.com/surmon-china/vue-codemirror), it is for CodeMirror6.

## Usage

```sh
yarn add vue-codemirror6
```

This component can handle bidirectional binding by `v-model` like a general Vue component.

When using with Vue 2.6, [@vue/composition-api](https://www.npmjs.com/package/@vue/composition-api) is required separately.

```sh
yarn add vue-codemirror6 @vue/composition-api
```

For Vue 2.7 or later, import vue directly like Vue3.

### Props

| Props      | Type                              | Information                                                                                                                                                                                                                      |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| basic      | boolean                           | Use [basicSetup](https://codemirror.net/docs/ref/#codemirror.basicSetup).                                                                                                                                                        |
| minimal    | boolean                           | Use [miniSetup](https://codemirror.net/docs/ref/#codemirror.minimalSetup). If a `basic` prop is also specified, that setting will take precedence.                                                                               |
| dark       | boolean                           | Toggle Darkmode.                                                                                                                                                                                                                 |
| wrap       | boolean                           | Line text wrapping. see [lineWrapping](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping).                                                                                                                         |
| tab        | boolean                           | Enables tab indentation.                                                                                                                                                                                                         |
| theme      | { [selector: string]: StyleSpec } | Specify the theme. For example, if you use [@codemirror/theme-one-dark](https://github.com/codemirror/theme-one-dark), import `oneDark` and put it in this prop.                                                                 |
| readonly   | boolean                           | Makes the cursor visible or you can drag the text but not edit the value.                                                                                                                                                        |
| editable   | boolean                           | When this is set to false, it is similar to `readonly`, except that the cursor is not displayed like the normal pre tag.                                                                                                         |
| lang       | LanguageSupport                   | The language you want to have syntax highlighting. see <https://codemirror.net/6/#languages>                                                                                                                                     |
| phrases    | Record&lt;string, string&gt;      | Specify here if you want to make the displayed character string multilingual. see <https://codemirror.net/6/examples/translate/>                                                                                                 |
| extensions | Extension[]                       | Includes enhancements to extend CodeMirror.                                                                                                                                                                                      |
| linter     | LintSource                        | Set Linter. Enter a linter (eg `esLint([arbitrary rule])` function for `@codemirror / lang-javascript`, `jsonParseLinter()`function for`@codemirror/json`). See the sources for various language libraries for more information. |
| lintGutter | boolean                           | Display 🔴 on the line where there was an error when `linter` was specified. It will not work if `linter` is not specified.                                                                                                      |

Notice: `lang` and `linter` can also be set together in `extensions`. This is defined for usability compatibility with past CodeMirrors.

### Supported Languages

- [`@codemirror/lang-cpp`](https://www.npmjs.com/package/@codemirror/lang-cpp)
- [`@codemirror/lang-html`](https://www.npmjs.com/package/@codemirror/lang-html)
- [`@codemirror/lang-java`](https://www.npmjs.com/package/@codemirror/lang-java)
- [`@codemirror/lang-javascript`](https://www.npmjs.com/package/@codemirror/lang-javascript)
- [`@codemirror/lang-json`](https://www.npmjs.com/package/@codemirror/lang-json)
- [`@codemirror/lang-lezer`](https://www.npmjs.com/package/@codemirror/lang-lezer)
- [`@codemirror/lang-markdown`](https://www.npmjs.com/package/@codemirror/lang-markdown)
- [`@codemirror/lang-php`](https://www.npmjs.com/package/@codemirror/lang-php)
- [`@codemirror/lang-python`](https://www.npmjs.com/package/@codemirror/lang-python)
- [`@codemirror/lang-rust`](https://www.npmjs.com/package/@codemirror/lang-rust)
- [`@codemirror/lang-sql`](https://www.npmjs.com/package/@codemirror/lang-sql)
- [`@codemirror/lang-xml`](https://www.npmjs.com/package/@codemirror/lang-xml)

### Supported Themes

- [`@codemirror/theme-one-dark`](https://github.com/codemirror/theme-one-dark)
- [`upleveled/theme-vs-code-dark-plus`](https://github.com/upleveled/theme-vs-code-dark-plus)
- [`codemirror6-bootstrap-theme`](https://github.com/logue/codemirror6-bootstrap-theme)

## Example

Mark up as follows to make it work at a minimum.

```vue
<template>
  <code-mirror v-model="value" />
</template>

<script>
import { ref, defineComponent } from 'vue';

import CodeMirror from 'vue-codemirror6';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    const value = ref('Cozy lummox gives smart squid who asks for job pen.');

    return { value };
  },
});
</script>
```

### Example using Slots

The contents of the slot will overwrite the existing `v-model`. For this reason, it is recommended to use it when simply displaying with a `readonly` prop without using `v-model`.

Also, insert a `<pre>` tag to prevent the text in the slot from being automatically formatted.

```vue
<template>
  <code-mirror :lang="lang" :linter="linter">
    <pre>
{
  "key": "value"
}</pre
    >
  </code-mirror>
</template>

<script>
import { ref, defineComponent } from 'vue';

import { json, jsonParseLinter } from '@codemirror/lang-json';

import CodeMirror from 'vue-codemirror6';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    const lang = json();
    const linter = jsonParseLinter();
    return { lang, linter };
  },
});
</script>
```

### Full Example

When using as a Markdown editor on [vite-vue2-vuetify-ts-starter](https://github.com/logue/vite-vue2-vuetify-ts-starter).

```vue
<template>
  <code-mirror
    v-model="value"
    basic
    :dark="dark"
    :lang="lang"
    :phrases="phreses"
  />
</template>

<script lang="ts">
import { ref, defineComponent, type Ref } from 'vue';

// Load component
import CodeMirror from 'vue-codemirror6';

// CodeMirror extensions
import type { LanguageSupport } from '@codemirror/language';
import { markdown as md } from '@codemirror/lang-markdown';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /**
     * Get Vuetify instance
     * @see {@link https://github.com/logue/vite-vue2-vuetify-ts-starter | vite-vue2-vuetify-ts-starter}
     */
    const vuetify = useVuetify();

    /** text */
    const value: Ref<string> = ref('');

    /** Dark mode **/
    const dark: Ref<boolean> = ref(
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    /**
     * CodeMirror Language
     *
     * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
     */
    const lang: LanguageSupport = md();

    /**
     * Internationalization Config.
     * In this example, the display language to Japanese.
     * Must be reactive when used in combination with vue-i18n.
     *
     * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
     */
    const phrases: Ref<Record<string, string>> = ref({
      // @codemirror/view
      'Control character': '制御文字',
      // @codemirror/fold
      'Folded lines': '折り畳まれた行',
      'Unfolded lines': '折り畳める行',
      to: '行き先',
      'folded code': '折り畳まれたコード',
      unfold: '折り畳む解除',
      'Fold line': '行を折り畳む',
      'Unfold line': '行の折り畳む解除',
      // @codemirror/search
      'Go to line': '行き先の行',
      go: 'OK',
      Find: '検索',
      Replace: '置き換え',
      next: '▼',
      previous: '▲',
      all: 'すべて',
      'match case': '一致条件',
      regexp: '正規表現',
      replace: '置き換え',
      'replace all': 'すべてを置き換え',
      close: '閉じる',
      'current match': '現在の一致',
      'on line': 'した行',
      // @codemirror/lint
      Diagnostics: 'エラー',
      'No diagnostics': 'エラーなし',
    });

    /** When dark value changed, sync vuetify's dark mode */
    watch(dark, v => (vuetify.theme.dark = v));

    return {
      dark,
      value,
      lang,
      phrases,
    };
  },
});
</script>
```

## Events

| Event   | Description                                                                        |
| ------- | ---------------------------------------------------------------------------------- |
| ready   | When CodeMirror loaded.                                                            |
| focus   | When focus changed.                                                                |
| update  | When CodeMirror state changed                                                      |
| changed | Value changed. (Please implement with `v-model` unless there is a special reason.) |

## Methods

| Method                                                              | Description                                                                                         |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| selection                                                           | Get and set the [EditorSelection](https://codemirror.net/docs/ref/#state.EditorSelection) instance. |
| cursor                                                              | Get and set the cursor location.                                                                    |
| state                                                               | Get and set [EditorState](https://codemirror.net/docs/ref/#state.EditorState).                      |
| focus                                                               | Get and set focus.                                                                                  |
| getRange(from?: number, to?: number)                                | Get the text between the given points in the editor.                                                |
| getLine(number: number)                                             | Get the content of line.                                                                            |
| lineCount()                                                         | Get the number of lines in the editor.                                                              |
| getCursor()                                                         | Retrieve one end of the primary selection.                                                          |
| listSelections()                                                    | Retrieves a list of all current selections.                                                         |
| getSelection()                                                      | Get the currently selected code.                                                                    |
| getSelections()                                                     | The length of the given array should be the same as the number of active selections.                |
| somethingSelected()                                                 | Return true if any text is selected.                                                                |
| replaceRange(replacement: string \| Text, from: number, to: number) | Replace the part of the document between from and to with the given string.                         |
| replaceSelection(replacement: string \| Text)                       | Replace the selection(s) with the given string.                                                     |
| setCursor(position: number)                                         | Set the cursor position.                                                                            |
| setSelection(anchor: number, head?: number)                         | Set a single selection range.                                                                       |
| setSelections(ranges: readonly SelectionRange[], primary?: number)  | Sets a new set of selections.                                                                       |
| extendSelectionsBy(f: Function)                                     | Applies the given function to all existing selections, and calls extendSelections on the result.    |

## Recommendations

Since CodeMirror has a relatively large capacity, when using vite, it is recommended to set it to output as a separate file using the [`manualChunks`](https://vitejs.dev/guide/build.html#chunking-strategy) option at build time as shown below.

```ts
const config: UserConfig = {
  // ...
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ...
          codemirror: [
            // Split CodeMirror code.
            'vue-codemirror6'
            'codemirror',
            '@codemirror/autocomplete',
            '@codemirror/commands',
            '@codemirror/language',
            '@codemirror/lint',
            '@codemirror/search',
            '@codemirror/state',
            '@codemirror/view',
            // Add the following as needed.
            '@codemirror/lang-html',
            '@codemirror/lang-javascript',
            '@codemirror/lang-markdown',
          ],
          // ...
        },
      },
    },
  },
  // ...
};
```

## LICENSE

[MIT](LICENSE)

&copy; 2022 by Logue.

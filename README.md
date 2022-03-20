# vue-codemirror6

[![jsdelivr CDN](https://data.jsdelivr.com/v1/package/npm/vue-codemirror6/badge)](https://www.jsdelivr.com/package/npm/vue-codemirror6)
[![NPM Downloads](https://img.shields.io/npm/dm/vue-codemirror6.svg?style=flat)](https://www.npmjs.com/package/vue-codemirror6)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/vue-codemirror6/file/README.md)
[![npm version](https://img.shields.io/npm/v/vue-codemirror6.svg)](https://www.npmjs.com/package/@uiw/react-codemirror)
[![Open in Gitpod](https://shields.io/badge/Open%20in-Gitpod-green?logo=Gitpod)](https://gitpod.io/#https://github.com/logue/vue-codemirror6)

A component for using [CodeMirror6](https://codemirror.net/6/) with Vue. Unrelated to [surmon-china's vue-codemirror](https://github.com/surmon-china/vue-codemirror), it is for CodeMirror6.

## Usage

This component can handle bidirectional binding by `v-model` like a general Vue component.

### Props

| Props      | Type                              | Information                                                                                                                                                      |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dark       | boolean                           | Toggle Darkmode. If you use Vuetify, I recommend that you enter `$vuetify.theme.dark`.                                                                           |
| theme      | { [selector: string]: StyleSpec } | Specify the theme. For example, if you use [@codemirror/theme-one-dark](https://github.com/codemirror/theme-one-dark), import `oneDark` and put it in this prop. |
| readonly   | boolean                           | Makes the cursor visible or you can drag the text but not edit the value.                                                                                        |
| editable   | boolean                           | When this is set to false, it is similar to `readonly`, except that the cursor is not displayed like the normal pre tag.                                         |
| lang       | LanguageSupport                   | The language you want to have syntax highlighting. see <https://codemirror.net/6/#languages>                                                                     |
| phrases    | Record&lt;string, string&gt;      | Specify here if you want to make the displayed character string multilingual. see <https://codemirror.net/6/examples/translate/>                                 |
| extensions | Extension[]                       | Includes enhancements to extend CodeMirror. Such as [@codemirror/basic-setup](https://github.com/codemirror/basic-setup).                                        |
| linter     | Diagnostic[]                      | Set Linter. see example <https://codesandbox.io/s/f6nb0?file=/src/index.js>                                                                                      |

Notice: `lang` and `linter` can also be set together in `extensions`. This is defined for usability compatibility with past CodeMirrors.

### Events

| name   | Information                                                                           |
| ------ | ------------------------------------------------------------------------------------- |
| viewupdate | CodeMirror ViewUpdate event. see <https://codemirror.net/6/docs/ref/#view.ViewUpdate> |

### Support Languages

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

## Example

Mark up as follows to make it work at a minimum.

```vue
<template>
  <code-mirror v-model="value" />
</template>

<script>
import Vue from 'vue';

import CodeMirror from '@/components/CodeMirror.vue';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
      value: 'The quick brown fox jumps over the lazy dog.',
    };
  },
});
</script>
```

### Example using Slots

The contents of the slot will overwrite the existing `value`. For this reason, it is recommended to use it when simply displaying with a `readonly` prop without using `v-model` or `value`.

Also, insert a `<pre>` tag to prevent the text in the slot from being automatically formatted.

```vue
<template>
  <code-mirror :lang="lang" :editable="false">
    <pre>
{
  "key": "value"
}</pre
    >
  </code-mirror>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

import { json } from '@codemirror/lang-json';

export default Vue.extend({
  components: {
    CodeMirror,
  },
  data() {
    return {
      lang: json(),
    };
  },
});
</script>
```

### Full Example

When using as a Markdown editor on [Vuetify](https://vuetifyjs.com/).

```vue
<template>
  <code-mirror
    v-model="value"
    :lang="lang"
    :phrases="phreses"
    :extensions="extensions"
    :dark="$vuetify.theme.dark"
    @update="onCmUpdate"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// Load component
import CodeMirror from 'vue-codemirror6';

// CodeMirror extensions
import type { LanguageSupport } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from '@codemirror/basic-setup';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';

@Component({ components: { CodeMirror } })
export default class Home extends Vue {
  /** text */
  value: string;

  /**
   * CodeMirror Language
   *
   * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
   */
  lang: LanguageSupport = markdown();

  /**
   * Internationalization Config.
   * In this example, the display language to Japanese.
   *
   * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
   */
  phrases: Record<string, string> = {
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
  };

  /**
   * CodeMirror Extensions
   *
   * @see {@link:https://codemirror.net/6/docs/ref/#state.Extension | Extending Editor State}
   */
  extensions: Extension[] = [
    /** @see {@link:https://codemirror.net/6/docs/ref/#basic-setup | basic-setup} */
    basicSetup,
  ];

  /**
   * CodeMirror Hook View update event
   *
   * @param update - View Update
   *
   * @see {@link https://codemirror.net/6/docs/ref/#view.ViewUpdate|class ViewUpdate}
   */
  onCmUpdate(update: ViewUpdate) {
    console.log(update);
  }
}
</script>
```

## LICENSE

[MIT](LICENSE)

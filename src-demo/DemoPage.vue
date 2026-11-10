<script lang="ts" setup vapor>
import { vue } from '@codemirror/lang-vue';
import { type Ref, ref } from 'vue';

import CodeMirror from '@/index';

import KeyMapDemo from './components/KeyMapDemo.vue';
import KeyMapDemoSrc from './components/KeyMapDemo.vue?source';
import LinterAndCrossBindingDemo from './components/LinterAndCrossBindingDemo.vue';
import LinterAndCrossBindingDemoSrc from './components/LinterAndCrossBindingDemo.vue?source';
import MarkdownDemo from './components/MarkdownDemo.vue';
import MarkdownDemoSrc from './components/MarkdownDemo.vue?source';
import ReadonlyAndDisabledDemo from './components/ReadonlyAndDisabledDemo.vue';
import ReadonlyAndDisabledDemoSrc from './components/ReadonlyAndDisabledDemo.vue?source';
import SlotDemo from './components/SlotDemo.vue';
import SlotDemoSrc from './components/SlotDemo.vue?source';

defineProps<{
  dark: boolean;
}>();

/** Tab identifiers, in display order. */
type TabId = 'markdown' | 'slot' | 'linter' | 'readonly' | 'keymap';

const tabs: { id: TabId; label: string }[] = [
  { id: 'markdown', label: 'Markdown' },
  { id: 'slot', label: 'Slot' },
  { id: 'linter', label: 'Linter & Binding' },
  { id: 'readonly', label: 'Readonly & Disabled' },
  { id: 'keymap', label: 'Key Map' }
];

const isTabId = (value: string | null): value is TabId => tabs.some(tab => tab.id === value);

/** Currently selected tab (`?tab=<id>` selects the initial tab) */
const initialTab = new URLSearchParams(globalThis.location.search).get('tab');
const selected: Ref<TabId> = ref(isTabId(initialTab) ? initialTab : 'markdown');

const onTabSelected = (event: CustomEvent<{ item: HTMLElement & { value: string } }>): void => {
  selected.value = event.detail.item.value as TabId;
};

/** SFC sources shown next to each demo */
const sources: Record<TabId, string> = {
  markdown: MarkdownDemoSrc.trim(),
  slot: SlotDemoSrc.trim(),
  linter: LinterAndCrossBindingDemoSrc.trim(),
  readonly: ReadonlyAndDisabledDemoSrc.trim(),
  keymap: KeyMapDemoSrc.trim()
};
</script>

<template>
  <div class="demo-tabs">
    <cds-tabs :value="selected" @cds-tabs-selected="onTabSelected">
      <cds-tab
        v-for="tab in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        :value="tab.id"
        :aria-controls="`panel-${tab.id}`"
      >
        {{ tab.label }}
      </cds-tab>
    </cds-tabs>
  </div>

  <!-- Panels are rendered with v-if so that only the active editor is mounted and the iframe height follows the active tab. -->
  <section
    v-if="selected === 'markdown'"
    id="panel-markdown"
    class="cds--css-grid demo-panel"
    role="tabpanel"
    aria-labelledby="tab-markdown"
  >
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h2>Markdown Editor</h2>
      <p>
        This is an example of simply pouring text into CodeMirror using
        <code>v-model</code>
        .
        <code>basic</code>
        is an alias for loading
        <cds-link href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank">
          basic-setup
        </cds-link>
        . Use
        <code>wrap</code>
        when you want to use columns (enable text wrapping).
      </p>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <markdown-demo :dark="dark" />
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <cds-inline-notification
        title="Markdown rendering"
        hide-close-button
        kind="info"
        low-contrast
      >
        <span slot="subtitle">
          Markdown is converted to HTML with
          <cds-link href="https://github.com/logue/vue-markdown-wasm" target="_blank">
            vue-markdown-wasm
          </cds-link>
          (
          <cds-link href="https://logue.dev/vue-markdown-wasm" target="_blank">full demo</cds-link>
          ).
        </span>
      </cds-inline-notification>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h3>Source</h3>
      <code-mirror :model-value="sources.markdown" basic readonly wrap :dark="dark" :lang="vue()" />
    </div>
  </section>

  <section
    v-else-if="selected === 'slot'"
    id="panel-slot"
    class="cds--css-grid demo-panel"
    role="tabpanel"
    aria-labelledby="tab-slot"
  >
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h2>Slot Method</h2>
      <p>
        The text is put directly inside the
        <code>&lt;code-mirror&gt;</code>
        tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only
        the text node is used as the value. This does not work with Vue 2.7.
      </p>
      <p>
        It's just for simple syntax highlighting. Do not use it with
        <code>v-model</code>
        .
      </p>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Demo</h3>
      <slot-demo :dark="dark" />
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Source</h3>
      <code-mirror :model-value="sources.slot" basic readonly wrap :dark="dark" :lang="vue()" />
    </div>
  </section>

  <section
    v-else-if="selected === 'linter'"
    id="panel-linter"
    class="cds--css-grid demo-panel"
    role="tabpanel"
    aria-labelledby="tab-linter"
  >
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h2>Linter and Cross Binding</h2>
      <p>
        A JavaScript editor with a linter powered by
        <cds-link href="https://github.com/UziTech/eslint-linter-browserify" target="_blank">
          eslint-linter-browserify
        </cds-link>
        . With the
        <code>gutter</code>
        prop, 🔴 is displayed on lines with errors.
      </p>
      <p>
        <code>@update</code>
        receives the
        <cds-link href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank">
          ViewUpdate
        </cds-link>
        object on every change, and
        <cds-link href="https://codemirror.net/docs/ref/#lint.diagnosticCount" target="_blank">
          diagnosticCount
        </cds-link>
        shows the number of problems found. Editing either the editor or the text area updates the
        other.
      </p>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <linter-and-cross-binding-demo :dark="dark" />
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h3>Source</h3>
      <code-mirror :model-value="sources.linter" basic readonly wrap :dark="dark" :lang="vue()" />
    </div>
  </section>

  <section
    v-else-if="selected === 'readonly'"
    id="panel-readonly"
    class="cds--css-grid demo-panel"
    role="tabpanel"
    aria-labelledby="tab-readonly"
  >
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h2>
        Toggle
        <code>readonly</code>
        and
        <code>disabled</code>
      </h2>
      <p>
        <cds-link
          href="https://codemirror.net/docs/ref/#state.EditorState%5EreadOnly"
          target="_blank"
        >
          <code>readonly</code>
        </cds-link>
        specifies whether the document can be changed. It is similar to
        <code>disabled</code>
        (the inverse of
        <cds-link
          href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable"
          target="_blank"
        >
          <code>editable</code>
        </cds-link>
        ), except that the editor stays focusable. Add the
        <code>disabled</code>
        prop if you want to use it as a simple syntax highlighter.
      </p>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Demo</h3>
      <readonly-and-disabled-demo :dark="dark" />
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Source</h3>
      <code-mirror :model-value="sources.readonly" basic readonly wrap :dark="dark" :lang="vue()" />
    </div>
  </section>

  <section
    v-else-if="selected === 'keymap'"
    id="panel-keymap"
    class="cds--css-grid demo-panel"
    role="tabpanel"
    aria-labelledby="tab-keymap"
  >
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-16">
      <h2>Key Map</h2>
      <p>
        Define your own key bindings with the
        <code>keymap</code>
        prop, an array of
        <cds-link href="https://codemirror.net/docs/ref/#view.KeyBinding" target="_blank">
          KeyBinding
        </cds-link>
        objects. The
        <code>run</code>
        function is called when the key matches; if it returns
        <code>true</code>
        , the default behavior is not executed.
      </p>
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Demo</h3>
      <p>
        Press
        <kbd>Shift+Ctrl+Enter</kbd>
        in the editor and check the console log.
      </p>
      <key-map-demo :dark="dark" />
    </div>
    <div class="cds--sm:col-span-4 cds--md:col-span-8 cds--lg:col-span-8">
      <h3>Source</h3>
      <code-mirror :model-value="sources.keymap" basic readonly wrap :dark="dark" :lang="vue()" />
    </div>
  </section>
</template>

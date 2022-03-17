<template>
  <div ref="editor">
    <template v-if="!$slots.default"><slot /></template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import type { VNode } from 'vue';

import {
  EditorState,
  type Extension,
  type Transaction,
} from '@codemirror/state';
import { EditorView, type ViewUpdate } from '@codemirror/view';
import type { LanguageSupport } from '@codemirror/language';
import type { Diagnostic } from '@codemirror/lint';
import type { StyleSpec } from 'style-mod';

import { compact, merge } from 'lodash';

@Component({ name: 'CodeMirror' })
/** CodeMirror Component */
export default class CodeMirror extends Vue {
  /** Editor */
  private editor!: EditorView;

  /**
   * Theme
   *
   * @see {@link https://codemirror.net/6/examples/styling/ | Example: Styling}
   */
  @Prop({ type: Object, default: () => {} })
  readonly theme!: { [selector: string]: StyleSpec };

  /** Dark Mode */
  @Prop({ type: Boolean, default: false })
  readonly dark!: boolean;

  /**
   * Language Phreses
   *
   * @see {@link https://codemirror.net/6/examples/translate/ | Example: Internationalization}
   */
  @Prop({ type: Object })
  readonly phrases!: Record<string, string>;

  /**
   * Additional Extension
   *
   * @see {@link https://codemirror.net/6/docs/ref/#state.Extension | Extending Editor State}
   */
  @Prop({ type: Array, default: () => [] })
  readonly extensions!: Extension[];

  /**
   * CodeMirror Language
   *
   * @see {@link https://codemirror.net/6/docs/ref/#language | @codemirror/language}
   */
  @Prop({ type: Object })
  readonly lang!: LanguageSupport;

  /**
   * CodeMirror Linter
   *
   * @see {@link https://codemirror.net/6/docs/ref/#lint | @codemirror/lint}
   */
  @Prop({ type: Array, default: () => [] })
  readonly linter!: Diagnostic[];

  /** Input */
  @Prop({ type: String, default: '' })
  readonly value!: string;

  /**
   * Input value changed
   *
   * @see {@link https://codemirror.net/6/docs/migration/#making-changes | Making Changes}
   */
  @Watch('value')
  onValueChanged() {
    /** Previous cursor location */
    const previous = this.editor.state.selection;
    /*
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: this.value,
      },
    });
    */
    this.editor.setState(
      EditorState.create({
        doc: this.value,
        extensions: this.extension,
        selection: previous,
      })
    );
  }

  /** Darkmode */
  @Watch('dark')
  onToggleDarkMode() {
    this.editor.setState(
      EditorState.create({
        doc: this.value,
        extensions: this.extension,
      })
    );
  }

  /** CodeMirror Extension */
  get extension(): Extension[] {
    /** Default extension */
    const ext: Extension[] = compact([
      // ViewUpdate event listener
      EditorView.updateListener.of((update: ViewUpdate) =>
        this.$emit('update', update)
      ),
      // Toggle light/dark mode.
      EditorView.theme(this.theme, { dark: this.dark }),
      // locale settings
      this.phrases ? EditorState.phrases.of(this.phrases) : undefined,
      // Parser language setting
      this.lang ? this.lang : undefined,
    ]);

    if (this.linter.length !== 0) {
      // Append Linter settings
      merge(ext, this.linter);
    }

    if (this.extensions.length !== 0) {
      // Append Extensions (such as basic-setup)
      merge(ext, this.extensions);
    }

    console.debug('[CodeMirror.vue] Loaded extensions:', ext);

    return ext;
  }

  /** When loaded */
  mounted() {
    let value = this.value;
    if (!this.value && this.$slots.default !== undefined) {
      // override text node
      value = this.getChildrenTextContent(this.$slots.default);
    }

    // Register Codemirror
    this.editor = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: this.extension,
      }),
      parent: this.$refs.editor as Element,
      dispatch: (tr: Transaction) => {
        this.editor.update([tr]);

        if (tr.changes.empty) return;
        // to parent binding
        this.$emit('input', this.editor.state.doc.toString());
      },
    });
  }

  /** Destroy */
  beforeDestroy() {
    this.editor.destroy();
  }

  /** Vue node to plain text */
  private getChildrenTextContent(children: VNode[]): string {
    return children
      .map((node: VNode) =>
        node.children
          ? this.getChildrenTextContent(node.children)
          : node.text || '\n'
      )
      .join('');
  }
}
</script>

<template>
  <div ref="editor" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import type { Extension, Transaction } from '@codemirror/state';
import type { LanguageSupport } from '@codemirror/language';
import type { ViewUpdate } from '@codemirror/view';
import type { Diagnostic } from '@codemirror/lint';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { StyleSpec } from 'style-mod';
import merge from 'lodash/merge';

@Component({ name: 'CodeMirror' })
/** CodeMirror Component */
export default class CodeMirror extends Vue {
  /** Editor */
  private editor!: EditorView;

  /** Theme */
  @Prop({ type: Object, default: () => {} })
  readonly theme!: { [selector: string]: StyleSpec };

  /** Dark Mode */
  @Prop({ type: Boolean, default: false })
  readonly dark!: boolean;

  /** Language Phreses */
  @Prop({ type: Object })
  readonly phrases!: Record<string, string>;

  /** Additional Extension */
  @Prop({ type: Array, default: () => [] })
  readonly extensions!: Extension[];

  /** CodeMirror Language */
  @Prop({ type: Object })
  readonly lang!: LanguageSupport;

  /** CodeMirror Linter */
  @Prop({ type: Array, default: () => [] })
  readonly linter!: Diagnostic[];

  /** Input */
  @Prop({ type: String, required: true })
  readonly value!: string;

  /** Input value changed */
  @Watch('value')
  onValueChanged() {
    this.editor.dispatch({
      changes: {
        from: 0,
        to: this.editor.state.doc.length,
        insert: this.value,
      },
    });
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
    const ext = [
      EditorView.updateListener.of((update: ViewUpdate) =>
        this.$emit('update', update)
      ),
      EditorView.theme(this.theme, { dark: this.dark }),
    ];

    if (this.phrases) {
      ext.push(EditorState.phrases.of(this.phrases));
    }

    if (this.lang) {
      ext.push(this.lang);
    }

    if (this.linter.length !== 0) {
      merge(ext, this.linter);
    }

    if (this.extensions.length !== 0) {
      merge(ext, this.extensions);
    }
    return ext;
  }

  /** When loaded */
  mounted() {
    // Register Codemirror
    this.editor = new EditorView({
      state: EditorState.create({
        doc: this.value,
        extensions: this.extension,
      }),
      parent: this.$refs.editor as Element,
      dispatch: (tr: Transaction) => {
        this.editor.update([tr]);

        if (tr.changes.empty) return;
        // Binding
        this.$emit('input', this.editor.state.doc.toString());
      },
    });
  }

  /** Destroy */
  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

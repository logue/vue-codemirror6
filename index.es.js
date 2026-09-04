/**
* vue-codemirror6
*
* @description CodeMirror6 Component for vue2 and vue3.
* @author Logue <logue@hotmail.co.jp>
* @license MIT
* @version 1.7.0
* @see {@link https://github.com/logue/vue-codemirror6}
*/

import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { diagnosticCount as lint_diagnosticCount, forceLinting, lintGutter, linter } from "@codemirror/lint";
import { Compartment, EditorSelection, EditorState, StateEffect } from "@codemirror/state";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { basicSetup, minimalSetup } from "codemirror";
import { computed, defineComponent, h, isVue2, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from "vue-demi";
const adaptOnsV3 = (ons)=>{
    if (!ons) return {};
    return Object.entries(ons).reduce((ret, [key, handler])=>{
        ret[`on${key.charAt(0).toUpperCase()}${key.slice(1)}`] = handler;
        return ret;
    }, {});
};
function h_demi_h(type, options = {}, children) {
    if (isVue2) return h(type, options, children);
    const { props, domProps, on, ...extraOptions } = options;
    const ons = on ? adaptOnsV3(on) : {};
    return h(type, {
        ...extraOptions,
        ...props,
        ...domProps,
        ...ons
    }, children);
}
const slot = (defaultSlots)=>'function' == typeof defaultSlots ? defaultSlots() : defaultSlots ?? [];
const Meta = {
    version: "1.7.0",
    date: "2026-09-04T22:42:05.397Z"
};
const CodeMirror = defineComponent({
    name: 'CodeMirror',
    model: {
        prop: 'modelValue',
        event: 'update:modelValue'
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        theme: {
            type: Object,
            default: ()=>({})
        },
        dark: {
            type: Boolean,
            default: false
        },
        basic: {
            type: Boolean,
            default: false
        },
        minimal: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: void 0
        },
        wrap: {
            type: Boolean,
            default: false
        },
        tab: {
            type: Boolean,
            default: false
        },
        indentUnit: {
            type: String,
            default: void 0
        },
        allowMultipleSelections: {
            type: Boolean,
            default: false
        },
        tabSize: {
            type: Number,
            default: void 0
        },
        lineSeparator: {
            type: String,
            default: void 0
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        extensions: {
            type: Array,
            default: ()=>[]
        },
        phrases: {
            type: Object,
            default: void 0
        },
        lang: {
            type: Object,
            default: void 0
        },
        linter: {
            type: Function,
            default: void 0
        },
        linterConfig: {
            type: Object,
            default: ()=>({})
        },
        forceLinting: {
            type: Boolean,
            default: false
        },
        gutter: {
            type: Boolean,
            default: false
        },
        gutterConfig: {
            type: Object,
            default: void 0
        },
        tag: {
            type: String,
            default: 'div'
        },
        scrollIntoView: {
            type: Boolean,
            default: true
        },
        preserveScrollPosition: {
            type: Boolean,
            default: false
        },
        keymap: {
            type: Array,
            default: ()=>[]
        }
    },
    emits: {
        'update:modelValue': (_value = '')=>true,
        update: (_value)=>true,
        ready: (_value)=>true,
        focus: (_value)=>true,
        change: (_value)=>true,
        destroy: ()=>true
    },
    setup (props, context) {
        const editor = ref();
        const doc = ref(props.modelValue);
        const view = shallowRef(void 0);
        const focus = computed({
            get: ()=>view.value?.hasFocus ?? false,
            set: (f)=>{
                if (f && view.value) view.value.focus();
            }
        });
        const selection = computed({
            get: ()=>view.value?.state.selection,
            set: (selection)=>{
                if (view.value && selection) view.value.dispatch({
                    selection
                });
            }
        });
        const cursor = computed({
            get: ()=>view.value?.state.selection.main.head ?? 0,
            set: (anchor)=>{
                if (view.value) view.value.dispatch({
                    selection: {
                        anchor
                    }
                });
            }
        });
        const json = computed({
            get: ()=>view.value?.state.toJSON(),
            set: (j)=>{
                if (view.value && j) view.value.setState(EditorState.fromJSON(j));
            }
        });
        const length = ref(0);
        const diagnosticCount = ref(0);
        const extensions = computed(()=>{
            const language = new Compartment();
            const tabSize = new Compartment();
            if (props.basic && props.minimal) throw new Error('[Vue CodeMirror] Both basic and minimal cannot be specified.');
            const keymaps = props.keymap?.length ? [
                ...props.keymap
            ] : [];
            if (props.tab) keymaps.push(indentWithTab);
            return [
                props.basic && !props.minimal ? basicSetup : void 0,
                props.minimal && !props.basic ? minimalSetup : void 0,
                EditorView.updateListener.of((update)=>{
                    if (!view.value) return;
                    context.emit('focus', view.value.hasFocus);
                    length.value = view.value.state.doc?.length;
                    if (update.changes.empty || !update.docChanged) return;
                    if (props.linter) {
                        if (props.forceLinting) forceLinting(view.value);
                        diagnosticCount.value = props.linter(view.value).length;
                    }
                    context.emit('update', update);
                }),
                EditorView.theme(props.theme, {
                    dark: props.dark
                }),
                props.wrap ? EditorView.lineWrapping : void 0,
                props.indentUnit ? indentUnit.of(props.indentUnit) : void 0,
                EditorState.allowMultipleSelections.of(props.allowMultipleSelections),
                props.tabSize ? tabSize.of(EditorState.tabSize.of(props.tabSize)) : void 0,
                props.phrases ? EditorState.phrases.of(props.phrases) : void 0,
                EditorState.readOnly.of(props.readonly),
                EditorView.editable.of(!props.disabled),
                props.lineSeparator ? EditorState.lineSeparator.of(props.lineSeparator) : void 0,
                props.lang ? language.of(props.lang) : void 0,
                props.linter ? linter(props.linter, props.linterConfig) : void 0,
                props.linter && props.gutter ? lintGutter(props.gutterConfig) : void 0,
                props.placeholder ? placeholder(props.placeholder) : void 0,
                keymaps.length > 0 ? keymap.of(keymaps) : void 0,
                ...props.extensions
            ].filter((extension)=>Boolean(extension));
        });
        watch(extensions, (exts)=>view.value?.dispatch({
                effects: StateEffect.reconfigure.of(exts)
            }), {
            immediate: true
        });
        watch(()=>props.modelValue, async (value)=>{
            if (!view.value) return;
            if (view.value.composing || view.value.state.doc.toJSON().join(props.lineSeparator ?? '\n') === value) return;
            const isSelectionOutOfRange = !view.value.state.selection.ranges.every((range)=>range.anchor < value.length && range.head < value.length);
            const changes = {
                from: 0,
                to: view.value.state.doc.length,
                insert: value
            };
            const scrollSnapshot = props.preserveScrollPosition ? view.value.scrollSnapshot().map(view.value.state.changes(changes)) : void 0;
            view.value.dispatch({
                changes,
                selection: isSelectionOutOfRange ? {
                    anchor: 0,
                    head: 0
                } : view.value.state.selection,
                scrollIntoView: props.scrollIntoView,
                effects: scrollSnapshot ? [
                    scrollSnapshot
                ] : void 0
            });
        }, {
            immediate: true
        });
        onMounted(async ()=>{
            if (void 0 === globalThis.window || !editor.value) return;
            let value = doc.value;
            if (editor.value.childNodes[0]) {
                if ('' !== doc.value) console.warn('[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values.');
                value = editor.value.childNodes[0].innerText.trim();
            }
            view.value = new EditorView({
                parent: editor.value,
                state: EditorState.create({
                    doc: value,
                    extensions: extensions.value
                }),
                dispatch: (tr)=>{
                    if (!view.value) return;
                    view.value.update([
                        tr
                    ]);
                    if (tr.changes.empty || !tr.docChanged) return;
                    context.emit('update:modelValue', tr.state.doc.toString());
                    context.emit('change', tr.state);
                }
            });
            await nextTick();
            context.emit('ready', {
                view: view.value,
                state: view.value.state,
                container: editor.value
            });
        });
        onUnmounted(()=>{
            if (view.value) {
                view.value.destroy();
                context.emit('destroy');
            }
        });
        const lint = ()=>{
            if (!(props.linter && view.value)) return;
            if (props.forceLinting) forceLinting(view.value);
            diagnosticCount.value = lint_diagnosticCount(view.value.state);
        };
        const forceReconfigure = ()=>{
            view.value?.dispatch({
                effects: StateEffect.reconfigure.of([])
            });
            view.value?.dispatch({
                effects: StateEffect.appendConfig.of(extensions.value)
            });
        };
        const getRange = (from, to)=>view.value?.state.sliceDoc(from, to);
        const getLine = (number)=>view.value?.state.doc.line(number + 1).text;
        const lineCount = ()=>view.value?.state.doc.lines ?? 0;
        const getCursor = ()=>view.value?.state.selection.main.head ?? 0;
        const listSelections = ()=>view.value?.state.selection.ranges ?? [];
        const getSelection = ()=>{
            if (!view.value) return '';
            return view.value.state.sliceDoc(view.value.state.selection.main.from, view.value.state.selection.main.to);
        };
        const getSelections = ()=>{
            const s = view.value?.state;
            if (!s) return [];
            return s.selection.ranges.map((r)=>s.sliceDoc(r.from, r.to));
        };
        const somethingSelected = ()=>view.value?.state.selection.ranges.some((r)=>!r.empty) ?? false;
        const replaceRange = (replacement, from, to)=>{
            if (view.value) view.value.dispatch({
                changes: {
                    from,
                    to,
                    insert: replacement
                }
            });
        };
        const replaceSelection = (replacement)=>{
            if (view.value) view.value.dispatch(view.value.state.replaceSelection(replacement));
        };
        const setCursor = (position)=>{
            if (view.value) view.value.dispatch({
                selection: {
                    anchor: position
                }
            });
        };
        const setSelection = (anchor, head)=>{
            if (view.value) view.value.dispatch({
                selection: {
                    anchor,
                    head
                }
            });
        };
        const setSelections = (ranges, primary)=>{
            if (view.value) view.value.dispatch({
                selection: EditorSelection.create(ranges, primary)
            });
        };
        const extendSelectionsBy = (f)=>{
            if (view.value && selection.value) view.value.dispatch({
                selection: EditorSelection.create(selection.value.ranges.map((r)=>r.extend(f(r))))
            });
        };
        const exposed = {
            editor,
            view,
            cursor,
            selection,
            focus,
            length,
            json,
            diagnosticCount,
            dom: view.value?.contentDOM,
            lint,
            forceReconfigure,
            getRange,
            getLine,
            lineCount,
            getCursor,
            listSelections,
            getSelection,
            getSelections,
            somethingSelected,
            replaceRange,
            replaceSelection,
            setCursor,
            setSelection,
            setSelections,
            extendSelectionsBy
        };
        context.expose(exposed);
        return exposed;
    },
    render () {
        return h_demi_h(this.$props.tag, {
            ref: 'editor',
            class: 'vue-codemirror'
        }, this.$slots.default ? h_demi_h('aside', {
            style: 'display: none;',
            'aria-hidden': 'true'
        }, slot(this.$slots.default)) : void 0);
    }
});
const installCodeMirror = (app)=>{
    app.component('CodeMirror', CodeMirror);
};
export default CodeMirror;
export { Meta, installCodeMirror as install };

//# sourceMappingURL=index.es.js.map
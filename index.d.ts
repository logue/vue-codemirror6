/**
* vue-codemirror6
*
* @description CodeMirror6 Component for vue2 and vue3.
* @author Logue <logue@hotmail.co.jp>
* @license MIT
* @version 1.7.0
* @see {@link https://github.com/logue/vue-codemirror6}
*/

import { App } from 'vue-demi';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { EditorSelection } from '@codemirror/state';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { ExtractPropTypes } from 'vue';
import { KeyBinding } from '@codemirror/view';
import { LanguageSupport } from '@codemirror/language';
import { LintSource } from '@codemirror/lint';
import { PropType } from 'vue-demi';
import { PublicProps } from 'vue';
import { Ref } from 'vue-demi';
import { SelectionRange } from '@codemirror/state';
import { ShallowRef } from 'vue-demi';
import { StateField } from '@codemirror/state';
import type { StyleSpec } from 'style-mod';
import { Text as Text_2 } from '@codemirror/state';
import { ViewUpdate } from '@codemirror/view';
import { WritableComputedRef } from 'vue-demi';

/** CodeMirror Component */
declare const CodeMirror: DefineComponent<ExtractPropTypes<    {
/** Model value */
modelValue: {
type: PropType<string | Text_2>;
default: string;
};
/**
* Theme
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
*/
theme: {
type: PropType<Record<string, StyleSpec>>;
default: () => {};
};
/** Dark Mode */
dark: {
type: BooleanConstructor;
default: boolean;
};
/**
* Use Basic Setup
*
* This will enable the basic setup for the editor.
*
* @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup}
*/
basic: {
type: BooleanConstructor;
default: boolean;
};
/**
* Use Minimal Setup (The basic setting has priority.)
*
* @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup}
*/
minimal: {
type: BooleanConstructor;
default: boolean;
};
/**
* Placeholder
*
* @see {@link https://codemirror.net/docs/ref/#view.placeholder}
*/
placeholder: {
type: PropType<string | HTMLElement>;
default: undefined;
};
/**
* Line wrapping
*
* An extension that enables line wrapping in the editor (by setting CSS white-space to pre-wrap in the content).
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView%5ElineWrapping}
*/
wrap: {
type: BooleanConstructor;
default: boolean;
};
/**
* Allow tab key indent.
*
* This will enable the tab key to indent the current line or selection.
*
* @see {@link https://codemirror.net/examples/tab/}
*/
tab: {
type: BooleanConstructor;
default: boolean;
};
/**
* Tab character
*
* This is the unit of indentation used when the editor is configured to indent with tabs.
* It is also used to determine the size of the tab character when the editor is configured to use tabs for indentation..
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^indentUnit}
*/
indentUnit: {
type: StringConstructor;
default: undefined;
};
/**
* Allow Multiple Selection.
*
* This allows the editor to have multiple selections at the same time.
* This is useful for editing multiple parts of the document at once.
* If this is set to true, the editor will allow multiple selections.
* If this is set to false, the editor will only allow a single selection.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections}
*/
allowMultipleSelections: {
type: BooleanConstructor;
default: boolean;
};
/**
* Tab size
*
* This is the number of spaces that a tab character represents in the editor.
* It is used to determine the size of the tab character when the editor is configured to use tabs for indentation.
* If this is set to a number, the editor will use that number of spaces for each tab character.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^tabSize}
*/
tabSize: {
type: NumberConstructor;
default: undefined;
};
/**
* Set line break (separetor) char.
*
* This is the character that is used to separate lines in the editor.
* It is used to determine the line break character when the editor is configured to use a specific line break character.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^lineSeparator}
*/
lineSeparator: {
type: StringConstructor;
default: undefined;
};
/**
* Readonly
*
* This is a CodeMirror Facet that allows you to set the editor to read-only mode.
* When this is set to true, the editor will not allow any changes to be made to the document.
* This is useful for displaying code that should not be edited, such as documentation or examples.
* If this is set to false, the editor will allow changes to be made to the document.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^readOnly}
*/
readonly: {
type: BooleanConstructor;
default: boolean;
};
/**
* Disable input.
*
* This is the reversed value of the CodeMirror editable.
* Similar to `readonly`, but setting this value to true disables dragging.
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView^editable}
*/
disabled: {
type: BooleanConstructor;
default: boolean;
};
/**
* Additional Extension
*
* You can use this to add any additional extensions that you want to use in the editor.
*
* @see {@link https://codemirror.net/docs/ref/#state.Extension}
*/
extensions: {
type: PropType<Extension[]>;
default: () => never[];
};
/**
* Language Phreses
*
* This is a CodeMirror Facet that allows you to define custom phrases for the editor.
* It can be used to override default phrases or add new ones.
* This is useful for translating the editor to different languages or for customizing the editor's UI.
*
* @see {@link https://codemirror.net/examples/translate/}
*/
phrases: {
type: PropType<Record<string, string>>;
default: undefined;
};
/**
* CodeMirror Language
*
* This is a CodeMirror Facet that allows you to define the language of the editor.
* It can be used to enable syntax highlighting and other language-specific features.
* It is useful for displaying code in a specific language, such as JavaScript, Python, or HTML.
*
* @see {@link https://codemirror.net/docs/ref/#language}
*/
lang: {
type: PropType<LanguageSupport>;
default: undefined;
};
/**
* CodeMirror Linter
*
* This is a CodeMirror Facet that allows you to define a linter for the editor.
* It can be used to check the code for errors and warnings, and to provide feedback to the user.
* It is useful for displaying code in a specific language, such as JavaScript, Python, or HTML.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.linter}
*/
linter: {
type: PropType<LintSource>;
default: undefined;
};
/**
* Linter Config
*
* This is a CodeMirror Facet that allows you to define the configuration for the linter.
* It can be used to specify options for the linter, such as the severity of errors and warnings, and to customize the behavior of the linter.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.linter^config}
*/
linterConfig: {
type: ObjectConstructor;
default: () => {};
};
/**
* Forces any linters configured to run when the editor is idle to run right away.
*
* This is useful for running linters on the initial load of the editor, or when the user has made changes to the code and wants to see the results immediately.
*
* @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
*/
forceLinting: {
type: BooleanConstructor;
default: boolean;
};
/**
* Show Linter Gutter
*
* An area to 🔴 the lines with errors will be displayed.
* This feature is not enabled if `linter` is not specified.
*
* @see {@link https://codemirror.net/docs/ref/#lint.lintGutter}
*/
gutter: {
type: BooleanConstructor;
default: boolean;
};
/**
* Gutter Config
*
* This is a CodeMirror Facet that allows you to define the configuration for the gutter.
* It can be used to specify options for the gutter, such as the size of the gutter, the position of the gutter, and to customize the behavior of the gutter.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.lintGutter^config}
*/
gutterConfig: {
type: ObjectConstructor;
default: undefined;
};
/**
* Using tag
*/
tag: {
type: StringConstructor;
default: string;
};
/**
* Allows an external update to scroll the form.
*
* This is useful for scrolling the editor to a specific position when the user has made changes to the code and wants to see the results immediately.
* If this is set to true, the editor will scroll to the position specified in the transaction.
* If this is set to false, the editor will not scroll to the position specified in the transaction.
*
* @see {@link https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView}
*/
scrollIntoView: {
type: BooleanConstructor;
default: boolean;
};
/**
* Preserve the current scroll position on external updates.
*
* This keeps the editor's own scroll container from jumping when
* `modelValue` is updated from outside the component.
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView.scrollSnapshot}
*/
preserveScrollPosition: {
type: BooleanConstructor;
default: boolean;
};
/**
* Key map
* This is a CodeMirror Facet that allows you to define custom key bindings.
* It can be used to override default key bindings or add new ones.
*
* @see {@link https://codemirror.net/docs/ref/#view.keymap}
*/
keymap: {
type: PropType<KeyBinding[]>;
default: () => never[];
};
}>, {
editor: Ref<HTMLElement | undefined, HTMLElement | undefined>;
view: ShallowRef<EditorView | undefined>;
cursor: WritableComputedRef<number, number>;
selection: WritableComputedRef<EditorSelection | undefined, EditorSelection | undefined>;
focus: WritableComputedRef<boolean, boolean>;
length: Ref<number, number>;
json: WritableComputedRef<Record<string, StateField<unknown>> | undefined, Record<string, StateField<unknown>> | undefined>;
diagnosticCount: Ref<number, number>;
dom: HTMLElement | undefined;
lint: () => void;
forceReconfigure: () => void;
getRange: (from?: number, to?: number) => string | undefined;
getLine: (number: number) => string | undefined;
lineCount: () => number;
getCursor: () => number;
listSelections: () => readonly SelectionRange[];
getSelection: () => string;
getSelections: () => string[];
somethingSelected: () => boolean;
replaceRange: (replacement: string | Text_2, from: number, to: number) => void;
replaceSelection: (replacement: string | Text_2) => void;
setCursor: (position: number) => void;
setSelection: (anchor: number, head?: number) => void;
setSelections: (ranges: readonly SelectionRange[], primary?: number) => void;
extendSelectionsBy: (f: (range: SelectionRange) => number) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
/** Model Update */
'update:modelValue': (_value?: string | Text_2) => true;
/** CodeMirror ViewUpdate */
update: (_value: ViewUpdate) => true;
/** CodeMirror onReady */
ready: (_value: {
view: EditorView;
state: EditorState;
container: HTMLElement;
}) => true;
/** CodeMirror onFocus */
focus: (_value: boolean) => true;
/** State Changed */
change: (_value: EditorState) => true;
/** CodeMirror onDestroy */
destroy: () => true;
}, string, PublicProps, Readonly<ExtractPropTypes<    {
/** Model value */
modelValue: {
type: PropType<string | Text_2>;
default: string;
};
/**
* Theme
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView^theme}
*/
theme: {
type: PropType<Record<string, StyleSpec>>;
default: () => {};
};
/** Dark Mode */
dark: {
type: BooleanConstructor;
default: boolean;
};
/**
* Use Basic Setup
*
* This will enable the basic setup for the editor.
*
* @see {@link https://codemirror.net/docs/ref/#codemirror.basicSetup}
*/
basic: {
type: BooleanConstructor;
default: boolean;
};
/**
* Use Minimal Setup (The basic setting has priority.)
*
* @see {@link https://codemirror.net/docs/ref/#codemirror.minimalSetup}
*/
minimal: {
type: BooleanConstructor;
default: boolean;
};
/**
* Placeholder
*
* @see {@link https://codemirror.net/docs/ref/#view.placeholder}
*/
placeholder: {
type: PropType<string | HTMLElement>;
default: undefined;
};
/**
* Line wrapping
*
* An extension that enables line wrapping in the editor (by setting CSS white-space to pre-wrap in the content).
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView%5ElineWrapping}
*/
wrap: {
type: BooleanConstructor;
default: boolean;
};
/**
* Allow tab key indent.
*
* This will enable the tab key to indent the current line or selection.
*
* @see {@link https://codemirror.net/examples/tab/}
*/
tab: {
type: BooleanConstructor;
default: boolean;
};
/**
* Tab character
*
* This is the unit of indentation used when the editor is configured to indent with tabs.
* It is also used to determine the size of the tab character when the editor is configured to use tabs for indentation..
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^indentUnit}
*/
indentUnit: {
type: StringConstructor;
default: undefined;
};
/**
* Allow Multiple Selection.
*
* This allows the editor to have multiple selections at the same time.
* This is useful for editing multiple parts of the document at once.
* If this is set to true, the editor will allow multiple selections.
* If this is set to false, the editor will only allow a single selection.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections}
*/
allowMultipleSelections: {
type: BooleanConstructor;
default: boolean;
};
/**
* Tab size
*
* This is the number of spaces that a tab character represents in the editor.
* It is used to determine the size of the tab character when the editor is configured to use tabs for indentation.
* If this is set to a number, the editor will use that number of spaces for each tab character.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^tabSize}
*/
tabSize: {
type: NumberConstructor;
default: undefined;
};
/**
* Set line break (separetor) char.
*
* This is the character that is used to separate lines in the editor.
* It is used to determine the line break character when the editor is configured to use a specific line break character.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^lineSeparator}
*/
lineSeparator: {
type: StringConstructor;
default: undefined;
};
/**
* Readonly
*
* This is a CodeMirror Facet that allows you to set the editor to read-only mode.
* When this is set to true, the editor will not allow any changes to be made to the document.
* This is useful for displaying code that should not be edited, such as documentation or examples.
* If this is set to false, the editor will allow changes to be made to the document.
*
* @see {@link https://codemirror.net/docs/ref/#state.EditorState^readOnly}
*/
readonly: {
type: BooleanConstructor;
default: boolean;
};
/**
* Disable input.
*
* This is the reversed value of the CodeMirror editable.
* Similar to `readonly`, but setting this value to true disables dragging.
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView^editable}
*/
disabled: {
type: BooleanConstructor;
default: boolean;
};
/**
* Additional Extension
*
* You can use this to add any additional extensions that you want to use in the editor.
*
* @see {@link https://codemirror.net/docs/ref/#state.Extension}
*/
extensions: {
type: PropType<Extension[]>;
default: () => never[];
};
/**
* Language Phreses
*
* This is a CodeMirror Facet that allows you to define custom phrases for the editor.
* It can be used to override default phrases or add new ones.
* This is useful for translating the editor to different languages or for customizing the editor's UI.
*
* @see {@link https://codemirror.net/examples/translate/}
*/
phrases: {
type: PropType<Record<string, string>>;
default: undefined;
};
/**
* CodeMirror Language
*
* This is a CodeMirror Facet that allows you to define the language of the editor.
* It can be used to enable syntax highlighting and other language-specific features.
* It is useful for displaying code in a specific language, such as JavaScript, Python, or HTML.
*
* @see {@link https://codemirror.net/docs/ref/#language}
*/
lang: {
type: PropType<LanguageSupport>;
default: undefined;
};
/**
* CodeMirror Linter
*
* This is a CodeMirror Facet that allows you to define a linter for the editor.
* It can be used to check the code for errors and warnings, and to provide feedback to the user.
* It is useful for displaying code in a specific language, such as JavaScript, Python, or HTML.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.linter}
*/
linter: {
type: PropType<LintSource>;
default: undefined;
};
/**
* Linter Config
*
* This is a CodeMirror Facet that allows you to define the configuration for the linter.
* It can be used to specify options for the linter, such as the severity of errors and warnings, and to customize the behavior of the linter.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.linter^config}
*/
linterConfig: {
type: ObjectConstructor;
default: () => {};
};
/**
* Forces any linters configured to run when the editor is idle to run right away.
*
* This is useful for running linters on the initial load of the editor, or when the user has made changes to the code and wants to see the results immediately.
*
* @see {@link https://codemirror.net/docs/ref/#lint.forceLinting}
*/
forceLinting: {
type: BooleanConstructor;
default: boolean;
};
/**
* Show Linter Gutter
*
* An area to 🔴 the lines with errors will be displayed.
* This feature is not enabled if `linter` is not specified.
*
* @see {@link https://codemirror.net/docs/ref/#lint.lintGutter}
*/
gutter: {
type: BooleanConstructor;
default: boolean;
};
/**
* Gutter Config
*
* This is a CodeMirror Facet that allows you to define the configuration for the gutter.
* It can be used to specify options for the gutter, such as the size of the gutter, the position of the gutter, and to customize the behavior of the gutter.
* This is useful for providing feedback to the user about the code they are writing.
*
* @see {@link https://codemirror.net/docs/ref/#lint.lintGutter^config}
*/
gutterConfig: {
type: ObjectConstructor;
default: undefined;
};
/**
* Using tag
*/
tag: {
type: StringConstructor;
default: string;
};
/**
* Allows an external update to scroll the form.
*
* This is useful for scrolling the editor to a specific position when the user has made changes to the code and wants to see the results immediately.
* If this is set to true, the editor will scroll to the position specified in the transaction.
* If this is set to false, the editor will not scroll to the position specified in the transaction.
*
* @see {@link https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView}
*/
scrollIntoView: {
type: BooleanConstructor;
default: boolean;
};
/**
* Preserve the current scroll position on external updates.
*
* This keeps the editor's own scroll container from jumping when
* `modelValue` is updated from outside the component.
*
* @see {@link https://codemirror.net/docs/ref/#view.EditorView.scrollSnapshot}
*/
preserveScrollPosition: {
type: BooleanConstructor;
default: boolean;
};
/**
* Key map
* This is a CodeMirror Facet that allows you to define custom key bindings.
* It can be used to override default key bindings or add new ones.
*
* @see {@link https://codemirror.net/docs/ref/#view.keymap}
*/
keymap: {
type: PropType<KeyBinding[]>;
default: () => never[];
};
}>> & Readonly<{
onChange?: ((_value: EditorState) => any) | undefined;
onDestroy?: (() => any) | undefined;
onFocus?: ((_value: boolean) => any) | undefined;
onReady?: ((_value: {
view: EditorView;
state: EditorState;
container: HTMLElement;
}) => any) | undefined;
onUpdate?: ((_value: ViewUpdate) => any) | undefined;
"onUpdate:modelValue"?: ((_value?: string | Text_2 | undefined) => any) | undefined;
}>, {
modelValue: string | Text_2;
theme: Record<string, StyleSpec>;
dark: boolean;
basic: boolean;
minimal: boolean;
placeholder: string | HTMLElement;
wrap: boolean;
tab: boolean;
indentUnit: string;
allowMultipleSelections: boolean;
tabSize: number;
lineSeparator: string;
readonly: boolean;
disabled: boolean;
extensions: Extension[];
phrases: Record<string, string>;
lang: LanguageSupport;
linter: LintSource;
linterConfig: Record<string, any>;
forceLinting: boolean;
gutter: boolean;
gutterConfig: Record<string, any>;
tag: string;
scrollIntoView: boolean;
preserveScrollPosition: boolean;
keymap: KeyBinding[];
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export default CodeMirror;

/**
 * Public API exposed from the CodeMirror component instance.
 *
 * Note: Vue 3 auto-unwraps refs on the component instance proxy,
 * so reactive refs appear as their underlying value types here.
 */
export declare type CodeMirrorExposed = {
    /** Editor DOM element. */
    editor: HTMLElement | undefined;
    /** CodeMirror Editor View. @see {@link https://codemirror.net/docs/ref/#view.EditorView} */
    view: EditorView | undefined;
    /** Cursor position. */
    cursor: number;
    /** Editor selection. @see {@link https://codemirror.net/docs/ref/#state.EditorSelection} */
    selection: EditorSelection | undefined;
    /** Whether the editor has focus. @see {@link https://codemirror.net/docs/ref/#view.EditorView.hasFocus} */
    focus: boolean;
    /** Document text length. */
    length: number;
    /** Serialized editor state. */
    json: Record<string, StateField<unknown>> | undefined;
    /** Number of active lint diagnostics. @see {@link https://codemirror.net/docs/ref/#lint.diagnosticCount} */
    diagnosticCount: number;
    /** Editor content DOM element. */
    dom: Element | undefined;
    /** Forces any linters configured to run when the editor is idle to run right away. */
    lint: () => void;
    /** Deconfigures and re-registers all extensions. @see {@link https://codemirror.net/examples/config/#top-level-reconfiguration} */
    forceReconfigure: () => void;
    /** Get the text between the given points in the editor. */
    getRange: (from?: number, to?: number) => string | undefined;
    /** Get the content of the given line. */
    getLine: (number: number) => string | undefined;
    /** Get the number of lines in the editor. */
    lineCount: () => number;
    /** Retrieve one end of the primary selection. */
    getCursor: () => number;
    /** Retrieves a list of all current selections. */
    listSelections: () => readonly SelectionRange[];
    /** Get the currently selected code. */
    getSelection: () => string;
    /** Get the currently selected code for every selection range. */
    getSelections: () => string[];
    /** Return true if any text is selected. */
    somethingSelected: () => boolean;
    /** Replace the part of the document between from and to with the given string. */
    replaceRange: (replacement: string | Text_2, from: number, to: number) => void;
    /** Replace the selection(s) with the given string. */
    replaceSelection: (replacement: string | Text_2) => void;
    /** Set the cursor position. */
    setCursor: (position: number) => void;
    /** Set a single selection range. */
    setSelection: (anchor: number, head?: number) => void;
    /** Sets a new set of selections. There must be at least one selection in the given array. */
    setSelections: (ranges: readonly SelectionRange[], primary?: number) => void;
    /** Applies the given function to all existing selections, and calls extendSelections on the result. */
    extendSelectionsBy: (f: (range: SelectionRange) => number) => void;
};

/**
 * Vue plugin install function that registers the CodeMirror component globally.
 *
 * @param app - Vue application instance.
 */
export declare const install: (app: App) => void;

/** Build information meta data */
export declare type Meta = {
    /** Version */
    version: string;
    /** Build date */
    date: string;
};

export declare const Meta: Meta = {
    version: __APP_VERSION__,
    date: __BUILD_DATE__,
};

export { }

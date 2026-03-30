/**
 * vue-codemirror6
 *
 * @description CodeMirror6 Component for vue2 and vue3.
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2022-2026 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.4.4
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import{C as e,D as t,E as n,O as r,S as i,T as a,_ as o,a as s,b as c,c as l,d as u,g as d,h as f,i as p,l as m,m as h,o as g,p as _,u as v,v as ee,w as y,x as b,y as x}from"./vendor-BHsNAd9k.js";import{i as S,n as te,r as C,t as w}from"./vue-Bg0yal2V.js";import{B as T,E,F as D,I as O,L as k,N as A,P as j,R as M,a as N,i as P,n as F,o as I,r as L,s as R,t as z}from"./codemirror-TzzWqE6z.js";import{a as B,i as V,n as H,o as U,r as W,t as G}from"./codemirror-lang-0xw3j9Et.js";import{t as K}from"./eslint-linter-browserify-CUgo1UWT.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var q=e=>e?Object.entries(e).reduce((e,[t,n])=>(t=t.charAt(0).toUpperCase()+t.slice(1),t=`on${t}`,{...e,[t]:n}),{}):{};function J(e,t={},n){let{props:r,domProps:i,on:a,...s}=t,c=a?q(a):{};return o(e,{...s,...r,...i,...c},n)}var Y=e=>typeof e==`function`?e():e,X=d({name:`CodeMirror`,model:{prop:`modelValue`,event:`update:modelValue`},props:{modelValue:{type:String,default:``},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},placeholder:{type:String,default:void 0},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},indentUnit:{type:String,default:void 0},allowMultipleSelections:{type:Boolean,default:!1},tabSize:{type:Number,default:void 0},lineSeparator:{type:String,default:void 0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Function,default:void 0},linterConfig:{type:Object,default:()=>({})},forceLinting:{type:Boolean,default:!1},gutter:{type:Boolean,default:!1},gutterConfig:{type:Object,default:void 0},tag:{type:String,default:`div`},scrollIntoView:{type:Boolean,default:!0},preserveScrollPosition:{type:Boolean,default:!1},keymap:{type:Array,default:()=>[]}},emits:{"update:modelValue":(e=``)=>!0,update:e=>!0,ready:e=>!0,focus:e=>!0,change:e=>!0,destroy:()=>!0},setup(e,r){let a=n(),o=n(e.modelValue),s=t(void 0),u=l({get:()=>s.value?.hasFocus??!1,set:e=>{e&&s.value&&s.value.focus()}}),d=l({get:()=>s.value?.state.selection,set:e=>{s.value&&e&&s.value.dispatch({selection:e})}}),f=l({get:()=>s.value?.state.selection.main.head??0,set:e=>{s.value&&s.value.dispatch({selection:{anchor:e}})}}),p=l({get:()=>s.value?.state.toJSON(),set:e=>{s.value&&e&&s.value.setState(M.fromJSON(e))}}),m=n(0),h=n(0),g=l(()=>{let t=new O,n=new O;if(e.basic&&e.minimal)throw Error(`[Vue CodeMirror] Both basic and minimal cannot be specified.`);let i=[];return e.keymap&&e.keymap.length>0&&(i=e.keymap),e.tab&&i.push(R),[e.basic&&!e.minimal?z:void 0,e.minimal&&!e.basic?F:void 0,A.updateListener.of(t=>{s.value&&(r.emit(`focus`,s.value.hasFocus),m.value=s.value.state.doc?.length,!(t.changes.empty||!t.docChanged)&&(e.linter&&(e.forceLinting&&P(s.value),h.value=e.linter(s.value).length),r.emit(`update`,t)))}),A.theme(e.theme,{dark:e.dark}),e.wrap?A.lineWrapping:void 0,e.indentUnit?E.of(e.indentUnit):void 0,M.allowMultipleSelections.of(e.allowMultipleSelections),e.tabSize?n.of(M.tabSize.of(e.tabSize)):void 0,e.phrases?M.phrases.of(e.phrases):void 0,M.readOnly.of(e.readonly),A.editable.of(!e.disabled),e.lineSeparator?M.lineSeparator.of(e.lineSeparator):void 0,e.lang?t.of(e.lang):void 0,e.linter?I(e.linter,e.linterConfig):void 0,e.linter&&e.gutter?N(e.gutterConfig):void 0,e.placeholder?D(e.placeholder):void 0,i.length>0?j.of(i):void 0,...e.extensions].filter(e=>!!e)});i(g,e=>s.value?.dispatch({effects:T.reconfigure.of(e)}),{immediate:!0}),i(()=>e.modelValue,async t=>{if(!s.value||s.value.composing||s.value.state.doc.toJSON().join(e.lineSeparator??`
`)===t)return;let n=!s.value.state.selection.ranges.every(e=>e.anchor<t.length&&e.head<t.length),r={from:0,to:s.value.state.doc.length,insert:t},i=e.preserveScrollPosition?s.value.scrollSnapshot().map(s.value.state.changes(r)):void 0;s.value.dispatch({changes:r,selection:n?{anchor:0,head:0}:s.value.state.selection,scrollIntoView:e.scrollIntoView,effects:i?[i]:void 0})},{immediate:!0}),x(async()=>{if(globalThis.window===void 0||!a.value)return;let e=o.value;a.value.childNodes[0]&&(o.value!==``&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),e=a.value.childNodes[0].innerText.trim()),s.value=new A({parent:a.value,state:M.create({doc:e,extensions:g.value}),dispatch:e=>{s.value&&(s.value.update([e]),!(e.changes.empty||!e.docChanged)&&(r.emit(`update:modelValue`,e.state.doc.toString()),r.emit(`change`,e.state)))}}),await ee(),r.emit(`ready`,{view:s.value,state:s.value.state,container:a.value})}),c(()=>{s.value&&(s.value.destroy(),r.emit(`destroy`))});let _={editor:a,view:s,cursor:f,selection:d,focus:u,length:m,json:p,diagnosticCount:h,dom:s.value?.contentDOM,lint:()=>{!e.linter||!s.value||(e.forceLinting&&P(s.value),h.value=L(s.value.state))},forceReconfigure:()=>{s.value?.dispatch({effects:T.reconfigure.of([])}),s.value?.dispatch({effects:T.appendConfig.of(g.value)})},getRange:(e,t)=>s.value?.state.sliceDoc(e,t),getLine:e=>s.value?.state.doc.line(e+1).text,lineCount:()=>s.value?.state.doc.lines??0,getCursor:()=>s.value?.state.selection.main.head??0,listSelections:()=>s.value?.state.selection.ranges??[],getSelection:()=>s.value?s.value.state.sliceDoc(s.value.state.selection.main.from,s.value.state.selection.main.to):``,getSelections:()=>{let e=s.value?.state;return e?e.selection.ranges.map(t=>e.sliceDoc(t.from,t.to)):[]},somethingSelected:()=>s.value?.state.selection.ranges.some(e=>!e.empty)??!1,replaceRange:(e,t,n)=>{s.value&&s.value.dispatch({changes:{from:t,to:n,insert:e}})},replaceSelection:e=>{s.value&&s.value.dispatch(s.value.state.replaceSelection(e))},setCursor:e=>{s.value&&s.value.dispatch({selection:{anchor:e}})},setSelection:(e,t)=>{s.value&&s.value.dispatch({selection:{anchor:e,head:t}})},setSelections:(e,t)=>{s.value&&s.value.dispatch({selection:k.create(e,t)})},extendSelectionsBy:e=>{s.value&&d.value&&s.value.dispatch({selection:k.create(d.value.ranges.map(t=>t.extend(e(t))))})}};return r.expose(_),_},render(){return J(this.$props.tag,{ref:`editor`,class:`vue-codemirror`},this.$slots.default?J(`aside`,{style:`display: none;`,"aria-hidden":`true`},Y(this.$slots.default)):void 0)}}),Z=d({__name:`KeyMapDemo`,setup(e){let t=n(`Press Shift+Ctrl+Enter here to see the console log.`);return(e,n)=>(b(),v(r(X),{modelValue:t.value,"onUpdate:modelValue":n[0]||=e=>t.value=e,tab:``,basic:``,keymap:[{key:`Shift-Ctrl-Enter`,run:()=>(console.log(`Shift+Ctrl+Enter`),!0)}]},null,8,[`modelValue`,`keymap`]))}}),Q=`<script lang="ts" setup>
import { ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

const temp = ref('Press Shift+Ctrl+Enter here to see the console log.');
<\/script>

<template>
  <code-mirror
    v-model="temp"
    tab
    basic
    :keymap="[
      {
        key: 'Shift-Ctrl-Enter',
        run: () => {
          console.log('Shift+Ctrl+Enter');
          return true;
        },
      },
    ]"
  />
</template>
`,ne={class:`row`},re={class:`col-6`},ie={class:`row mb-3`},ae={class:`col-4`},oe={class:`input-group`},se=[`value`],ce={class:`col-5`},le={class:`input-group`},ue=[`value`],de={class:`col-3`},fe={class:`form-check form-check-inline`},pe={class:`col-6`},me=d({__name:`LinterAndCrossBindingDemo`,props:{dark:Boolean},setup(e){let t=n(),i=n(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`),a=n(!1),o=B(new K.Linter,{languageOptions:{parserOptions:{ecmaVersion:2022,sourceType:`module`}},rules:{semi:[`error`,`never`]}}),s=e=>{a.value=e};return(n,c)=>(b(),u(g,null,[m(`div`,ne,[m(`div`,re,[f(r(X),{ref_key:`cm`,ref:t,modelValue:i.value,"onUpdate:modelValue":c[0]||=e=>i.value=e,dark:e.dark,lang:r(U)(),linter:r(o),basic:``,class:`mb-3`,gutter:``,wrap:``,onFocus:s},null,8,[`modelValue`,`dark`,`lang`,`linter`]),m(`div`,ie,[m(`div`,ae,[m(`div`,oe,[c[3]||=m(`label`,{for:`count`,class:`input-group-text`},`Count`,-1),m(`input`,{id:`count`,type:`text`,value:t.value?.length,class:`form-control`,readonly:``},null,8,se)])]),m(`div`,ce,[m(`div`,le,[c[4]||=m(`label`,{for:`diagnosticCount`,class:`input-group-text`},` Diagnostic Count `,-1),m(`input`,{id:`diagnosticCount`,type:`number`,class:`form-control`,value:t.value?.diagnosticCount,readonly:``},null,8,ue)])]),m(`div`,de,[m(`div`,fe,[y(m(`input`,{id:`focused`,"onUpdate:modelValue":c[1]||=e=>a.value=e,class:`form-check-input`,type:`checkbox`,checked:``,disabled:``},null,512),[[C,a.value]]),c[5]||=m(`label`,{class:`form-check-label`,for:`focused`},`Focused`,-1)])])])]),m(`div`,pe,[y(m(`textarea`,{"onUpdate:modelValue":c[2]||=e=>i.value=e,rows:`4`,class:`form-control`},null,512),[[S,i.value]])])]),c[6]||=m(`p`,null,[m(`kbd`,null,`Ctrl-Shift-m`),h(` ( `),m(`kbd`,null,`Cmd-Shift-m`),h(` on macOS) to show lint panel. `),m(`kbd`,null,`F8`),h(` key shows the next error. `)],-1)],64))}}),he=`<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { javascript, esLint } from '@codemirror/lang-javascript';
// Uses linter.mjs
import eslint from 'eslint-linter-browserify';

import CodeMirror from 'vue-codemirror6';

// Sync Dark mode
defineProps({ dark: Boolean });

/** CodeMirror Instance */
const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref();

/** Demo code */
const value: Ref<string> = ref(\`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);\`);

const focused: Ref<boolean> = ref(false);

/**
 * JavaScript language Linter Setting.
 * Using eslint-linter-browserify
 *
 * @see {@link https://github.com/UziTech/eslint-linter-browserify#eslint-linter-browserify}
 */
const linter = esLint(new eslint.Linter(), {
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
  rules: {
    semi: ['error', 'never'],
  },
});

const onFocus = (f: boolean): void => {
  focused.value = f;
};
<\/script>

<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        ref="cm"
        v-model="value"
        :dark="dark"
        :lang="javascript()"
        :linter="linter"
        basic
        class="mb-3"
        gutter
        wrap
        @focus="onFocus"
      />
      <div class="row mb-3">
        <div class="col-4">
          <div class="input-group">
            <label for="count" class="input-group-text">Count</label>
            <input
              id="count"
              type="text"
              :value="cm?.length"
              class="form-control"
              readonly
            />
          </div>
        </div>
        <div class="col-5">
          <div class="input-group">
            <label for="diagnosticCount" class="input-group-text">
              Diagnostic Count
            </label>
            <input
              id="diagnosticCount"
              type="number"
              class="form-control"
              :value="cm?.diagnosticCount"
              readonly
            />
          </div>
        </div>
        <div class="col-3">
          <div class="form-check form-check-inline">
            <input
              id="focused"
              v-model="focused"
              class="form-check-input"
              type="checkbox"
              checked
              disabled
            />
            <label class="form-check-label" for="focused">Focused</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label, vue/html-self-closing -->
      <textarea v-model="value" rows="4" class="form-control"></textarea>
    </div>
  </div>
  <p>
    <kbd>Ctrl-Shift-m</kbd>
    (
    <kbd>Cmd-Shift-m</kbd>
    on macOS) to show lint panel.
    <kbd>F8</kbd>
    key shows the next error.
  </p>
</template>
`,ge={class:`row`},_e={class:`col-6`},ve={class:`col-6`},ye=d({__name:`MarkdownDemo`,props:{dark:Boolean},setup(e){let t=n(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);return(n,i)=>(b(),u(`div`,ge,[m(`div`,_e,[f(r(X),{ref:`cm`,modelValue:t.value,"onUpdate:modelValue":i[0]||=e=>t.value=e,dark:e.dark,lang:r(W)(),wrap:``,basic:``},null,8,[`modelValue`,`dark`,`lang`])]),m(`div`,ve,[f(r(w),{modelValue:t.value,"onUpdate:modelValue":i[1]||=e=>t.value=e,class:`markdown-body`,"data-color-mode":e.dark?`dark`:`light`},null,8,[`modelValue`,`data-color-mode`])])]))}}),be=`<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { markdown } from '@codemirror/lang-markdown';
import VueMarkdown from 'vue-markdown-wasm';

import CodeMirror from 'vue-codemirror6';

/** Demo text */
const input: Ref<string> = ref(\`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\`);

// Sync dark mode
defineProps({ dark: Boolean });
<\/script>

<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        ref="cm"
        v-model="input"
        :dark="dark"
        :lang="markdown()"
        wrap
        basic
      />
    </div>
    <div class="col-6">
      <vue-markdown
        v-model="input"
        class="markdown-body"
        :data-color-mode="dark ? 'dark' : 'light'"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.min.css);

.markdown-body {
  // Override prefers-color-scheme to respect Vue's dark mode setting
  @media (prefers-color-scheme: dark) {
    &[data-color-mode='light'] {
      color-scheme: light;
      --color-prettylights-syntax-comment: #57606a;
      --color-prettylights-syntax-constant: #0550ae;
      --color-prettylights-syntax-entity: #6639ba;
      --color-prettylights-syntax-storage-modifier-import: #24292f;
      --color-prettylights-syntax-entity-tag: #116329;
      --color-prettylights-syntax-keyword: #cf222e;
      --color-prettylights-syntax-string: #0a3069;
      --color-prettylights-syntax-variable: #953800;
      --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
      --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
      --color-prettylights-syntax-invalid-illegal-bg: #82071e;
      --color-prettylights-syntax-carriage-return-text: #f6f8fa;
      --color-prettylights-syntax-carriage-return-bg: #cf222e;
      --color-prettylights-syntax-string-regexp: #116329;
      --color-prettylights-syntax-markup-list: #3b2300;
      --color-prettylights-syntax-markup-heading: #0550ae;
      --color-prettylights-syntax-markup-italic: #24292f;
      --color-prettylights-syntax-markup-bold: #24292f;
      --color-prettylights-syntax-markup-deleted-text: #82071e;
      --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
      --color-prettylights-syntax-markup-inserted-text: #116329;
      --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
      --color-prettylights-syntax-markup-changed-text: #953800;
      --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
      --color-prettylights-syntax-markup-ignored-text: #eaeef2;
      --color-prettylights-syntax-markup-ignored-bg: #0550ae;
      --color-prettylights-syntax-meta-diff-range: #8250df;
      --color-prettylights-syntax-brackethighlighter-angle: #57606a;
      --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
      --color-prettylights-syntax-constant-other-reference-link: #0a3069;
      --color-fg-default: #24292f;
      --color-fg-muted: #57606a;
      --color-fg-subtle: #6e7781;
      --color-canvas-default: #ffffff;
      --color-canvas-subtle: #f6f8fa;
      --color-border-default: #d0d7de;
      --color-border-muted: hsla(210, 18%, 87%, 1);
      --color-neutral-muted: rgba(175, 184, 193, 0.2);
      --color-accent-fg: #0969da;
      --color-accent-emphasis: #0969da;
      --color-attention-subtle: #fff8c5;
      --color-danger-fg: #cf222e;
    }
  }

  @media (prefers-color-scheme: light) {
    &[data-color-mode='dark'] {
      color-scheme: dark;
      --color-prettylights-syntax-comment: #8b949e;
      --color-prettylights-syntax-constant: #79c0ff;
      --color-prettylights-syntax-entity: #d2a8ff;
      --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
      --color-prettylights-syntax-entity-tag: #7ee787;
      --color-prettylights-syntax-keyword: #ff7b72;
      --color-prettylights-syntax-string: #a5d6ff;
      --color-prettylights-syntax-variable: #ffa657;
      --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
      --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
      --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
      --color-prettylights-syntax-carriage-return-text: #f0f6fc;
      --color-prettylights-syntax-carriage-return-bg: #b62324;
      --color-prettylights-syntax-string-regexp: #7ee787;
      --color-prettylights-syntax-markup-list: #f2cc60;
      --color-prettylights-syntax-markup-heading: #1f6feb;
      --color-prettylights-syntax-markup-italic: #c9d1d9;
      --color-prettylights-syntax-markup-bold: #c9d1d9;
      --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
      --color-prettylights-syntax-markup-deleted-bg: #67060c;
      --color-prettylights-syntax-markup-inserted-text: #aff5b4;
      --color-prettylights-syntax-markup-inserted-bg: #033a16;
      --color-prettylights-syntax-markup-changed-text: #ffdfb6;
      --color-prettylights-syntax-markup-changed-bg: #5a1e02;
      --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
      --color-prettylights-syntax-markup-ignored-bg: #1158c7;
      --color-prettylights-syntax-meta-diff-range: #d2a8ff;
      --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
      --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
      --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
      --color-fg-default: #c9d1d9;
      --color-fg-muted: #8b949e;
      --color-fg-subtle: #6e7681;
      --color-canvas-default: #0d1117;
      --color-canvas-subtle: #161b22;
      --color-border-default: #30363d;
      --color-border-muted: #21262d;
      --color-neutral-muted: rgba(110, 118, 129, 0.4);
      --color-accent-fg: #58a6ff;
      --color-accent-emphasis: #1f6feb;
      --color-attention-subtle: rgba(187, 128, 9, 0.15);
      --color-danger-fg: #f85149;
    }
  }

  h1 > a.anchor,
  h2 > a.anchor,
  h3 > a.anchor,
  h4 > a.anchor,
  h5 > a.anchor,
  h6 > a.anchor {
    display: block;
    float: left;
    height: 1.2em;
    width: 1em;
    margin-left: -1em;
    position: relative;
    outline: none;
  }
  /*.anchor:target { background: yellow; }*/
  h1 > a.anchor:before,
  h2 > a.anchor:before,
  h3 > a.anchor:before,
  h4 > a.anchor:before,
  h5 > a.anchor:before,
  h6 > a.anchor:before {
    visibility: hidden;
    position: absolute;
    opacity: 0.2;
    right: 0;
    top: 0;
    width: 1.2em;
    line-height: inherit;
    content: '🔗';
  }
  h1 > a.anchor:hover:before,
  h2 > a.anchor:hover:before,
  h3 > a.anchor:hover:before,
  h4 > a.anchor:hover:before,
  h5 > a.anchor:hover:before,
  h6 > a.anchor:hover:before {
    visibility: visible;
    opacity: 0.8;
  }
  h1:hover .anchor:before,
  h2:hover .anchor:before,
  h3:hover .anchor:before,
  h4:hover .anchor:before,
  h5:hover .anchor:before,
  h6:hover .anchor:before {
    visibility: visible;
  }
}
</style>
`,xe={class:`form-check form-switch`},Se=[`aria-checked`],Ce={class:`form-check form-switch`},we=[`aria-checked`],Te=d({__name:`ReadonlyAndDisabledDemo`,props:{dark:Boolean},setup(t){let i=n(!0),a=n(!1);return(n,o)=>(b(),u(g,null,[m(`div`,xe,[y(m(`input`,{id:`readonly`,"onUpdate:modelValue":o[0]||=e=>i.value=e,type:`checkbox`,class:`form-check-input`,role:`switch`,"aria-checked":i.value},null,8,Se),[[C,i.value]]),o[2]||=m(`label`,{class:`form-check-label`,for:`readonly`},`Readonly`,-1)]),m(`div`,Ce,[y(m(`input`,{id:`disabled`,"onUpdate:modelValue":o[1]||=e=>a.value=e,type:`checkbox`,class:`form-check-input`,role:`switch`,"aria-checked":a.value},null,8,we),[[C,a.value]]),o[3]||=m(`label`,{class:`form-check-label`,for:`disabled`},`Disabled`,-1)]),f(r(X),{dark:t.dark,basic:``,readonly:i.value,disabled:a.value},{default:e(()=>[...o[4]||=[m(`pre`,null,`色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず`,-1)]]),_:1},8,[`dark`,`readonly`,`disabled`])],64))}}),Ee=`<script setup lang="ts">
import { ref, type Ref } from 'vue';

import CodeMirror from 'vue-codemirror6';

/** Readonly */
const isReadonly: Ref<boolean> = ref(true);
/** Disabled (Not Editable) */
const isDisabled: Ref<boolean> = ref(false);

// Sync dark mode
defineProps({ dark: Boolean });
<\/script>

<!-- eslint-disable no-irregular-whitespace -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="form-check form-switch">
    <input
      id="readonly"
      v-model="isReadonly"
      type="checkbox"
      class="form-check-input"
      role="switch"
      :aria-checked="isReadonly"
    />
    <label class="form-check-label" for="readonly">Readonly</label>
  </div>
  <div class="form-check form-switch">
    <input
      id="disabled"
      v-model="isDisabled"
      type="checkbox"
      class="form-check-input"
      role="switch"
      :aria-checked="isDisabled"
    />
    <label class="form-check-label" for="disabled">Disabled</label>
  </div>
  <code-mirror :dark="dark" basic :readonly="isReadonly" :disabled="isDisabled">
    <pre>
色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず</pre
    >
  </code-mirror>
</template>
`,De=d({__name:`SlotDemo`,props:{dark:Boolean},setup(t){return(n,i)=>(b(),v(r(X),{dark:t.dark,lang:r(G)(),linter:r(H)(),basic:``,readonly:``},{default:e(()=>[...i[0]||=[m(`pre`,null,`{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 for Vue3 and Vue2 component"
}`,-1)]]),_:1},8,[`dark`,`lang`,`linter`]))}}),Oe=`<script setup lang="ts">
import { json, jsonParseLinter } from '@codemirror/lang-json';

import CodeMirror from 'vue-codemirror6';

// Sync Dark mode
defineProps({ dark: Boolean });
<\/script>

<!-- prettier-ignore -->
<template>
  <code-mirror
    :dark="dark"
    :lang="json()"
    :linter="jsonParseLinter()"
    basic
    readonly
  >
    <pre>{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 for Vue3 and Vue2 component"
}</pre
    >
  </code-mirror>
</template>
`,ke={class:`container`},Ae={class:`mb-5`},je={class:`mb-5`},Me={class:`mb-5`},Ne={class:`mb-5`},Pe={class:`row`},$={class:`col-sm`},Fe={class:`col-sm`},Ie={class:`mb-5`},Le={class:`row`},Re={class:`col-sm`},ze={class:`col-sm`},Be=d({__name:`DemoPage`,setup(e){let t=p(),n=be.trim(),i=Oe.trim(),o=Ee.trim(),s=he.trim(),c=Q.trim();return(e,l)=>(b(),u(`div`,ke,[m(`section`,Ae,[l[5]||=m(`h2`,null,`Markdown Editor Demo`,-1),l[6]||=m(`p`,null,[h(` This is an example of simply pouring text into CodeMirror using `),m(`code`,null,`v-model`),h(` . `)],-1),l[7]||=m(`p`,null,[m(`code`,null,`basic`),h(` is an alias for loading `),m(`a`,{href:`https://codemirror.net/6/docs/ref/#basic-setup`,target:`_blank`},` basic-setup `),h(` . `),m(`br`),h(` Use `),m(`code`,null,`wrap`),h(` when you want to use columns. (Enable text wrapping) `)],-1),f(r(X),{modelValue:r(n),"onUpdate:modelValue":l[0]||=e=>a(n)?n.value=e:null,dark:r(t),lang:r(V)(),basic:``,wrap:``,readonly:``},null,8,[`modelValue`,`dark`,`lang`]),l[8]||=m(`h3`,null,`Demo`,-1),f(ye,{class:`mb-3`,dark:r(t)},null,8,[`dark`]),l[9]||=m(`div`,{class:`alert alert-info d-flex align-items-center my-3`,role:`alert`},[m(`div`,{class:`bi flex-shrink-0 me-2 fs-2`,role:`img`,"aria-label":`Info:`},[m(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`32`,height:`32`,fill:`currentColor`,class:`bi bi-info-circle`,viewBox:`0 0 16 16`},[m(`path`,{d:`M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z`}),m(`path`,{d:`m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z`})])]),m(`div`,null,[h(` The process of converting Markdown to HTML uses `),m(`a`,{href:`https://github.com/logue/vue-markdown-wasm`,target:`_blank`},` vue-markdown-wasm `),h(` . `),m(`br`),h(` Full demo is `),m(`a`,{href:`https://logue.dev/vue-markdown-wasm`,target:`_blank`},`here`),h(` . `)])],-1)]),m(`section`,je,[l[10]||=m(`h2`,null,`Slot Method`,-1),l[11]||=m(`p`,null,[h(` In this sample, the text is put directly inside the `),m(`code`,null,`<code-mirror>`),h(` tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. In addition, it does not work with Vue2.7. `)],-1),l[12]||=m(`p`,null,[h(` It's just for simple syntax highlighting. Do not use with `),m(`code`,null,`v-model`),h(` . `)],-1),f(r(X),{modelValue:r(i),"onUpdate:modelValue":l[1]||=e=>a(i)?i.value=e:null,dark:r(t),lang:r(V)(),basic:``,wrap:``,readonly:``},null,8,[`modelValue`,`dark`,`lang`]),l[13]||=m(`h3`,null,`Sample`,-1),f(De,{dark:r(t)},null,8,[`dark`])]),m(`section`,Me,[l[14]||=m(`h2`,null,`Linter and cross binding demo`,-1),l[15]||=m(`p`,null,`This is a sample using JavaScript and linter.`,-1),l[16]||=m(`p`,null,[h(` When using `),m(`code`,null,`gutter`),h(` prop, 🔴 is displayed on the line with the error. `)],-1),l[17]||=m(`p`,null,[h(` This sample uses `),m(`a`,{href:`https://github.com/UziTech/eslint-linter-browserify`,target:`_blank`},` eslint-linter-browserify `),h(` for the eslint linter. `)],-1),f(r(X),{modelValue:r(s),"onUpdate:modelValue":l[2]||=e=>a(s)?s.value=e:null,dark:r(t),lang:r(V)(),basic:``,wrap:``,readonly:``},null,8,[`modelValue`,`dark`,`lang`]),l[18]||=m(`h3`,null,`Sample`,-1),l[19]||=m(`p`,null,`Make sure you see 🔴 when you change the value to get an error.`,-1),l[20]||=m(`p`,null,[h(` The value of `),m(`code`,null,`@update`),h(` gets the `),m(`a`,{href:`https://codemirror.net/6/docs/ref/#view.ViewUpdate`,target:`_blank`},` ViewUpdate `),h(` object at that time when there is any update in the target form. `)],-1),l[21]||=m(`p`,null,[h(` In this demo code, the `),m(`a`,{href:`https://codemirror.net/docs/ref/#lint.diagnosticCount`,target:`_blank`},` diagnosticCount `),h(` function is used to display the count of locations where grammatical errors are found. `)],-1),f(me,{dark:r(t)},null,8,[`dark`]),l[22]||=m(`p`,null,`Also, make sure that changing either value reflects that value.`,-1)]),m(`section`,Ne,[l[24]||=_(`<h2> Toggle <code>readonly</code> and <code>disabled</code> a demo </h2><p><a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>readonly</code></a> a specifies whether the state is rewritable or not. Similar to <code>disabled</code> (Inverse value of <a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>editable</code></a> ) , except that it is focusable. In short, add <code>disabled</code> prop to if you want to use it as a simple syntax highlighter. </p>`,2),m(`div`,Pe,[m(`div`,$,[f(r(X),{modelValue:r(o),"onUpdate:modelValue":l[3]||=e=>a(o)?o.value=e:null,dark:r(t),lang:r(V)(),basic:``,wrap:``,readonly:``},null,8,[`modelValue`,`dark`,`lang`])]),m(`div`,Fe,[l[23]||=m(`h3`,null,`Demo`,-1),f(Te,{dark:r(t)},null,8,[`dark`])])])]),m(`section`,Ie,[l[27]||=m(`h2`,null,`Key Map Demo`,-1),l[28]||=m(`p`,null,[h(` This is a sample that allows you to define your own keymap. The `),m(`code`,null,`keymap`),h(` prop is an array of objects that define the keymap. `)],-1),l[29]||=m(`p`,null,[h(` The `),m(`code`,null,`run`),h(` function is called when the keymap is matched. If it returns `),m(`code`,null,`true`),h(` , the default behavior of the keymap is not executed. `)],-1),m(`div`,Le,[m(`div`,Re,[f(r(X),{modelValue:r(c),"onUpdate:modelValue":l[4]||=e=>a(c)?c.value=e:null,dark:r(t),lang:r(V)(),basic:``,wrap:``,readonly:``},null,8,[`modelValue`,`dark`,`lang`])]),m(`div`,ze,[l[25]||=m(`h3`,null,`Demo`,-1),l[26]||=m(`p`,null,`Press Shift+Ctrl+Enter to see the console log.`,-1),f(Z)])])])]))}}),Ve=d({__name:`ToggleTheme`,setup(e){let t=p(),n=s(t);return i(()=>t.value,e=>document.documentElement.setAttribute(`data-bs-theme`,e?`dark`:`light`),{immediate:!0}),(e,t)=>(b(),u(`a`,{href:`#`,"aria-label":`Toggle Dark Mode`,onClick:t[0]||=e=>r(n)()},[...t[1]||=[m(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`16`,height:`16`,fill:`currentColor`,class:`bi bi-circle-half`,viewBox:`0 0 16 16`},[m(`path`,{d:`M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z`})],-1)]]))}}),He={class:`navbar navbar-expand-md bg-dark`,"data-bs-theme":`dark`},Ue={class:`container-fluid d-flex justify-content-between`},We={id:`navbarCollapse`,class:`collapse navbar-collapse flex-grow-0`},Ge={class:`navbar-nav`},Ke={class:`nav-item`},qe={class:`flex-glow-0 pt-4 bg-body`};te(d({__name:`App`,setup(e){return(e,t)=>(b(),u(g,null,[m(`nav`,He,[m(`div`,Ue,[t[1]||=m(`a`,{class:`navbar-brand`,href:`#`},`Vue CodeMirror6`,-1),t[2]||=m(`button`,{class:`navbar-toggler`,type:`button`,"data-bs-toggle":`collapse`,"data-bs-target":`#navbarCollapse`,"aria-controls":`navbarCollapse`,"aria-expanded":`false`,"aria-label":`Toggle navigation`},[m(`span`,{class:`navbar-toggler-icon`})],-1),m(`div`,We,[m(`ul`,Ge,[t[0]||=m(`li`,{class:`nav-item`},[m(`a`,{class:`nav-link`,href:`https://github.com/logue/vue-codemirror6`},[m(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`16`,height:`16`,fill:`currentColor`,class:`bi bi-github`,viewBox:`0 0 16 16`},[m(`path`,{d:`M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z`})])])],-1),m(`li`,Ke,[f(Ve,{class:`nav-link`,attribute:`data-bs-theme`})])])])])]),t[3]||=m(`header`,{class:`bg-body-tertiary`},[m(`div`,{class:`container py-3`},[m(`h1`,null,`Vue CodeMirror6 Demo`),m(`p`,{class:`lead`},[h(` A rough demo of Vue CodeMirror6 in action. You can switch between dark modes from the `),m(`i`,{class:`bi bi-circle-half`}),h(` icon in the upper right. `)])])],-1),m(`main`,qe,[f(Be)]),t[4]||=m(`footer`,{class:`footer mt-auto py-3 mb-0 bg-body-tertiary`},[m(`div`,{class:`container mb-0`},[h(` © 2022-2026 by `),m(`a`,{href:`http://logue.dev/`},`Logue`),h(` . Licensed under the `),m(`a`,{href:`http://opensource.org/licenses/mit-license.php`},`MIT License`),h(` . `)])],-1)],64))}})).mount(`#app`);
/**
 * vue-codemirror6
 *
 * @description CodeMirror6 Component for vue2 and vue3.
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2022-2026 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.4.3
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import{k as le,l as y,b as g,w as L,o as re,n as se,m as ie,s as de,f as C,p as k,q,u as i,v as x,F as O,x as e,y as p,z as $,A as E,B as ce,C as s,D as ue,E as I,i as V,G as me,H as fe}from"./vue-B5bV08aL.js";import{e as pe,j as he,m as ge,a as ve,b as be,v as D}from"./codemirror-lang-BrHmDei9.js";import{y as P,z as ye}from"./vendor-D8Uh-CEA.js";import{S as B,E as M,u as w,y as ke,z as we,A as xe,B as U,t as Se,D as R,F as Ce,G as Ve,H as De,o as Me,I as $e,l as A}from"./codemirror-BBJYiDYK.js";import{e as _e}from"./eslint-linter-browserify-BxN065zk.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&d(f)}).observe(document,{childList:!0,subtree:!0});function a(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function d(t){if(t.ep)return;t.ep=!0;const c=a(t);fetch(t.href,c)}})();const je=n=>n?Object.entries(n).reduce((l,[a,d])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...l,[a]:d}),{}):{};function z(n,l={},a){const{props:d,domProps:t,on:c,...f}=l,m=c?je(c):{};return le(n,{...f,...d,...t,...m},a)}const Be=n=>typeof n=="function"?n():n,v=y({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},placeholder:{type:String,default:void 0},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},indentUnit:{type:String,default:void 0},allowMultipleSelections:{type:Boolean,default:!1},tabSize:{type:Number,default:void 0},lineSeparator:{type:String,default:void 0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Function,default:void 0},linterConfig:{type:Object,default:()=>({})},forceLinting:{type:Boolean,default:!1},gutter:{type:Boolean,default:!1},gutterConfig:{type:Object,default:void 0},tag:{type:String,default:"div"},scrollIntoView:{type:Boolean,default:!0},keymap:{type:Array,default:()=>[]}},emits:{"update:modelValue":(n="")=>!0,update:n=>!0,ready:n=>!0,focus:n=>!0,change:n=>!0,destroy:()=>!0},setup(n,l){const a=g(),d=g(n.modelValue),t=de(void 0),c=C({get:()=>t.value?.hasFocus??!1,set:r=>{r&&t.value&&t.value.focus()}}),f=C({get:()=>t.value?.state.selection,set:r=>{t.value&&r&&t.value.dispatch({selection:r})}}),m=C({get:()=>t.value?.state.selection.main.head??0,set:r=>{t.value&&t.value.dispatch({selection:{anchor:r}})}}),o=C({get:()=>t.value?.state.toJSON(),set:r=>{t.value&&r&&t.value.setState(w.fromJSON(r))}}),h=g(0),_=g(0),j=C(()=>{const r=new R,u=new R;if(n.basic&&n.minimal)throw new Error("[Vue CodeMirror] Both basic and minimal cannot be specified.");let b=[];return n.keymap&&n.keymap.length>0&&(b=n.keymap),n.tab&&b.push(ke),[n.basic&&!n.minimal?we:void 0,n.minimal&&!n.basic?xe:void 0,M.updateListener.of(S=>{t.value&&(l.emit("focus",t.value.hasFocus),h.value=t.value.state.doc?.length,!(S.changes.empty||!S.docChanged)&&(n.linter&&(n.forceLinting&&U(t.value),_.value=n.linter(t.value).length),l.emit("update",S)))}),M.theme(n.theme,{dark:n.dark}),n.wrap?M.lineWrapping:void 0,n.indentUnit?Se.of(n.indentUnit):void 0,w.allowMultipleSelections.of(n.allowMultipleSelections),n.tabSize?u.of(w.tabSize.of(n.tabSize)):void 0,n.phrases?w.phrases.of(n.phrases):void 0,w.readOnly.of(n.readonly),M.editable.of(!n.disabled),n.lineSeparator?w.lineSeparator.of(n.lineSeparator):void 0,n.lang?r.of(n.lang):void 0,n.linter?Ce(n.linter,n.linterConfig):void 0,n.linter&&n.gutter?Ve(n.gutterConfig):void 0,n.placeholder?De(n.placeholder):void 0,b.length>0?Me.of(b):void 0,...n.extensions].filter(S=>!!S)});L(j,r=>t.value?.dispatch({effects:B.reconfigure.of(r)}),{immediate:!0}),L(()=>n.modelValue,async r=>{if(!t.value||t.value.composing||t.value.state.doc.toJSON().join(n.lineSeparator??`
`)===r)return;const u=!t.value.state.selection.ranges.every(b=>b.anchor<r.length&&b.head<r.length);t.value.dispatch({changes:{from:0,to:t.value.state.doc.length,insert:r},selection:u?{anchor:0,head:0}:t.value.state.selection,scrollIntoView:n.scrollIntoView})},{immediate:!0}),re(async()=>{if(globalThis.window===void 0||!a.value)return;let r=d.value;a.value.childNodes[0]&&(d.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),r=a.value.childNodes[0].innerText.trim()),t.value=new M({parent:a.value,state:w.create({doc:r,extensions:j.value}),dispatch:u=>{t.value&&(t.value.update([u]),!(u.changes.empty||!u.docChanged)&&(l.emit("update:modelValue",u.state.doc.toString()),l.emit("change",u.state)))}}),await se(),l.emit("ready",{view:t.value,state:t.value.state,container:a.value})}),ie(()=>{t.value&&(t.value.destroy(),l.emit("destroy"))});const F=()=>{!n.linter||!t.value||(n.forceLinting&&U(t.value),_.value=$e(t.value.state))},N=()=>{t.value?.dispatch({effects:B.reconfigure.of([])}),t.value?.dispatch({effects:B.appendConfig.of(j.value)})},J=(r,u)=>t.value?.state.sliceDoc(r,u),W=r=>t.value?.state.doc.line(r+1).text,K=()=>t.value?.state.doc.lines??0,G=()=>t.value?.state.selection.main.head??0,H=()=>t.value?.state.selection.ranges??[],Y=()=>t.value?t.value.state.sliceDoc(t.value.state.selection.main.from,t.value.state.selection.main.to):"",Q=()=>{const r=t.value?.state;return r?r.selection.ranges.map(u=>r.sliceDoc(u.from,u.to)):[]},X=()=>t.value?.state.selection.ranges.some(r=>!r.empty)??!1,Z=(r,u,b)=>{t.value&&t.value.dispatch({changes:{from:u,to:b,insert:r}})},ee=r=>{t.value&&t.value.dispatch(t.value.state.replaceSelection(r))},te=r=>{t.value&&t.value.dispatch({selection:{anchor:r}})},ne=(r,u)=>{t.value&&t.value.dispatch({selection:{anchor:r,head:u}})},oe=(r,u)=>{t.value&&t.value.dispatch({selection:A.create(r,u)})},ae=r=>{t.value&&f.value&&t.value.dispatch({selection:A.create(f.value.ranges.map(u=>u.extend(r(u))))})},T={editor:a,view:t,cursor:m,selection:f,focus:c,length:h,json:o,diagnosticCount:_,dom:t.value?.contentDOM,lint:F,forceReconfigure:N,getRange:J,getLine:W,lineCount:K,getCursor:G,listSelections:H,getSelection:Y,getSelections:Q,somethingSelected:X,replaceRange:Z,replaceSelection:ee,setCursor:te,setSelection:ne,setSelections:oe,extendSelectionsBy:ae};return l.expose(T),T},render(){return z(this.$props.tag,{ref:"editor",class:"vue-codemirror"},this.$slots.default?z("aside",{style:"display: none;","aria-hidden":"true"},Be(this.$slots.default)):void 0)}});var Le=y({__name:"KeyMapDemo",setup(n){const l=g("Press Shift+Ctrl+Enter here to see the console log.");return(a,d)=>(k(),q(i(v),{modelValue:l.value,"onUpdate:modelValue":d[0]||(d[0]=t=>l.value=t),tab:"",basic:"",keymap:[{key:"Shift-Ctrl-Enter",run:()=>(console.log("Shift+Ctrl+Enter"),!0)}]},null,8,["modelValue","keymap"]))}}),Ee=`<script lang="ts" setup>
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
`;const Oe={class:"row"},Te={class:"col-6"},Ue={class:"row mb-3"},Re={class:"col-4"},Ae={class:"input-group"},ze=["value"],qe={class:"col-5"},Ie={class:"input-group"},Pe=["value"],Fe={class:"col-3"},Ne={class:"form-check form-check-inline"},Je={class:"col-6"};var We=y({__name:"LinterAndCrossBindingDemo",props:{dark:Boolean},setup(n){const l=g(),a=g(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`),d=g(!1),t=pe(new _e.Linter,{languageOptions:{parserOptions:{ecmaVersion:2022,sourceType:"module"}},rules:{semi:["error","never"]}}),c=f=>{d.value=f};return(f,m)=>(k(),x(O,null,[e("div",Oe,[e("div",Te,[p(i(v),{ref_key:"cm",ref:l,modelValue:a.value,"onUpdate:modelValue":m[0]||(m[0]=o=>a.value=o),dark:n.dark,lang:i(he)(),linter:i(t),basic:"",class:"mb-3",gutter:"",wrap:"",onFocus:c},null,8,["modelValue","dark","lang","linter"]),e("div",Ue,[e("div",Re,[e("div",Ae,[m[3]||(m[3]=e("label",{for:"count",class:"input-group-text"},"Count",-1)),e("input",{id:"count",type:"text",value:l.value?.length,class:"form-control",readonly:""},null,8,ze)])]),e("div",qe,[e("div",Ie,[m[4]||(m[4]=e("label",{for:"diagnosticCount",class:"input-group-text"}," Diagnostic Count ",-1)),e("input",{id:"diagnosticCount",type:"number",class:"form-control",value:l.value?.diagnosticCount,readonly:""},null,8,Pe)])]),e("div",Fe,[e("div",Ne,[$(e("input",{id:"focused","onUpdate:modelValue":m[1]||(m[1]=o=>d.value=o),class:"form-check-input",type:"checkbox",checked:"",disabled:""},null,512),[[E,d.value]]),m[5]||(m[5]=e("label",{class:"form-check-label",for:"focused"},"Focused",-1))])])])]),e("div",Je,[$(e("textarea",{"onUpdate:modelValue":m[2]||(m[2]=o=>a.value=o),rows:"4",class:"form-control"},null,512),[[ce,a.value]])])]),m[6]||(m[6]=e("p",null,[e("kbd",null,"Ctrl-Shift-m"),s(" ( "),e("kbd",null,"Cmd-Shift-m"),s(" on macOS) to show lint panel. "),e("kbd",null,"F8"),s(" key shows the next error. ")],-1))],64))}}),Ke=`<script setup lang="ts">
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
`;const Ge={class:"row"},He={class:"col-6"},Ye={class:"col-6"};var Qe=y({__name:"MarkdownDemo",props:{dark:Boolean},setup(n){const l=g(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);return(a,d)=>(k(),x("div",Ge,[e("div",He,[p(i(v),{ref:"cm",modelValue:l.value,"onUpdate:modelValue":d[0]||(d[0]=t=>l.value=t),dark:n.dark,lang:i(ge)(),wrap:"",basic:""},null,8,["modelValue","dark","lang"])]),e("div",Ye,[p(i(ue),{modelValue:l.value,"onUpdate:modelValue":d[1]||(d[1]=t=>l.value=t),class:"markdown-body","data-color-mode":n.dark?"dark":"light"},null,8,["modelValue","data-color-mode"])])]))}}),Xe=`<script setup lang="ts">
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
`;const Ze={class:"form-check form-switch"},et=["aria-checked"],tt={class:"form-check form-switch"},nt=["aria-checked"];var ot=y({__name:"ReadonlyAndDisabledDemo",props:{dark:Boolean},setup(n){const l=g(!0),a=g(!1);return(d,t)=>(k(),x(O,null,[e("div",Ze,[$(e("input",{id:"readonly","onUpdate:modelValue":t[0]||(t[0]=c=>l.value=c),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":l.value},null,8,et),[[E,l.value]]),t[2]||(t[2]=e("label",{class:"form-check-label",for:"readonly"},"Readonly",-1))]),e("div",tt,[$(e("input",{id:"disabled","onUpdate:modelValue":t[1]||(t[1]=c=>a.value=c),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":a.value},null,8,nt),[[E,a.value]]),t[3]||(t[3]=e("label",{class:"form-check-label",for:"disabled"},"Disabled",-1))]),p(i(v),{dark:n.dark,basic:"",readonly:l.value,disabled:a.value},{default:I(()=>[...t[4]||(t[4]=[e("pre",null,`色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず`,-1)])]),_:1},8,["dark","readonly","disabled"])],64))}}),at=`<script setup lang="ts">
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
`,lt=y({__name:"SlotDemo",props:{dark:Boolean},setup(n){return(l,a)=>(k(),q(i(v),{dark:n.dark,lang:i(be)(),linter:i(ve)(),basic:"",readonly:""},{default:I(()=>[...a[0]||(a[0]=[e("pre",null,`{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 for Vue3 and Vue2 component"
}`,-1)])]),_:1},8,["dark","lang","linter"]))}}),rt=`<script setup lang="ts">
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
`;const st={class:"container"},it={class:"mb-5"},dt={class:"mb-5"},ct={class:"mb-5"},ut={class:"mb-5"},mt={class:"row"},ft={class:"col-sm"},pt={class:"col-sm"},ht={class:"mb-5"},gt={class:"row"},vt={class:"col-sm"},bt={class:"col-sm"};var yt=y({__name:"DemoPage",setup(n){const l=P(),a=Xe.trim(),d=rt.trim(),t=at.trim(),c=Ke.trim(),f=Ee.trim();return(m,o)=>(k(),x("div",st,[e("section",it,[o[5]||(o[5]=e("h2",null,"Markdown Editor Demo",-1)),o[6]||(o[6]=e("p",null,[s(" This is an example of simply pouring text into CodeMirror using "),e("code",null,"v-model"),s(" . ")],-1)),o[7]||(o[7]=e("p",null,[e("code",null,"basic"),s(" is an alias for loading "),e("a",{href:"https://codemirror.net/6/docs/ref/#basic-setup",target:"_blank"}," basic-setup "),s(" . "),e("br"),s(" Use "),e("code",null,"wrap"),s(" when you want to use columns. (Enable text wrapping) ")],-1)),p(i(v),{modelValue:i(a),"onUpdate:modelValue":o[0]||(o[0]=h=>V(a)?a.value=h:null),dark:i(l),lang:i(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[8]||(o[8]=e("h3",null,"Demo",-1)),p(Qe,{class:"mb-3",dark:i(l)},null,8,["dark"]),o[9]||(o[9]=e("div",{class:"alert alert-info d-flex align-items-center my-3",role:"alert"},[e("div",{class:"bi flex-shrink-0 me-2 fs-2",role:"img","aria-label":"Info:"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",class:"bi bi-info-circle",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),e("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})])]),e("div",null,[s(" The process of converting Markdown to HTML uses "),e("a",{href:"https://github.com/logue/vue-markdown-wasm",target:"_blank"}," vue-markdown-wasm "),s(" . "),e("br"),s(" Full demo is "),e("a",{href:"https://logue.dev/vue-markdown-wasm",target:"_blank"},"here"),s(" . ")])],-1))]),e("section",dt,[o[10]||(o[10]=e("h2",null,"Slot Method",-1)),o[11]||(o[11]=e("p",null,[s(" In this sample, the text is put directly inside the "),e("code",null,"<code-mirror>"),s(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. In addition, it does not work with Vue2.7. ")],-1)),o[12]||(o[12]=e("p",null,[s(" It's just for simple syntax highlighting. Do not use with "),e("code",null,"v-model"),s(" . ")],-1)),p(i(v),{modelValue:i(d),"onUpdate:modelValue":o[1]||(o[1]=h=>V(d)?d.value=h:null),dark:i(l),lang:i(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[13]||(o[13]=e("h3",null,"Sample",-1)),p(lt,{dark:i(l)},null,8,["dark"])]),e("section",ct,[o[14]||(o[14]=e("h2",null,"Linter and cross binding demo",-1)),o[15]||(o[15]=e("p",null,"This is a sample using JavaScript and linter.",-1)),o[16]||(o[16]=e("p",null,[s(" When using "),e("code",null,"gutter"),s(" prop, 🔴 is displayed on the line with the error. ")],-1)),o[17]||(o[17]=e("p",null,[s(" This sample uses "),e("a",{href:"https://github.com/UziTech/eslint-linter-browserify",target:"_blank"}," eslint-linter-browserify "),s(" for the eslint linter. ")],-1)),p(i(v),{modelValue:i(c),"onUpdate:modelValue":o[2]||(o[2]=h=>V(c)?c.value=h:null),dark:i(l),lang:i(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[18]||(o[18]=e("h3",null,"Sample",-1)),o[19]||(o[19]=e("p",null,"Make sure you see 🔴 when you change the value to get an error.",-1)),o[20]||(o[20]=e("p",null,[s(" The value of "),e("code",null,"@update"),s(" gets the "),e("a",{href:"https://codemirror.net/6/docs/ref/#view.ViewUpdate",target:"_blank"}," ViewUpdate "),s(" object at that time when there is any update in the target form. ")],-1)),o[21]||(o[21]=e("p",null,[s(" In this demo code, the "),e("a",{href:"https://codemirror.net/docs/ref/#lint.diagnosticCount",target:"_blank"}," diagnosticCount "),s(" function is used to display the count of locations where grammatical errors are found. ")],-1)),p(We,{dark:i(l)},null,8,["dark"]),o[22]||(o[22]=e("p",null,"Also, make sure that changing either value reflects that value.",-1))]),e("section",ut,[o[24]||(o[24]=me('<h2> Toggle <code>readonly</code> and <code>disabled</code> a demo </h2><p><a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>readonly</code></a> a specifies whether the state is rewritable or not. Similar to <code>disabled</code> (Inverse value of <a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>editable</code></a> ) , except that it is focusable. In short, add <code>disabled</code> prop to if you want to use it as a simple syntax highlighter. </p>',2)),e("div",mt,[e("div",ft,[p(i(v),{modelValue:i(t),"onUpdate:modelValue":o[3]||(o[3]=h=>V(t)?t.value=h:null),dark:i(l),lang:i(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"])]),e("div",pt,[o[23]||(o[23]=e("h3",null,"Demo",-1)),p(ot,{dark:i(l)},null,8,["dark"])])])]),e("section",ht,[o[27]||(o[27]=e("h2",null,"Key Map Demo",-1)),o[28]||(o[28]=e("p",null,[s(" This is a sample that allows you to define your own keymap. The "),e("code",null,"keymap"),s(" prop is an array of objects that define the keymap. ")],-1)),o[29]||(o[29]=e("p",null,[s(" The "),e("code",null,"run"),s(" function is called when the keymap is matched. If it returns "),e("code",null,"true"),s(" , the default behavior of the keymap is not executed. ")],-1)),e("div",gt,[e("div",vt,[p(i(v),{modelValue:i(f),"onUpdate:modelValue":o[4]||(o[4]=h=>V(f)?f.value=h:null),dark:i(l),lang:i(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"])]),e("div",bt,[o[25]||(o[25]=e("h3",null,"Demo",-1)),o[26]||(o[26]=e("p",null,"Press Shift+Ctrl+Enter to see the console log.",-1)),p(Le)])])])]))}}),kt=y({__name:"ToggleTheme",setup(n){const l=P(),a=ye(l);return L(()=>l.value,d=>document.documentElement.setAttribute("data-bs-theme",d?"dark":"light"),{immediate:!0}),(d,t)=>(k(),x("a",{href:"#","aria-label":"Toggle Dark Mode",onClick:t[0]||(t[0]=c=>i(a)())},[...t[1]||(t[1]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1)])]))}});const wt={class:"navbar navbar-expand-md bg-dark","data-bs-theme":"dark"},xt={class:"container-fluid d-flex justify-content-between"},St={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},Ct={class:"navbar-nav"},Vt={class:"nav-item"},Dt={class:"flex-glow-0 pt-4 bg-body"};var Mt=y({__name:"App",setup(n){return(l,a)=>(k(),x(O,null,[e("nav",wt,[e("div",xt,[a[1]||(a[1]=e("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1)),a[2]||(a[2]=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1)),e("div",St,[e("ul",Ct,[a[0]||(a[0]=e("li",{class:"nav-item"},[e("a",{class:"nav-link",href:"https://github.com/logue/vue-codemirror6"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-github",viewBox:"0 0 16 16"},[e("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})])])],-1)),e("li",Vt,[p(kt,{class:"nav-link",attribute:"data-bs-theme"})])])])])]),a[3]||(a[3]=e("header",{class:"bg-body-tertiary"},[e("div",{class:"container py-3"},[e("h1",null,"Vue CodeMirror6 Demo"),e("p",{class:"lead"},[s(" A rough demo of Vue CodeMirror6 in action. You can switch between dark modes from the "),e("i",{class:"bi bi-circle-half"}),s(" icon in the upper right. ")])])],-1)),e("main",Dt,[p(yt)]),a[4]||(a[4]=e("footer",{class:"footer mt-auto py-3 mb-0 bg-body-tertiary"},[e("div",{class:"container mb-0"},[s(" © 2022-2026 by "),e("a",{href:"http://logue.dev/"},"Logue"),s(" . Licensed under the "),e("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),s(" . ")])],-1))],64))}});fe(Mt).mount("#app");

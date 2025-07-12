/**
 * vue-codemirror6
 *
 * @description CodeMirror6 Component for vue2 and vue3.
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2022-2025 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.3.21
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import{l as le,m as y,b as h,s as re,j as V,w as L,o as ie,n as se,p as de,q as I,v as k,u as s,x as C,F as T,y as e,z as f,A as M,B as E,C as ue,D as i,E as ce,G as q,i as D,H as me,I as fe}from"./vue-DTHp9had.js";import{e as pe,j as ve,m as he,a as ge,b as be,v as _}from"./codemirror-lang-JMVXP95d.js";import{y as P,z as ye}from"./vendor-BBc_s_YE.js";import{E as S,u as w,y as ke,z as we,A as Se,t as Ce,B as U,D as xe,F as Ve,G as De,o as _e,H as R,S as B,I as Me,m as A}from"./codemirror-y-g6rWeI.js";import{e as $e}from"./eslint-linter-browserify-DOdq3IXL.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const d of n)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&u(p)}).observe(document,{childList:!0,subtree:!0});function a(n){const d={};return n.integrity&&(d.integrity=n.integrity),n.referrerPolicy&&(d.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?d.credentials="include":n.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function u(n){if(n.ep)return;n.ep=!0;const d=a(n);fetch(n.href,d)}})();const je=t=>t?Object.entries(t).reduce((r,[a,u])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...r,[a]:u}),{}):{};function z(t,r={},a){const{props:u,domProps:n,on:d,...p}=r,m=d?je(d):{};return le(t,{...p,...u,...n,...m},a)}const Be=t=>typeof t=="function"?t():t;var g=y({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},placeholder:{type:String,default:void 0},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},indentUnit:{type:String,default:void 0},allowMultipleSelections:{type:Boolean,default:!1},tabSize:{type:Number,default:void 0},lineSeparator:{type:String,default:void 0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Function,default:void 0},linterConfig:{type:Object,default:()=>({})},forceLinting:{type:Boolean,default:!1},gutter:{type:Boolean,default:!1},gutterConfig:{type:Object,default:void 0},tag:{type:String,default:"div"},scrollIntoView:{type:Boolean,default:!0},keymap:{type:Array,default:()=>[]}},emits:{"update:modelValue":(t="")=>!0,update:t=>!0,ready:t=>!0,focus:t=>!0,change:t=>!0,destroy:()=>!0},setup(t,r){const a=h(),u=h(t.modelValue),n=re(new S),d=V({get:()=>n.value.hasFocus,set:l=>{l&&n.value.focus()}}),p=V({get:()=>n.value.state.selection,set:l=>n.value.dispatch({selection:l})}),m=V({get:()=>n.value.state.selection.main.head,set:l=>n.value.dispatch({selection:{anchor:l}})}),o=V({get:()=>n.value.state.toJSON(),set:l=>n.value.setState(w.fromJSON(l))}),v=h(0),$=h(0),j=V(()=>{const l=new U,c=new U;if(t.basic&&t.minimal)throw new Error("[Vue CodeMirror] Both basic and minimal cannot be specified.");let b=[];return t.keymap&&t.keymap.length>0&&(b=t.keymap),t.tab&&b.push(ke),[t.basic&&!t.minimal?we:void 0,t.minimal&&!t.basic?Se:void 0,S.updateListener.of(x=>{r.emit("focus",n.value.hasFocus),v.value=n.value.state.doc?.length,!(x.changes.empty||!x.docChanged)&&(t.linter&&(t.forceLinting&&R(n.value),$.value=t.linter(n.value).length),r.emit("update",x))}),S.theme(t.theme,{dark:t.dark}),t.wrap?S.lineWrapping:void 0,t.indentUnit?Ce.of(t.indentUnit):void 0,w.allowMultipleSelections.of(t.allowMultipleSelections),t.tabSize?c.of(w.tabSize.of(t.tabSize)):void 0,t.phrases?w.phrases.of(t.phrases):void 0,w.readOnly.of(t.readonly),S.editable.of(!t.disabled),t.lineSeparator?w.lineSeparator.of(t.lineSeparator):void 0,t.lang?l.of(t.lang):void 0,t.linter?xe(t.linter,t.linterConfig):void 0,t.linter&&t.gutter?Ve(t.gutterConfig):void 0,t.placeholder?De(t.placeholder):void 0,b.length!==0?_e.of(b):void 0,...t.extensions].filter(x=>!!x)});L(j,l=>n.value?.dispatch({effects:B.reconfigure.of(l)}),{immediate:!0}),L(()=>t.modelValue,async l=>{if(n.value.composing||n.value.state.doc.toJSON().join(t.lineSeparator??`
`)===l)return;const c=!n.value.state.selection.ranges.every(b=>b.anchor<l.length&&b.head<l.length);n.value.dispatch({changes:{from:0,to:n.value.state.doc.length,insert:l},selection:c?{anchor:0,head:0}:n.value.state.selection,scrollIntoView:t.scrollIntoView})},{immediate:!0}),ie(async()=>{let l=u.value;a.value&&(a.value.childNodes[0]&&(u.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),l=a.value.childNodes[0].innerText.trim()),n.value=new S({parent:a.value,state:w.create({doc:l,extensions:j.value}),dispatch:c=>{n.value.update([c]),!(c.changes.empty||!c.docChanged)&&(r.emit("update:modelValue",c.state.doc.toString()),r.emit("change",c.state))}}),await se(),r.emit("ready",{view:n.value,state:n.value.state,container:a.value}))}),de(()=>{n.value.destroy(),r.emit("destroy")});const F=()=>{!t.linter||!n.value||(t.forceLinting&&R(n.value),$.value=Me(n.value.state))},N=()=>{n.value?.dispatch({effects:B.reconfigure.of([])}),n.value?.dispatch({effects:B.appendConfig.of(j.value)})},J=(l,c)=>n.value.state.sliceDoc(l,c),W=l=>n.value.state.doc.line(l+1).text,K=()=>n.value.state.doc.lines,G=()=>n.value.state.selection.main.head,H=()=>{let l;return(l=n.value.state.selection.ranges)!==null&&l!==void 0?l:[]},Y=()=>{let l;return(l=n.value.state.sliceDoc(n.value.state.selection.main.from,n.value.state.selection.main.to))!==null&&l!==void 0?l:""},Q=()=>{const l=n.value.state;return l?l.selection.ranges.map(c=>l.sliceDoc(c.from,c.to)):[]},X=()=>n.value.state.selection.ranges.some(l=>!l.empty),Z=(l,c,b)=>n.value.dispatch({changes:{from:c,to:b,insert:l}}),ee=l=>n.value.dispatch(n.value.state.replaceSelection(l)),ne=l=>n.value.dispatch({selection:{anchor:l}}),te=(l,c)=>n.value.dispatch({selection:{anchor:l,head:c}}),oe=(l,c)=>n.value.dispatch({selection:A.create(l,c)}),ae=l=>n.value.dispatch({selection:A.create(p.value.ranges.map(c=>c.extend(l(c))))}),O={editor:a,view:n,cursor:m,selection:p,focus:d,length:v,json:o,diagnosticCount:$,dom:n.value.contentDOM,lint:F,forceReconfigure:N,getRange:J,getLine:W,lineCount:K,getCursor:G,listSelections:H,getSelection:Y,getSelections:Q,somethingSelected:X,replaceRange:Z,replaceSelection:ee,setCursor:ne,setSelection:te,setSelections:oe,extendSelectionsBy:ae};return r.expose(O),O},render(){return z(this.$props.tag,{ref:"editor",class:"vue-codemirror"},this.$slots.default?z("aside",{style:"display: none;","aria-hidden":"true"},Be(this.$slots.default)):void 0)}}),Le=y({__name:"KeyMapDemo",setup(t){const r=h("Press Shift+Ctrl+Enter here to see the console log.");return(a,u)=>(k(),I(s(g),{modelValue:r.value,"onUpdate:modelValue":u[0]||(u[0]=n=>r.value=n),tab:"",basic:"",keymap:[{key:"Shift-Ctrl-Enter",run:()=>(console.log("Shift+Ctrl+Enter"),!0)}]},null,8,["modelValue","keymap"]))}}),Ee=`<script lang="ts" setup>
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
`;const Te={class:"row"},Oe={class:"col-6"},Ue={class:"row mb-3"},Re={class:"col-4"},Ae={class:"input-group"},ze=["value"],Ie={class:"col-5"},qe={class:"input-group"},Pe=["value"],Fe={class:"col-3"},Ne={class:"form-check form-check-inline"},Je={class:"col-6"};var We=y({__name:"LinterAndCrossBindingDemo",props:{dark:Boolean},setup(t){const r=h(),a=h(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`),u=h(!1),n=pe(new $e.Linter,{languageOptions:{parserOptions:{ecmaVersion:2022,sourceType:"module"}},rules:{semi:["error","never"]}}),d=p=>{u.value=p};return(p,m)=>(k(),C(T,null,[e("div",Te,[e("div",Oe,[f(s(g),{ref_key:"cm",ref:r,modelValue:a.value,"onUpdate:modelValue":m[0]||(m[0]=o=>a.value=o),dark:t.dark,lang:s(ve)(),linter:s(n),basic:"",class:"mb-3",gutter:"",wrap:"",onFocus:d},null,8,["modelValue","dark","lang","linter"]),e("div",Ue,[e("div",Re,[e("div",Ae,[m[3]||(m[3]=e("label",{for:"count",class:"input-group-text"},"Count",-1)),e("input",{id:"count",type:"text",value:r.value?.length,class:"form-control",readonly:""},null,8,ze)])]),e("div",Ie,[e("div",qe,[m[4]||(m[4]=e("label",{for:"diagnosticCount",class:"input-group-text"}," Diagnostic Count ",-1)),e("input",{id:"diagnosticCount",type:"number",class:"form-control",value:r.value?.diagnosticCount,readonly:""},null,8,Pe)])]),e("div",Fe,[e("div",Ne,[M(e("input",{id:"focused","onUpdate:modelValue":m[1]||(m[1]=o=>u.value=o),class:"form-check-input",type:"checkbox",checked:"",disabled:""},null,512),[[E,u.value]]),m[5]||(m[5]=e("label",{class:"form-check-label",for:"focused"},"Focused",-1))])])])]),e("div",Je,[M(e("textarea",{"onUpdate:modelValue":m[2]||(m[2]=o=>a.value=o),rows:"4",class:"form-control"},null,512),[[ue,a.value]])])]),m[6]||(m[6]=e("p",null,[e("kbd",null,"Ctrl-Shift-m"),i(" ( "),e("kbd",null,"Cmd-Shift-m"),i(" on macOS) to show lint panel. "),e("kbd",null,"F8"),i(" key shows the next error. ")],-1))],64))}}),Ke=`<script setup lang="ts">
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
`;const Ge={class:"row"},He={class:"col-6"},Ye={class:"col-6"};var Qe=y({__name:"MarkdownDemo",props:{dark:Boolean},setup(t){const r=h(),a=h(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);return(u,n)=>(k(),C("div",Ge,[e("div",He,[f(s(g),{ref_key:"cm",ref:r,modelValue:a.value,"onUpdate:modelValue":n[0]||(n[0]=d=>a.value=d),dark:t.dark,lang:s(he)(),wrap:"",basic:""},null,8,["modelValue","dark","lang"])]),e("div",Ye,[f(s(ce),{modelValue:a.value,"onUpdate:modelValue":n[1]||(n[1]=d=>a.value=d),class:"markdown-body"},null,8,["modelValue"])])]))}}),Xe=`<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { markdown } from '@codemirror/lang-markdown';
import VueMarkdown from 'vue-markdown-wasm';

import CodeMirror from 'vue-codemirror6';

/** CodeMirror Instance */
const cm: Ref<InstanceType<typeof CodeMirror> | undefined> = ref();

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
      <vue-markdown v-model="input" class="markdown-body" />
    </div>
  </div>
</template>

<style lang="scss">
@import url(https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown.min.css);

.markdown-body {
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
`;const Ze={class:"form-check form-switch"},en=["aria-checked"],nn={class:"form-check form-switch"},tn=["aria-checked"];var on=y({__name:"ReadonlyAndDisabledDemo",props:{dark:Boolean},setup(t){const r=h(!0),a=h(!1);return(u,n)=>(k(),C(T,null,[e("div",Ze,[M(e("input",{id:"readonly","onUpdate:modelValue":n[0]||(n[0]=d=>r.value=d),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":r.value},null,8,en),[[E,r.value]]),n[2]||(n[2]=e("label",{class:"form-check-label",for:"readonly"},"Readonly",-1))]),e("div",nn,[M(e("input",{id:"disabled","onUpdate:modelValue":n[1]||(n[1]=d=>a.value=d),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":a.value},null,8,tn),[[E,a.value]]),n[3]||(n[3]=e("label",{class:"form-check-label",for:"disabled"},"Disabled",-1))]),f(s(g),{dark:t.dark,basic:"",readonly:r.value,disabled:a.value},{default:q(()=>n[4]||(n[4]=[e("pre",null,`色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず`,-1)])),_:1,__:[4]},8,["dark","readonly","disabled"])],64))}}),an=`<script setup lang="ts">
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
`,ln=y({__name:"SlotDemo",props:{dark:Boolean},setup(t){return(r,a)=>(k(),I(s(g),{dark:t.dark,lang:s(be)(),linter:s(ge)(),basic:"",readonly:""},{default:q(()=>a[0]||(a[0]=[e("pre",null,`{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 for Vue3 and Vue2 component"
}`,-1)])),_:1,__:[0]},8,["dark","lang","linter"]))}}),rn=`<script setup lang="ts">
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
`;const sn={class:"container"},dn={class:"mb-5"},un={class:"mb-5"},cn={class:"mb-5"},mn={class:"mb-5"},fn={class:"row"},pn={class:"col-sm"},vn={class:"col-sm"},hn={class:"mb-5"},gn={class:"row"},bn={class:"col-sm"},yn={class:"col-sm"};var kn=y({__name:"DemoPage",setup(t){const r=P(),a=Xe.trim(),u=rn.trim(),n=an.trim(),d=Ke.trim(),p=Ee.trim();return(m,o)=>(k(),C("div",sn,[e("section",dn,[o[5]||(o[5]=e("h2",null,"Markdown Editor Demo",-1)),o[6]||(o[6]=e("p",null,[i(" This is an example of simply pouring text into CodeMirror using "),e("code",null,"v-model"),i(" . ")],-1)),o[7]||(o[7]=e("p",null,[e("code",null,"basic"),i(" is an alias for loading "),e("a",{href:"https://codemirror.net/6/docs/ref/#basic-setup",target:"_blank"}," basic-setup "),i(" . "),e("br"),i(" Use "),e("code",null,"wrap"),i(" when you want to use columns. (Enable text wrapping) ")],-1)),f(s(g),{modelValue:s(a),"onUpdate:modelValue":o[0]||(o[0]=v=>D(a)?a.value=v:null),dark:s(r),lang:s(_)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[8]||(o[8]=e("h3",null,"Demo",-1)),f(Qe,{class:"mb-3",dark:s(r)},null,8,["dark"]),o[9]||(o[9]=e("div",{class:"alert alert-info d-flex align-items-center my-3",role:"alert"},[e("div",{class:"bi flex-shrink-0 me-2 fs-2",role:"img","aria-label":"Info:"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",class:"bi bi-info-circle",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),e("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})])]),e("div",null,[i(" The process of converting Markdown to HTML uses "),e("a",{href:"https://github.com/logue/vue-markdown-wasm",target:"_blank"}," vue-markdown-wasm "),i(" . "),e("br"),i(" Full demo is "),e("a",{href:"https://logue.dev/vue-markdown-wasm",target:"_blank"},"here"),i(" . ")])],-1))]),e("section",un,[o[10]||(o[10]=e("h2",null,"Slot Method",-1)),o[11]||(o[11]=e("p",null,[i(" In this sample, the text is put directly inside the "),e("code",null,"<code-mirror>"),i(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. In addition, it does not work with Vue2.7. ")],-1)),o[12]||(o[12]=e("p",null,[i(" It's just for simple syntax highlighting. Do not use with "),e("code",null,"v-model"),i(" . ")],-1)),f(s(g),{modelValue:s(u),"onUpdate:modelValue":o[1]||(o[1]=v=>D(u)?u.value=v:null),dark:s(r),lang:s(_)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[13]||(o[13]=e("h3",null,"Sample",-1)),f(ln,{dark:s(r)},null,8,["dark"])]),e("section",cn,[o[14]||(o[14]=e("h2",null,"Linter and cross binding demo",-1)),o[15]||(o[15]=e("p",null,"This is a sample using JavaScript and linter.",-1)),o[16]||(o[16]=e("p",null,[i(" When using "),e("code",null,"gutter"),i(" prop, 🔴 is displayed on the line with the error. ")],-1)),o[17]||(o[17]=e("p",null,[i(" This sample uses "),e("a",{href:"https://github.com/UziTech/eslint-linter-browserify",target:"_blank"}," eslint-linter-browserify "),i(" for the eslint linter. ")],-1)),f(s(g),{modelValue:s(d),"onUpdate:modelValue":o[2]||(o[2]=v=>D(d)?d.value=v:null),dark:s(r),lang:s(_)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[18]||(o[18]=e("h3",null,"Sample",-1)),o[19]||(o[19]=e("p",null,"Make sure you see 🔴 when you change the value to get an error.",-1)),o[20]||(o[20]=e("p",null,[i(" The value of "),e("code",null,"@update"),i(" gets the "),e("a",{href:"https://codemirror.net/6/docs/ref/#view.ViewUpdate",target:"_blank"}," ViewUpdate "),i(" object at that time when there is any update in the target form. ")],-1)),o[21]||(o[21]=e("p",null,[i(" In this demo code, the "),e("a",{href:"https://codemirror.net/docs/ref/#lint.diagnosticCount",target:"_blank"}," diagnosticCount "),i(" function is used to display the count of locations where grammatical errors are found. ")],-1)),f(We,{dark:s(r)},null,8,["dark"]),o[22]||(o[22]=e("p",null,"Also, make sure that changing either value reflects that value.",-1))]),e("section",mn,[o[24]||(o[24]=me('<h2> Toggle <code>readonly</code> and <code>disabled</code> a demo </h2><p><a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>readonly</code></a> a specifies whether the state is rewritable or not. Similar to <code>disabled</code> (Inverse value of <a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>editable</code></a> ) , except that it is focusable. In short, add <code>disabled</code> prop to if you want to use it as a simple syntax highlighter. </p>',2)),e("div",fn,[e("div",pn,[f(s(g),{modelValue:s(n),"onUpdate:modelValue":o[3]||(o[3]=v=>D(n)?n.value=v:null),dark:s(r),lang:s(_)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"])]),e("div",vn,[o[23]||(o[23]=e("h3",null,"Demo",-1)),f(on,{dark:s(r)},null,8,["dark"])])])]),e("section",hn,[o[27]||(o[27]=e("h2",null,"Key Map Demo",-1)),o[28]||(o[28]=e("p",null,[i(" This is a sample that allows you to define your own keymap. The "),e("code",null,"keymap"),i(" prop is an array of objects that define the keymap. ")],-1)),o[29]||(o[29]=e("p",null,[i(" The "),e("code",null,"run"),i(" function is called when the keymap is matched. If it returns "),e("code",null,"true"),i(" , the default behavior of the keymap is not executed. ")],-1)),e("div",gn,[e("div",bn,[f(s(g),{modelValue:s(p),"onUpdate:modelValue":o[4]||(o[4]=v=>D(p)?p.value=v:null),dark:s(r),lang:s(_)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"])]),e("div",yn,[o[25]||(o[25]=e("h3",null,"Demo",-1)),o[26]||(o[26]=e("p",null,"Press Shift+Ctrl+Enter to see the console log.",-1)),f(Le)])])])]))}}),wn=y({__name:"ToggleTheme",setup(t){const r=P(),a=ye(r);return L(()=>r.value,u=>document.documentElement.setAttribute("data-bs-theme",u?"dark":"light")),(u,n)=>(k(),C("a",{href:"#","aria-label":"Toggle Dark Mode",onClick:n[0]||(n[0]=d=>s(a)())},n[1]||(n[1]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1)])))}});const Sn={class:"navbar navbar-expand-md bg-dark","data-bs-theme":"dark"},Cn={class:"container-fluid d-flex justify-content-between"},xn={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},Vn={class:"navbar-nav"},Dn={class:"nav-item"},_n={class:"flex-glow-0 pt-4 bg-body"};var Mn=y({__name:"App",setup(t){return(r,a)=>(k(),C(T,null,[e("nav",Sn,[e("div",Cn,[a[1]||(a[1]=e("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1)),a[2]||(a[2]=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1)),e("div",xn,[e("ul",Vn,[a[0]||(a[0]=e("li",{class:"nav-item"},[e("a",{class:"nav-link",href:"https://github.com/logue/vue-codemirror6"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-github",viewBox:"0 0 16 16"},[e("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})])])],-1)),e("li",Dn,[f(wn,{class:"nav-link",attribute:"data-bs-theme"})])])])])]),a[3]||(a[3]=e("header",{class:"bg-body-tertiary"},[e("div",{class:"container py-3"},[e("h1",null,"Vue CodeMirror6 Demo"),e("p",{class:"lead"},[i(" A rough demo of Vue CodeMirror6 in action. You can switch between dark modes from the "),e("i",{class:"bi bi-circle-half"}),i(" icon in the upper right. ")])])],-1)),e("main",_n,[f(kn)]),a[4]||(a[4]=e("footer",{class:"footer mt-auto py-3 mb-0 bg-body-tertiary"},[e("div",{class:"container mb-0"},[i(" © 2022-2025 by "),e("a",{href:"http://logue.dev/"},"Logue"),i(" . Licensed under the "),e("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),i(" . ")])],-1))],64))}});fe(Mn).mount("#app");

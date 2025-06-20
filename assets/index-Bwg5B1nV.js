/**
 * vue-codemirror6
 *
 * @description CodeMirror6 Component for vue2 and vue3.
 * @author Logue <logue@hotmail.co.jp>
 * @copyright 2022-2025 By Masashi Yoshikawa All rights reserved.
 * @license MIT
 * @version 1.3.20
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import{l as ae,m as b,b as v,s as le,j as C,w as B,o as re,n as ie,p as se,q as S,v as k,F as O,x as e,y as f,u as d,z as _,A as L,B as de,C as s,D as ue,E as I,G as ce,i as V,H as me,I as fe}from"./vue-DoeA4iaL.js";import{e as pe,j as ve,m as he,a as ge,b as be,v as D}from"./codemirror-lang-CqXV2iTv.js";import{y as q,z as ye}from"./vendor-BdATdEtS.js";import{e as ke}from"./eslint-linter-browserify-C73zk_V5.js";import{E as w,u as y,y as we,z as Se,A as xe,t as Ce,B as U,D as Ve,F as De,G as _e,o as Me,H as A,S as j,I as $e,m as E}from"./codemirror-DqUet4FZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const p of i.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const je=t=>t?Object.entries(t).reduce((r,[a,c])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...r,[a]:c}),{}):{};function z(t,r={},a){const{props:c,domProps:n,on:i,...p}=r,o=i?je(i):{};return ae(t,{...p,...c,...n,...o},a)}const Be=t=>typeof t=="function"?t():t;var g=b({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},placeholder:{type:String,default:void 0},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},indentUnit:{type:String,default:void 0},allowMultipleSelections:{type:Boolean,default:!1},tabSize:{type:Number,default:void 0},lineSeparator:{type:String,default:void 0},readonly:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Function,default:void 0},linterConfig:{type:Object,default:()=>({})},forceLinting:{type:Boolean,default:!1},gutter:{type:Boolean,default:!1},gutterConfig:{type:Object,default:void 0},tag:{type:String,default:"div"},scrollIntoView:{type:Boolean,default:!0},keymap:{type:Array,default:()=>[]}},emits:{"update:modelValue":(t="")=>!0,update:t=>!0,ready:t=>!0,focus:t=>!0,change:t=>!0,destroy:()=>!0},setup(t,r){const a=v(),c=v(t.modelValue),n=le(new w),i=C({get:()=>n.value.hasFocus,set:l=>{l&&n.value.focus()}}),p=C({get:()=>n.value.state.selection,set:l=>n.value.dispatch({selection:l})}),o=C({get:()=>n.value.state.selection.main.head,set:l=>n.value.dispatch({selection:{anchor:l}})}),m=C({get:()=>n.value.state.toJSON(),set:l=>n.value.setState(y.fromJSON(l))}),T=v(0),M=v(0),$=C(()=>{const l=new U,u=new U;if(t.basic&&t.minimal)throw new Error("[Vue CodeMirror] Both basic and minimal cannot be specified.");let h=[];return t.keymap&&t.keymap.length>0&&(h=t.keymap),t.tab&&h.push(we),[t.basic&&!t.minimal?Se:void 0,t.minimal&&!t.basic?xe:void 0,w.updateListener.of(x=>{r.emit("focus",n.value.hasFocus),T.value=n.value.state.doc?.length,!(x.changes.empty||!x.docChanged)&&(t.linter&&(t.forceLinting&&A(n.value),M.value=t.linter(n.value).length),r.emit("update",x))}),w.theme(t.theme,{dark:t.dark}),t.wrap?w.lineWrapping:void 0,t.indentUnit?Ce.of(t.indentUnit):void 0,y.allowMultipleSelections.of(t.allowMultipleSelections),t.tabSize?u.of(y.tabSize.of(t.tabSize)):void 0,t.phrases?y.phrases.of(t.phrases):void 0,y.readOnly.of(t.readonly),w.editable.of(!t.disabled),t.lineSeparator?y.lineSeparator.of(t.lineSeparator):void 0,t.lang?l.of(t.lang):void 0,t.linter?Ve(t.linter,t.linterConfig):void 0,t.linter&&t.gutter?De(t.gutterConfig):void 0,t.placeholder?_e(t.placeholder):void 0,h.length!==0?Me.of(h):void 0,...t.extensions].filter(x=>!!x)});B($,l=>n.value?.dispatch({effects:j.reconfigure.of(l)}),{immediate:!0}),B(()=>t.modelValue,async l=>{if(n.value.composing||n.value.state.doc.toJSON().join(t.lineSeparator??`
`)===l)return;const u=!n.value.state.selection.ranges.every(h=>h.anchor<l.length&&h.head<l.length);n.value.dispatch({changes:{from:0,to:n.value.state.doc.length,insert:l},selection:u?{anchor:0,head:0}:n.value.state.selection,scrollIntoView:t.scrollIntoView})},{immediate:!0}),re(async()=>{let l=c.value;a.value&&(a.value.childNodes[0]&&(c.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),l=a.value.childNodes[0].innerText.trim()),n.value=new w({parent:a.value,state:y.create({doc:l,extensions:$.value}),dispatch:u=>{n.value.update([u]),!(u.changes.empty||!u.docChanged)&&(r.emit("update:modelValue",u.state.doc.toString()),r.emit("change",u.state))}}),await ie(),r.emit("ready",{view:n.value,state:n.value.state,container:a.value}))}),se(()=>{n.value.destroy(),r.emit("destroy")});const F=()=>{!t.linter||!n.value||(t.forceLinting&&A(n.value),M.value=$e(n.value.state))},N=()=>{n.value?.dispatch({effects:j.reconfigure.of([])}),n.value?.dispatch({effects:j.appendConfig.of($.value)})},P=(l,u)=>n.value.state.sliceDoc(l,u),J=l=>n.value.state.doc.line(l+1).text,W=()=>n.value.state.doc.lines,G=()=>n.value.state.selection.main.head,H=()=>{let l;return(l=n.value.state.selection.ranges)!==null&&l!==void 0?l:[]},K=()=>{let l;return(l=n.value.state.sliceDoc(n.value.state.selection.main.from,n.value.state.selection.main.to))!==null&&l!==void 0?l:""},Y=()=>{const l=n.value.state;return l?l.selection.ranges.map(u=>l.sliceDoc(u.from,u.to)):[]},Q=()=>n.value.state.selection.ranges.some(l=>!l.empty),X=(l,u,h)=>n.value.dispatch({changes:{from:u,to:h,insert:l}}),Z=l=>n.value.dispatch(n.value.state.replaceSelection(l)),ee=l=>n.value.dispatch({selection:{anchor:l}}),ne=(l,u)=>n.value.dispatch({selection:{anchor:l,head:u}}),te=(l,u)=>n.value.dispatch({selection:E.create(l,u)}),oe=l=>n.value.dispatch({selection:E.create(p.value.ranges.map(u=>u.extend(l(u))))}),R={editor:a,view:n,cursor:o,selection:p,focus:i,length:T,json:m,diagnosticCount:M,dom:n.value.contentDOM,lint:F,forceReconfigure:N,getRange:P,getLine:J,lineCount:W,getCursor:G,listSelections:H,getSelection:K,getSelections:Y,somethingSelected:Q,replaceRange:X,replaceSelection:Z,setCursor:ee,setSelection:ne,setSelections:te,extendSelectionsBy:oe};return r.expose(R),R},render(){return z(this.$props.tag,{ref:"editor",class:"vue-codemirror"},this.$slots.default?z("aside",{style:"display: none;","aria-hidden":"true"},Be(this.$slots.default)):void 0)}});const Le={class:"row"},Oe={class:"col-6"},Te={class:"row mb-3"},Re={class:"col-4"},Ue={class:"input-group"},Ae=["value"],Ee={class:"col-5"},ze={class:"input-group"},Ie=["value"],qe={class:"col-3"},Fe={class:"form-check form-check-inline"},Ne={class:"col-6"};var Pe=b({__name:"LinterAndCrossBindingDemo",props:{dark:Boolean},setup(t){const r=v(),a=v(`document.querySelectorAll('.btn').forEach(
  element => ああああelement.addEventListner('click', alert('あああああ'));
);`),c=v(!1),n=pe(new ke.Linter,{languageOptions:{parserOptions:{ecmaVersion:2022,sourceType:"module"}},rules:{semi:["error","never"]}}),i=p=>{c.value=p};return(p,o)=>(k(),S(O,null,[e("div",Le,[e("div",Oe,[f(d(g),{ref_key:"cm",ref:r,modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=m=>a.value=m),dark:t.dark,lang:d(ve)(),linter:d(n),basic:"",class:"mb-3",gutter:"",wrap:"",onFocus:i},null,8,["modelValue","dark","lang","linter"]),e("div",Te,[e("div",Re,[e("div",Ue,[o[3]||(o[3]=e("label",{for:"count",class:"input-group-text"},"Count",-1)),e("input",{id:"count",type:"text",value:r.value?.length,class:"form-control",readonly:""},null,8,Ae)])]),e("div",Ee,[e("div",ze,[o[4]||(o[4]=e("label",{for:"diagnosticCount",class:"input-group-text"}," Diagnostic Count ",-1)),e("input",{id:"diagnosticCount",type:"number",class:"form-control",value:r.value?.diagnosticCount,readonly:""},null,8,Ie)])]),e("div",qe,[e("div",Fe,[_(e("input",{id:"focused","onUpdate:modelValue":o[1]||(o[1]=m=>c.value=m),class:"form-check-input",type:"checkbox",checked:"",disabled:""},null,512),[[L,c.value]]),o[5]||(o[5]=e("label",{class:"form-check-label",for:"focused"},"Focused",-1))])])])]),e("div",Ne,[_(e("textarea",{"onUpdate:modelValue":o[2]||(o[2]=m=>a.value=m),rows:"4",class:"form-control"},null,512),[[de,a.value]])])]),o[6]||(o[6]=e("p",null,[e("kbd",null,"Ctrl-Shift-m"),s(" ( "),e("kbd",null,"Cmd-Shift-m"),s(" on macOS) to show lint panel. "),e("kbd",null,"F8"),s(" key shows the next error. ")],-1))],64))}}),Je=`<script setup lang="ts">
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
`;const We={class:"row"},Ge={class:"col-6"},He={class:"col-6"};var Ke=b({__name:"MarkdownDemo",props:{dark:Boolean},setup(t){const r=v(),a=v(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);return(c,n)=>(k(),S("div",We,[e("div",Ge,[f(d(g),{ref_key:"cm",ref:r,modelValue:a.value,"onUpdate:modelValue":n[0]||(n[0]=i=>a.value=i),dark:t.dark,lang:d(he)(),wrap:"",basic:""},null,8,["modelValue","dark","lang"])]),e("div",He,[f(d(ue),{modelValue:a.value,"onUpdate:modelValue":n[1]||(n[1]=i=>a.value=i),class:"markdown-body"},null,8,["modelValue"])])]))}}),Ye=`<script setup lang="ts">
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
`;const Qe={class:"form-check form-switch"},Xe=["aria-checked"],Ze={class:"form-check form-switch"},en=["aria-checked"];var nn=b({__name:"ReadonlyAndDisabledDemo",props:{dark:Boolean},setup(t){const r=v(!0),a=v(!1);return(c,n)=>(k(),S(O,null,[e("div",Qe,[_(e("input",{id:"readonly","onUpdate:modelValue":n[0]||(n[0]=i=>r.value=i),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":r.value},null,8,Xe),[[L,r.value]]),n[2]||(n[2]=e("label",{class:"form-check-label",for:"readonly"},"Readonly",-1))]),e("div",Ze,[_(e("input",{id:"disabled","onUpdate:modelValue":n[1]||(n[1]=i=>a.value=i),type:"checkbox",class:"form-check-input",role:"switch","aria-checked":a.value},null,8,en),[[L,a.value]]),n[3]||(n[3]=e("label",{class:"form-check-label",for:"disabled"},"Disabled",-1))]),f(d(g),{dark:t.dark,basic:"",readonly:r.value,disabled:a.value},{default:I(()=>n[4]||(n[4]=[e("pre",null,`色は匂へど　散りぬるを
我が世誰そ　常ならむ
有為の奥山　今日越えて
浅き夢見じ　酔ひもせず`,-1)])),_:1,__:[4]},8,["dark","readonly","disabled"])],64))}}),tn=`<script setup lang="ts">
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
`,on=b({__name:"SlotDemo",props:{dark:Boolean},setup(t){return(r,a)=>(k(),ce(d(g),{dark:t.dark,lang:d(be)(),linter:d(ge)(),basic:"",readonly:""},{default:I(()=>a[0]||(a[0]=[e("pre",null,`{
  "@schema": "https://json.schemastore.org/jsonld.json",
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "vue-codemirror6 Demo",
  "url": "https://github.com/logue/vue-codemirror6",
  "description": "CodeMirror6 for Vue3 and Vue2 component"
}`,-1)])),_:1,__:[0]},8,["dark","lang","linter"]))}}),an=`<script setup lang="ts">
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
`;const ln={class:"container"},rn={class:"mb-5"},sn={class:"mb-5"},dn={class:"mb-5"},un={class:"mb-5"},cn={class:"row"},mn={class:"col-sm"},fn={class:"col-sm"};var pn=b({__name:"DemoPage",setup(t){const r=q(),a=Ye.trim(),c=an.trim(),n=tn.trim(),i=Je.trim();return(p,o)=>(k(),S("div",ln,[e("section",rn,[o[4]||(o[4]=e("h2",null,"Markdown Editor Demo",-1)),o[5]||(o[5]=e("p",null,[s(" This is an example of simply pouring text into CodeMirror using "),e("code",null,"v-model"),s(" . ")],-1)),o[6]||(o[6]=e("p",null,[e("code",null,"basic"),s(" is an alias for loading "),e("a",{href:"https://codemirror.net/6/docs/ref/#basic-setup",target:"_blank"}," basic-setup "),s(" . "),e("br"),s(" Use "),e("code",null,"wrap"),s(" when you want to use columns. (Enable text wrapping) ")],-1)),f(d(g),{modelValue:d(a),"onUpdate:modelValue":o[0]||(o[0]=m=>V(a)?a.value=m:null),dark:d(r),lang:d(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[7]||(o[7]=e("h3",null,"Demo",-1)),f(Ke,{class:"mb-3",dark:d(r)},null,8,["dark"]),o[8]||(o[8]=e("div",{class:"alert alert-info d-flex align-items-center my-3",role:"alert"},[e("div",{class:"bi flex-shrink-0 me-2 fs-2",role:"img","aria-label":"Info:"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",fill:"currentColor",class:"bi bi-info-circle",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),e("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})])]),e("div",null,[s(" The process of converting Markdown to HTML uses "),e("a",{href:"https://github.com/logue/vue-markdown-wasm",target:"_blank"}," vue-markdown-wasm "),s(" . "),e("br"),s(" Full demo is "),e("a",{href:"https://logue.dev/vue-markdown-wasm",target:"_blank"},"here"),s(" . ")])],-1))]),e("section",sn,[o[9]||(o[9]=e("h2",null,"Slot Method",-1)),o[10]||(o[10]=e("p",null,[s(" In this sample, the text is put directly inside the "),e("code",null,"<code-mirror>"),s(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. In addition, it does not work with Vue2.7. ")],-1)),o[11]||(o[11]=e("p",null,[s(" It's just for simple syntax highlighting. Do not use with "),e("code",null,"v-model"),s(" . ")],-1)),f(d(g),{modelValue:d(c),"onUpdate:modelValue":o[1]||(o[1]=m=>V(c)?c.value=m:null),dark:d(r),lang:d(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[12]||(o[12]=e("h3",null,"Sample",-1)),f(on,{dark:d(r)},null,8,["dark"])]),e("section",dn,[o[13]||(o[13]=e("h2",null,"Linter and cross binding demo",-1)),o[14]||(o[14]=e("p",null,"This is a sample using JavaScript and linter.",-1)),o[15]||(o[15]=e("p",null,[s(" When using "),e("code",null,"gutter"),s(" prop, 🔴 is displayed on the line with the error. ")],-1)),o[16]||(o[16]=e("p",null,[s(" This sample uses "),e("a",{href:"https://github.com/UziTech/eslint-linter-browserify",target:"_blank"}," eslint-linter-browserify "),s(" for the eslint linter. ")],-1)),f(d(g),{modelValue:d(i),"onUpdate:modelValue":o[2]||(o[2]=m=>V(i)?i.value=m:null),dark:d(r),lang:d(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"]),o[17]||(o[17]=e("h3",null,"Sample",-1)),o[18]||(o[18]=e("p",null,"Make sure you see 🔴 when you change the value to get an error.",-1)),o[19]||(o[19]=e("p",null,[s(" The value of "),e("code",null,"@update"),s(" gets the "),e("a",{href:"https://codemirror.net/6/docs/ref/#view.ViewUpdate",target:"_blank"}," ViewUpdate "),s(" object at that time when there is any update in the target form. ")],-1)),o[20]||(o[20]=e("p",null,[s(" In this demo code, the "),e("a",{href:"https://codemirror.net/docs/ref/#lint.diagnosticCount",target:"_blank"}," diagnosticCount "),s(" function is used to display the count of locations where grammatical errors are found. ")],-1)),f(Pe,{dark:d(r)},null,8,["dark"]),o[21]||(o[21]=e("p",null,"Also, make sure that changing either value reflects that value.",-1))]),e("section",un,[o[23]||(o[23]=me('<h2> Toggle <code>readonly</code> and <code>disabled</code> a demo </h2><p><a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>readonly</code></a> a specifies whether the state is rewritable or not. Similar to <code>disabled</code> (Inverse value of <a href="https://codemirror.net/docs/ref/#view.EditorView%5Eeditable" target="_blank"><code>editable</code></a> ) , except that it is focusable. In short, add <code>disabled</code> prop to if you want to use it as a simple syntax highlighter. </p>',2)),e("div",cn,[e("div",mn,[f(d(g),{modelValue:d(n),"onUpdate:modelValue":o[3]||(o[3]=m=>V(n)?n.value=m:null),dark:d(r),lang:d(D)(),basic:"",wrap:"",readonly:""},null,8,["modelValue","dark","lang"])]),e("div",fn,[o[22]||(o[22]=e("h3",null,"Demo",-1)),f(nn,{dark:d(r)},null,8,["dark"])])])])]))}}),vn=b({__name:"ToggleTheme",setup(t){const r=q(),a=ye(r);return B(()=>r.value,c=>document.documentElement.setAttribute("data-bs-theme",c?"dark":"light")),(c,n)=>(k(),S("a",{href:"#","aria-label":"Toggle Dark Mode",onClick:n[0]||(n[0]=i=>d(a)())},n[1]||(n[1]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[e("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1)])))}});const hn={class:"navbar navbar-expand-md bg-dark","data-bs-theme":"dark"},gn={class:"container-fluid d-flex justify-content-between"},bn={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},yn={class:"navbar-nav"},kn={class:"nav-item"},wn={class:"flex-glow-0 pt-4 bg-body"};var Sn=b({__name:"App",setup(t){return(r,a)=>(k(),S(O,null,[e("nav",hn,[e("div",gn,[a[1]||(a[1]=e("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1)),a[2]||(a[2]=e("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[e("span",{class:"navbar-toggler-icon"})],-1)),e("div",bn,[e("ul",yn,[a[0]||(a[0]=e("li",{class:"nav-item"},[e("a",{class:"nav-link",href:"https://github.com/logue/vue-codemirror6"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-github",viewBox:"0 0 16 16"},[e("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"})])])],-1)),e("li",kn,[f(vn,{class:"nav-link",attribute:"data-bs-theme"})])])])])]),a[3]||(a[3]=e("header",{class:"bg-body-tertiary"},[e("div",{class:"container py-3"},[e("h1",null,"Vue CodeMirror6 Demo"),e("p",{class:"lead"},[s(" A rough demo of Vue CodeMirror6 in action. You can switch between dark modes from the "),e("i",{class:"bi bi-circle-half"}),s(" icon in the upper right. ")])])],-1)),e("main",wn,[f(pn)]),a[4]||(a[4]=e("footer",{class:"footer mt-auto py-3 mb-0 bg-body-tertiary"},[e("div",{class:"container mb-0"},[s(" © 2022-2025 by "),e("a",{href:"http://logue.dev/"},"Logue"),s(" . Licensed under the "),e("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),s(" . ")])],-1))],64))}});fe(Sn).mount("#app");

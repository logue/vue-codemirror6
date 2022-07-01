import{h as U,d as w,r as h,c as j,w as b,o as B,n as E,a as O,t as A,b as S,e as t,f as p,g as v,i as z,v as D,j as u,k,l as V,m as M,p as N}from"./vue.7dc6131d.js";import{l as y}from"./lodash.0a8ed3d0.js";import{E as f,b as H,m as J,k as R,i as F,a as L,l as G,c as I,S as W,d as C,e as P,h as K,j as Y,f as Q}from"./codemirror.4ca7bb13.js";import{z as X}from"./linter.4d0ec9e4.js";const Z=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}};Z();const ee=e=>e?Object.entries(e).reduce((a,[o,r])=>(o=o.charAt(0).toUpperCase()+o.slice(1),o=`on${o}`,{...a,[o]:r}),{}):null,x=(e,a={},o)=>{const{props:r,domProps:n,on:s,...l}=a,c=s?ee(s):{};return U(e,{...l,...r,...n,...c},o)},te=e=>typeof e=="function"?e():e;var $=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Function,default:()=>{}},lintGutter:{type:Boolean,defalt:!1}},emits:["update:modelValue","update:view"],setup(e,a){const o=h(),r=h(e.modelValue);let n;const s=j({get:()=>n.state.selection.main.head||0,set:i=>n.dispatch({selection:{anchor:i}})}),l=a.emit;b(()=>e.modelValue,i=>{if(n.composing)return;const d=n.state.selection;n.dispatch({changes:{from:0,to:n.state.doc.length,insert:i},selection:d})}),b(()=>e.dark,()=>{n.dispatch({effects:W.reconfigure.of(c())})}),B(async()=>{let i=r.value;o.value&&o.value.childNodes[0]&&(r.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),i=y.exports.trim(o.value.childNodes[0].innerText)),n=new f({doc:i,extensions:c(),parent:o.value,dispatch:d=>{n.update([d]),!d.changes.empty&&l("update:modelValue",n.state.doc.toString())}}),await E()}),O(()=>n.destroy());const c=()=>y.exports.compact([e.basic?H:void 0,e.minimal&&!e.basic?J:void 0,f.updateListener.of(d=>l("update",d)),f.theme(e.theme,{dark:e.dark}),e.wrap?f.lineWrapping:void 0,e.tab?R.of([F]):void 0,e.phrases?L.phrases.of(e.phrases):void 0,e.readonly?L.readOnly.of(e.readonly):void 0,e.editable?f.editable.of(e.editable):void 0,e.lang?A(e.lang):void 0,e.linter?G(e.linter):void 0,e.linter&&e.lintGutter?I():void 0,...e.extensions]),m=()=>n.state.selection;return{context:a,editor:o,cursor:s,selection:m,getRange:(i,d)=>n.state.sliceDoc(i,d),getLine:i=>n.state.doc.line(i+1).text,lineCount:()=>n.state.doc.lines,getCursor:()=>s.value,listSelections:()=>m().ranges,getSelection:()=>n.state.sliceDoc(m().main.from,m().main.to),getSelections:()=>m().ranges.map(i=>n.state.sliceDoc(i.from,i.to)),somethingSelected:()=>m().ranges.some(i=>!i.empty),replaceRange:(i,d,q)=>n.dispatch({changes:{from:d,to:q,insert:i}}),replaceSelection:i=>n.dispatch(n.state.replaceSelection(i)),setCursor:i=>s.value=i,setSelection:(i,d)=>n.dispatch({selection:{anchor:i,head:d}}),setSelections:(i,d)=>n.dispatch({selection:C.create(i,d)}),extendSelectionsBy:i=>n.dispatch({selection:C.create(m().ranges.map(d=>d.extend(i(d))))}),focus:()=>n.focus(),hasFocus:()=>n.hasFocus}},render(){return x("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?x("aside",{style:"display: none;","aria-hidden":"true"},te(this.$slots.default)):void 0)}});/**
 * Vue CodeMirror6 Component
 *
 * @license MIT
 * @author Logue {@link logue@hotmail.co.jp}
 * @copyright 2022 Masashi Yoshikawa {@link https://logue.dev/} All rights reserved.
 * @see {@link https://github.com/logue/vue-codemirror6}
 */typeof window<"u"&&window.Vue&&window.Vue.use($);var T=(e,a)=>{const o=e.__vccOpts||e;for(const[r,n]of a)o[r]=n;return o};const ne=w({components:{CodeMirror:$},props:{dark:{type:Boolean,default:!1}},setup(){const e=h(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),a=h(`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);`),o=h(""),r=P(),n=K(),s=Y(),l=Q(new X),c=h({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(g=>{o.value=g.parse(e.value)}),b(e,g=>{window.markdown.ready.then(_=>{o.value=_.parse(g)})}),{demo:e,demo2:a,output:o,cmLangMd:r,cmLangHtml:n,cmLangJs:s,cmLintJs:l,cmTheme:c,onViewUpdate:g=>console.log(g)}}}),oe={class:"container"},ae=t("section",{class:"mb-5"},[t("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),t("p",null,[u(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),u(" icon in the upper left. ")])],-1),ie={class:"mb-5"},se=k('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),re=t("pre",null,`<template>
  <code-mirror
    v-model="input"
    :lang="cmLang"
    basic
    wrap
    @update="onViewUpdate"
  />
  <div v-html="output" />
</template>

<script>
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { markdown as md } from '@codemirror/lang-markdown';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Demo text */
    const input = ref(\`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\`);

    /** Result Text */
    const output = ref('');

    /** CodeMirror Language */
    const cmLang = md();

    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      output.value = markdown.parse(input.value);
    });

    // Realtime convert Markdown
    watch(demo, current => {
      // console.log('value changed', current);
      window['markdown'].ready.then(markdown => {
        output.value = markdown.parse(input.value);
      });
    });

    /** Get ViewUpdate */
    const onViewUpdate = update => console.log(update);

    return {
      input,
      output,
      cmLang,
      onViewUpdate,
    };
  },
});
<\/script>
`,-1),le=t("h3",null,"Sample",-1),de=t("p",null,[u(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),u(" object in the console log. ")],-1),ce={class:"row"},ue={class:"col"},me={class:"col"},pe=["innerHTML"],he=t("p",null,[u(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),u(" . ")],-1),ge=t("h2",null,"Slot Method",-1),fe=t("p",null,[u(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),u(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ve=t("p",null,[u(" It's just for simple syntax highlighting. Do not use with "),t("code",null,"v-model"),u(" . ")],-1),be=t("h3",null,"Markup",-1),we=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),ke=t("h3",null,"Sample",-1),_e=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1),ye=k('<h2>Linter and cross binding demo</h2><p>This is a sample using JavaScript and linter.</p><p> When using <code>lintGutter</code> prop, \u{1F534} is displayed on the line with the error. <br> Click \u{1F534} or press a <kbd>Ctrl</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> ( <kbd>Cmd</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> on macOS), the error content will be displayed on the panel. <kbd>F8</kbd> key shows the next error. </p><p> This sample uses <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank"> eslint4b-prebuilt </a> for the eslint linter. </p>',4),Le=t("pre",null,`<template>
  <div class="row">
    <div class="col-6">
      <code-mirror
        v-model="value"
        :lang="cmLangJs"
        :linter="cmLintJs"
        :dark="dark"
        lintGutter
        basic
      />
    </div>
    <div class="col-6">
      <textarea v-model="value" rows="3" class="form-control"></textarea>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { javascript, esLint } from '@codemirror/lang-javascript';
import Linter from "eslint4b-prebuilt";

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Value Text */
    const value = ref(
\`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);\`
    );

    /** CodeMirror Language */
    const cmLang = javascript();
    /** CodeMirror Linter */
    const cmLinter = esLint(new Linter());

    return {
      value,
      cmLang,
      cmLinter,
    };
  },
});
<\/script>
`,-1),Ce=t("h3",null,"Sample",-1),xe=t("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),Se={class:"row"},Ve={class:"col-6"},Me={class:"col-6"},$e=t("p",null,"Also, make sure that changing either value reflects that value.",-1);function Te(e,a,o,r,n,s){const l=V("code-mirror");return M(),S("div",oe,[ae,t("section",ie,[se,p(l,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:v(()=>[re]),_:1},8,["lang","dark"]),le,de,t("div",ce,[t("div",ue,[p(l,{modelValue:e.demo,"onUpdate:modelValue":a[0]||(a[0]=c=>e.demo=c),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",me,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,pe)])]),he]),t("section",null,[ge,fe,ve,be,p(l,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:v(()=>[we]),_:1},8,["lang","dark"]),ke,p(l,{readonly:"",dark:e.dark},{default:v(()=>[_e]),_:1},8,["dark"])]),t("section",null,[ye,p(l,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:v(()=>[Le]),_:1},8,["lang","dark"]),Ce,xe,t("div",Se,[t("div",Ve,[p(l,{modelValue:e.demo2,"onUpdate:modelValue":a[1]||(a[1]=c=>e.demo2=c),lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,"lint-gutter":"",basic:""},null,8,["modelValue","lang","linter","dark"])]),t("div",Me,[z(t("textarea",{"onUpdate:modelValue":a[2]||(a[2]=c=>e.demo2=c),"aria-label":"two way bind test",rows:"3",class:"form-control"},null,512),[[D,e.demo2]])])]),$e])])}var qe=T(ne,[["render",Te]]);const Ue=w({components:{DemoPage:qe},setup(){const e=h(window.matchMedia("(prefers-color-scheme: dark)").matches);return b(e,()=>{const a=document.querySelector(".navbar").classList,o=document.querySelector("main").classList,r=document.querySelector(".footer").classList;e.value?(a.remove("navbar-dark","bg-dark"),a.add("navbar-light","bg-light"),o.remove("bg-white","text-dark"),o.add("bg-black","text-light"),r.remove("bg-light","text-dark"),r.add("bg-dark","text-light")):(a.add("navbar-dark","bg-dark"),a.remove("navbar-light","bg-light"),o.add("bg-white","text-dark"),o.remove("bg-black","text-light"),r.add("bg-light","text-dark"),r.remove("bg-dark","text-light"))}),{dark:e}}}),je={class:"navbar navbar-expand-md navbar-dark bg-dark"},Be={class:"container-fluid d-flex justify-content-between"},Ee=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Oe=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),Ae={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},ze={class:"navbar-nav"},De=k('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),Ne={class:"nav-item"},He=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Je=[He],Re={class:"flex-shrink-0 pt-4 bg-white"},Fe=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[u(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),u(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),u(" . ")])],-1);function Ge(e,a,o,r,n,s){const l=V("demo-page");return M(),S("div",null,[t("header",null,[t("nav",je,[t("div",Be,[Ee,Oe,t("div",Ae,[t("ul",ze,[De,t("li",Ne,[t("a",{class:"nav-link",href:"#",onClick:a[0]||(a[0]=c=>e.dark=!e.dark)},Je)])])])])])]),t("main",Re,[p(l,{dark:e.dark},null,8,["dark"])]),Fe])}var Ie=T(Ue,[["render",Ge]]);N(Ie).mount("#app");

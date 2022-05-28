import{h as M,d as w,r as m,t as V,c as $,w as v,o as j,n as q,a as S,b as T,e as y,f as t,g as u,i as h,j as c,k,l as L,m as x,p as U}from"./vue.c9930a46.js";import{E as g,a as f,b as O,k as B,i as A,l as E,c as z,m as N,h as H,j as D,e as I}from"./codemirror.36a6239d.js";import{l as b}from"./lodash.4271d345.js";import{z as R}from"./linter.4d0ec9e4.js";const J=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}};J();const P=e=>e?Object.entries(e).reduce((n,[o,r])=>(o=o.charAt(0).toUpperCase()+o.slice(1),o=`on${o}`,{...n,[o]:r}),{}):null,_=(e,n={},o)=>{const{props:r,domProps:a,on:i,...s}=n,d=i?P(i):{},l={...s,...r,...a,...d};return M(e,l,o)},W=e=>typeof e=="function"?e():e;var F=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},selection:{type:Object,default:()=>{}},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Object,default:()=>{}}},emits:["update:modelValue","update"],setup(e,n){const o=m(),r=m(e.modelValue),{dark:a}=V(e),i=n.emit,s=$(()=>{const l=[e.basic?O:void 0,g.updateListener.of(p=>i("update",p)),g.theme(e.theme,{dark:a.value}),e.wrap?g.lineWrapping:void 0,e.tab?B.of([A]):void 0,e.phrases?f.phrases.of(e.phrases):void 0,e.readonly?f.readOnly.of(e.readonly):void 0,e.editable?g.editable.of(e.editable):void 0,e.lang?T(e.lang):void 0,e.linter?E(e.linter):void 0,e.linter?z():void 0];return e.extensions&&b.exports.merge(l,e.extensions),b.exports.compact(l)});let d;return v(r,l=>{if(d.composing)return;const p=d.state.selection;d.setState(f.create({doc:l,extensions:s.value,selection:p}))}),v(a,()=>{d.setState(f.create({doc:r.value,extensions:s.value}))}),j(async()=>{r.value==""&&o.value&&(r.value=b.exports.trim(o.value.childNodes[0].innerText)),d=new g({state:f.create({doc:r.value,selection:e.selection,extensions:s.value}),parent:o.value,dispatch:l=>{d.update([l]),!l.changes.empty&&(r.value=d.state.doc.toString(),i("update:modelValue",r.value))}}),await q()}),S(()=>d.destroy()),{context:n,editor:o}},render(){return _("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?_("aside",{style:"display: none;"},W(this.$slots.default)):void 0)}}),C=(e,n)=>{const o=e.__vccOpts||e;for(const[r,a]of n)o[r]=a;return o};const G=w({components:{CodeMirror:F},props:{dark:{type:Boolean,default:!1}},setup(){const e=m(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),n=m(""),o=N(),r=H(),a=D(),i=I(new R),s=m({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(l=>{n.value=l.parse(e.value)}),v(e,l=>{window.markdown.ready.then(p=>{n.value=p.parse(l)})}),{demo:e,output:n,cmLangMd:o,cmLangHtml:r,cmLangJs:a,cmLintJs:i,cmTheme:s,onViewUpdate:l=>console.log(l)}}}),K={class:"container"},Y=t("section",{class:"mb-5"},[t("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),t("p",null,[c(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),c(" icon in the upper left. ")])],-1),Q={class:"mb-5"},X=k('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),Z=t("pre",null,`<template>
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
`,-1),ee=t("h3",null,"Sample",-1),te=t("p",null,[c(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),c(" object in the console log. ")],-1),ne={class:"row"},oe={class:"col"},ae={class:"col"},re=["innerHTML"],ie=t("p",null,[c(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),c(" . ")],-1),se={class:"mb-5"},le=t("h2",null,"Slot Method",-1),de=t("p",null,[c(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),c(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ce=t("h3",null,"Markup",-1),ue=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),me=t("h3",null,"Sample",-1),pe=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1),he={class:"mb-5"},ge=k('<h2>Linter</h2><p> This is a sample using JavaScript and linter. \u{1F534} is displayed on the line with the error. </p><p> If you click this \u{1F534} or press a <kbd>Ctrl</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> ( <kbd>Cmd</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> on macOS), the error content will be displayed on the panel. <kbd>F8</kbd> key shows the next error. </p><p> This sample uses <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank"> eslint4b-prebuilt </a> for the eslint linter. </p>',4),fe=t("pre",null,`<template>
  <code-mirror
    v-model="value"
    :lang="cmLang"
    :linter="cmLinter"
    basic
  >
  <pre>
document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'))
);
  </pre>
  </code-mirror>
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
    /** Result Text */
    const value = ref('');

    /** CodeMirror Language */
    const cmLang = javascript();
    /** CodeMirror Linter */
    const cmLinter = esLint(new Linter());

    return {
      input,
      output,
      cmLang,
      cmLinter,
    };
  },
});
<\/script>
`,-1),ve=t("h3",null,"Sample",-1),be=t("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),we=t("pre",null,`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'))
);
        `,-1);function ke(e,n,o,r,a,i){const s=L("code-mirror");return x(),y("div",K,[Y,t("section",Q,[X,u(s,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:h(()=>[Z]),_:1},8,["lang","dark"]),ee,te,t("div",ne,[t("div",oe,[u(s,{modelValue:e.demo,"onUpdate:modelValue":n[0]||(n[0]=d=>e.demo=d),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",ae,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,re)])]),ie]),t("section",se,[le,de,ce,u(s,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:h(()=>[ue]),_:1},8,["lang","dark"]),me,u(s,{readonly:"",dark:e.dark},{default:h(()=>[pe]),_:1},8,["dark"])]),t("section",he,[ge,u(s,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:h(()=>[fe]),_:1},8,["lang","dark"]),ve,be,u(s,{lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,basic:""},{default:h(()=>[we]),_:1},8,["lang","linter","dark"])])])}var _e=C(G,[["render",ke]]);const ye=w({components:{DemoPage:_e},setup(){const e=m(window.matchMedia("(prefers-color-scheme: dark)").matches);return v(e,()=>{const n=document.querySelector(".navbar").classList,o=document.querySelector("main").classList,r=document.querySelector(".footer").classList;e.value?(n.remove("navbar-dark","bg-dark"),n.add("navbar-light","bg-light"),o.remove("bg-white","text-dark"),o.add("bg-black","text-light"),r.remove("bg-light","text-dark"),r.add("bg-dark","text-light")):(n.add("navbar-dark","bg-dark"),n.remove("navbar-light","bg-light"),o.add("bg-white","text-dark"),o.remove("bg-black","text-light"),r.add("bg-light","text-dark"),r.remove("bg-dark","text-light"))}),{dark:e}}}),Le={class:"navbar navbar-expand-md navbar-dark bg-dark"},xe={class:"container-fluid d-flex justify-content-between"},Ce=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Me=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),Ve={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},$e={class:"navbar-nav"},je=k('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),qe={class:"nav-item"},Se=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Te=[Se],Ue={role:"main",class:"flex-shrink-0 pt-4 bg-white"},Oe=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[c(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),c(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),c(" . ")])],-1);function Be(e,n,o,r,a,i){const s=L("demo-page");return x(),y("div",null,[t("header",null,[t("nav",Le,[t("div",xe,[Ce,Me,t("div",Ve,[t("ul",$e,[je,t("li",qe,[t("a",{class:"nav-link",href:"#",onClick:n[0]||(n[0]=d=>e.dark=!e.dark)},Te)])])])])])]),t("main",Ue,[u(s,{dark:e.dark},null,8,["dark"])]),Oe])}var Ae=C(ye,[["render",Be]]);console.info("\u2139 Running as Vue3.");U(Ae).mount("#app");

import{d as w,r as u,t as $,c as M,w as f,o as C,n as L,a as q,b as k,e as U,v as S,f as t,g as T,h as B,i as _,j as h,k as b,l as x,m as d,p as V,q as j}from"./vue.89945fd1.js";import{E as m,a as p,b as O,k as A,i as z,m as E,h as N}from"./codemirror.4c591a61.js";import{l as g}from"./lodash.4271d345.js";const H=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}};H();var y=(e,a)=>{const i=e.__vccOpts||e;for(const[n,o]of a)i[n]=o;return i};const D=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},selection:{type:Object,default:()=>{}},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Array,default:()=>{}}},emits:["update:modelValue","update"],setup(e,a){const i=u(),n=u(e.modelValue),{dark:o}=$(e),s=a.emit,r=M(()=>{const c=[e.basic?O:void 0,m.updateListener.of(v=>s("update",v)),m.theme(e.theme,{dark:o.value}),e.wrap?m.lineWrapping:void 0,e.tab?A.of([z]):void 0,e.phrases?p.phrases.of(e.phrases):void 0,e.readonly?p.readOnly.of(e.readonly):void 0,e.editable?m.editable.of(e.editable):void 0,e.lang?B(e.lang):void 0];return e.linter&&g.exports.merge(c,e.linter),e.extensions&&g.exports.merge(c,e.extensions),g.exports.compact(c)});let l;return f(n,c=>{if(l.composing)return;const v=l.state.selection;l.setState(p.create({doc:c,extensions:r.value,selection:v}))}),f(o,()=>{l.setState(p.create({doc:n.value,extensions:r.value}))}),C(async()=>{n.value==""&&i.value&&(n.value=g.exports.trim(i.value.childNodes[0].innerText)),l=new m({state:p.create({doc:n.value,selection:e.selection,extensions:r.value}),parent:i.value,dispatch:c=>{l.update([c]),!c.changes.empty&&(n.value=l.state.doc.toString(),s("update:modelValue",n.value))}}),await L()}),q(()=>l.destroy()),{context:a,editor:i}}}),I={ref:"editor",class:"vue-codemirror"};function R(e,a,i,n,o,s){return _(),k("div",I,[U(t("aside",null,[T(e.$slots,"default")],512),[[S,!e.context.slots.default]])],512)}var W=y(D,[["render",R]]);const P=w({components:{CodeMirror:W},props:{dark:{type:Boolean,default:!1}},setup(){const e=u(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),a=u(""),i=u(E()),n=u(N()),o=u({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(r=>{a.value=r.parse(e.value)}),f(e,r=>{window.markdown.ready.then(l=>{a.value=l.parse(r)})}),{demo:e,output:a,cmLangMd:i,cmLangHtml:n,cmTheme:o,onViewUpdate:r=>console.log(r)}}}),F=x('<h1>Vue CodeMirror6 Markdown Editor Demo</h1><p> A rough demo of Vue Codemirror in action. You can switch between dark modes from the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path></svg> icon in the upper left. </p><h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',5),G=t("pre",null,`<template>
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
    const cmLang = ref(md());

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
`,-1),K=t("h3",null,"Sample",-1),Y=t("p",null,[d(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),d(" object in the console log. ")],-1),J={class:"row"},Q={class:"col"},X={class:"col"},Z=["innerHTML"],ee=t("p",null,[d(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),d(" . ")],-1),te=t("hr",null,null,-1),oe=t("h2",null,"Slot Method",-1),ae=t("p",null,[d(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),d(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ne=t("h3",null,"Markup",-1),re=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),ie=t("h3",null,"Sample",-1),se=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function le(e,a,i,n,o,s){const r=V("code-mirror");return _(),k("div",null,[F,h(r,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:b(()=>[G]),_:1},8,["lang","dark"]),K,Y,t("div",J,[t("div",Q,[h(r,{modelValue:e.demo,"onUpdate:modelValue":a[0]||(a[0]=l=>e.demo=l),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",X,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,Z)])]),ee,te,oe,ae,ne,h(r,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:b(()=>[re]),_:1},8,["lang","dark"]),ie,h(r,{readonly:"",dark:e.dark},{default:b(()=>[se]),_:1},8,["dark"])])}var de=y(P,[["render",le]]);const ce=w({components:{DemoPage:de},setup(){const e=u(window.matchMedia("(prefers-color-scheme: dark)").matches);return f(e,()=>{const a=document.querySelector(".navbar").classList,i=document.querySelector("main").classList,n=document.querySelector(".footer").classList;e.value?(a.remove("navbar-dark","bg-dark"),a.add("navbar-light","bg-light"),i.remove("bg-white","text-dark"),i.add("bg-black","text-light"),n.remove("bg-light","text-dark"),n.add("bg-dark","text-light")):(a.add("navbar-dark","bg-dark"),a.remove("navbar-light","bg-light"),i.add("bg-white","text-dark"),i.remove("bg-black","text-light"),n.add("bg-light","text-dark"),n.remove("bg-dark","text-light"))}),{dark:e}}}),ue={class:"navbar navbar-expand-md navbar-dark bg-dark"},me={class:"container-fluid d-flex justify-content-between"},pe=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),he=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),ge={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},fe={class:"navbar-nav"},ve=x('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),be={class:"nav-item"},we=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),ke=[we],_e={role:"main",class:"flex-shrink-0 pt-4 bg-white"},ye={class:"container"},xe=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[d(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),d(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),d(" . ")])],-1);function Ve(e,a,i,n,o,s){const r=V("demo-page");return _(),k("div",null,[t("header",null,[t("nav",ue,[t("div",me,[pe,he,t("div",ge,[t("ul",fe,[ve,t("li",be,[t("a",{class:"nav-link",href:"#",onClick:a[0]||(a[0]=l=>e.dark=!e.dark)},ke)])])])])])]),t("main",_e,[t("div",ye,[h(r,{dark:e.dark},null,8,["dark"])])]),xe])}var $e=y(ce,[["render",Ve]]);console.info("\u2139 Running as Vue3.");j($e).mount("#app");

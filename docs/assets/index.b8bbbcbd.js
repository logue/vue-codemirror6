import{h as M,d as w,r as u,t as L,c as $,w as f,o as q,n as U,a as T,b as O,e as _,f as h,g as b,i as t,j as y,k as c,l as x,m as V,p as B}from"./vue.17cb1372.js";import{E as m,a as p,b as j,k as A,i as S,m as z,h as E}from"./codemirror.4c591a61.js";import{l as g}from"./lodash.4271d345.js";const N=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}};N();const H=e=>e?Object.entries(e).reduce((o,[a,r])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...o,[a]:r}),{}):null,k=(e,o={},a)=>{const{props:r,domProps:n,on:s,...i}=o,l=s?H(s):{},d={...i,...r,...n,...l};return M(e,d,a)},D=e=>typeof e=="function"?e():e;var I=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},selection:{type:Object,default:()=>{}},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Array,default:()=>{}}},emits:["update:modelValue","update"],setup(e,o){const a=u(),r=u(e.modelValue),{dark:n}=L(e),s=o.emit,i=$(()=>{const d=[e.basic?j:void 0,m.updateListener.of(v=>s("update",v)),m.theme(e.theme,{dark:n.value}),e.wrap?m.lineWrapping:void 0,e.tab?A.of([S]):void 0,e.phrases?p.phrases.of(e.phrases):void 0,e.readonly?p.readOnly.of(e.readonly):void 0,e.editable?m.editable.of(e.editable):void 0,e.lang?O(e.lang):void 0];return e.linter&&g.exports.merge(d,e.linter),e.extensions&&g.exports.merge(d,e.extensions),g.exports.compact(d)});let l;return f(r,d=>{if(l.composing)return;const v=l.state.selection;l.setState(p.create({doc:d,extensions:i.value,selection:v}))}),f(n,()=>{l.setState(p.create({doc:r.value,extensions:i.value}))}),q(async()=>{r.value==""&&a.value&&(r.value=g.exports.trim(a.value.childNodes[0].innerText)),l=new m({state:p.create({doc:r.value,selection:e.selection,extensions:i.value}),parent:a.value,dispatch:d=>{l.update([d]),!d.changes.empty&&(r.value=l.state.doc.toString(),s("update:modelValue",r.value))}}),await U()}),T(()=>l.destroy()),{context:o,editor:a}},render(){return k("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?k("aside",{style:"display: none;"},D(this.$slots.default)):void 0)}}),C=(e,o)=>{const a=e.__vccOpts||e;for(const[r,n]of o)a[r]=n;return a};const R=w({components:{CodeMirror:I},props:{dark:{type:Boolean,default:!1}},setup(){const e=u(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),o=u(""),a=u(z()),r=u(E()),n=u({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(i=>{o.value=i.parse(e.value)}),f(e,i=>{window.markdown.ready.then(l=>{o.value=l.parse(i)})}),{demo:e,output:o,cmLangMd:a,cmLangHtml:r,cmTheme:n,onViewUpdate:i=>console.log(i)}}}),P={class:"container"},W=y('<h1>Vue CodeMirror6 Markdown Editor Demo</h1><p> A rough demo of Vue Codemirror in action. You can switch between dark modes from the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path></svg> icon in the upper left. </p><h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',5),F=t("pre",null,`<template>
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
`,-1),G=t("h3",null,"Sample",-1),K=t("p",null,[c(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),c(" object in the console log. ")],-1),Y={class:"row"},J={class:"col"},Q={class:"col"},X=["innerHTML"],Z=t("p",null,[c(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),c(" . ")],-1),ee=t("hr",null,null,-1),te=t("h2",null,"Slot Method",-1),oe=t("p",null,[c(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),c(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ae=t("h3",null,"Markup",-1),ne=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),re=t("h3",null,"Sample",-1),ie=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function se(e,o,a,r,n,s){const i=x("code-mirror");return V(),_("div",P,[W,h(i,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:b(()=>[F]),_:1},8,["lang","dark"]),G,K,t("div",Y,[t("div",J,[h(i,{modelValue:e.demo,"onUpdate:modelValue":o[0]||(o[0]=l=>e.demo=l),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",Q,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,X)])]),Z,ee,te,oe,ae,h(i,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:b(()=>[ne]),_:1},8,["lang","dark"]),re,h(i,{readonly:"",dark:e.dark},{default:b(()=>[ie]),_:1},8,["dark"])])}var le=C(R,[["render",se]]);const de=w({components:{DemoPage:le},setup(){const e=u(window.matchMedia("(prefers-color-scheme: dark)").matches);return f(e,()=>{const o=document.querySelector(".navbar").classList,a=document.querySelector("main").classList,r=document.querySelector(".footer").classList;e.value?(o.remove("navbar-dark","bg-dark"),o.add("navbar-light","bg-light"),a.remove("bg-white","text-dark"),a.add("bg-black","text-light"),r.remove("bg-light","text-dark"),r.add("bg-dark","text-light")):(o.add("navbar-dark","bg-dark"),o.remove("navbar-light","bg-light"),a.add("bg-white","text-dark"),a.remove("bg-black","text-light"),r.add("bg-light","text-dark"),r.remove("bg-dark","text-light"))}),{dark:e}}}),ce={class:"navbar navbar-expand-md navbar-dark bg-dark"},ue={class:"container-fluid d-flex justify-content-between"},me=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),pe=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),he={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},ge={class:"navbar-nav"},fe=y('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),ve={class:"nav-item"},be=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),we=[be],ke={role:"main",class:"flex-shrink-0 pt-4 bg-white"},_e=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[c(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),c(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),c(" . ")])],-1);function ye(e,o,a,r,n,s){const i=x("demo-page");return V(),_("div",null,[t("header",null,[t("nav",ce,[t("div",ue,[me,pe,t("div",he,[t("ul",ge,[fe,t("li",ve,[t("a",{class:"nav-link",href:"#",onClick:o[0]||(o[0]=l=>e.dark=!e.dark)},we)])])])])])]),t("main",ke,[h(i,{dark:e.dark},null,8,["dark"])]),_e])}var xe=C(de,[["render",ye]]);console.info("\u2139 Running as Vue3.");B(xe).mount("#app");

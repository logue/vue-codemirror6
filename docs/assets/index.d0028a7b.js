import{d as k,r as u,t as L,c as C,w as v,o as M,n as V,a as q,b as w,e as S,v as T,f as t,g as B,h as _,i as f,j as b,k as c,l as x,F as j,m as E,p as O}from"./vue.f205e5cf.js";import{E as p,a as h,b as $,k as N,i as U,m as z,h as A,j as D}from"./codemirror.ce40541d.js";import{l as g}from"./lodash.4271d345.js";const H=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}};H();var y=(e,n)=>{const r=e.__vccOpts||e;for(const[a,o]of n)r[a]=o;return r};const I=k({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},selection:{type:Object,default:void 0},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:void 0},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Array,default:void 0}},emits:["update:modelValue","update"],setup(e,n){const r=u(),a=u(e.modelValue),{dark:o}=L(e),s=n.emit,i=C(()=>{const l=[p.updateListener.of(m=>s("update",m)),p.theme(e.theme,{dark:o.value}),e.basic?$:void 0,e.wrap?p.lineWrapping:void 0,e.tab?N.of([U]):void 0,e.phrases?h.phrases.of(e.phrases):void 0,e.lang,e.readonly?h.readOnly.of(e.readonly):void 0,e.editable?p.editable.of(e.editable):void 0];return e.linter&&g.exports.merge(l,e.linter),e.extensions&&g.exports.merge(l,e.extensions),g.exports.compact(l)});let d;return v(a,l=>{if(d.composing)return;const m=d.state.selection;d.setState(h.create({doc:l,extensions:i.value,selection:m}))}),v(o,()=>{d.setState(h.create({doc:a.value,extensions:i.value}))}),M(async()=>{a.value==""&&r.value&&(a.value=g.exports.trim(r.value.childNodes[0].innerText)),d=new p({state:h.create({doc:a.value,selection:e.selection,extensions:i.value}),parent:r.value,dispatch:l=>{d.update([l]),!l.changes.empty&&(a.value=d.state.doc.toString(),s("update:modelValue",a.value))}}),await V()}),q(()=>d.destroy()),{context:n,editor:r}}}),R={ref:"editor",class:"vue-codemirror"};function F(e,n,r,a,o,s){return _(),w("div",R,[S(t("aside",null,[B(e.$slots,"default")],512),[[T,!e.context.slots.default]])],512)}var P=y(I,[["render",F]]);const W=k({components:{CodeMirror:P},props:{dark:{type:Boolean,default:!1}},setup(){const e=u(z()),n=u(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),r=u(""),a=[$],o=u(A()),s=u(D()),i=u({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(l=>{r.value=l.parse(n.value)}),v(n,l=>{window.markdown.ready.then(m=>{r.value=m.parse(l)})}),{demoLang:e,demo:n,output:r,extensions:a,markupLang:o,scriptLang:s,cmTheme:i,onViewUpdate:l=>console.log(l)}}}),K={id:"app",class:"container"},G=t("h1",null,"Vue CodeMirror6 Markdown Editor Demo",-1),J=t("h2",null,"Normal Method",-1),Q=t("p",null,[c(" This is an example of simply pouring text into CodeMirror using "),t("code",null,"v-model"),c(" . ")],-1),X=t("pre",null,`<template>
  <code-mirror
    v-model="demo"
    :lang="demoLang"
    :extensions="demoExtension"
    wrap
  />
</template>

<script>
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { markdown } from '@codemirror/lang-markdown';
import { basicSetup } from '@codemirror/basic-setup';

export default defineComponent({
  components: {
    CodeMirror,
  },
  setup() {
    /** Demo text */
    const demo = ref(\`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\`);

    /** Result Text */
    const markdown = ref('');

    /** CodeMirror Extensions */
    const cmExtensions = ref([basicSetup]);

    /** CodeMirror Language */
    const cmLang = ref(markdown());

    // Initialize markdown
    window['markdown'].ready.then(markdown => {
      markdown.value = markdown.parse(demo.value);
    });

    // Realtime convert Markdown
    watch(demo, current => {
      // console.log('value changed', current);
      window['markdown'].ready.then(markdown => {
        markdown.value = markdown.parse(demo.value);
      });
    });

    return {
      demo,
      markdown,
      cmExtensions,
      cmLang,
    };
  },
});
<\/script>
`,-1),Y=t("h3",null,"Sample",-1),Z=t("p",null,[c(" The actual execution result is as follows. In this sample, the markdwon entered in the form on the left is reflected on the right side in real time using "),t("a",{href:"https://github.com/rsms/markdown-wasm"},"markdown-wasm"),c(" . ")],-1),ee={class:"row"},te={class:"col"},oe={class:"col"},ne=["innerHTML"],ae=t("hr",null,null,-1),re=t("h2",null,"Slot Method",-1),se=t("p",null,[c(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),c(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ie=c(" Markup: "),le=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),de=c(" Sample: "),ce=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function ue(e,n,r,a,o,s){const i=x("code-mirror");return _(),w("div",K,[G,J,Q,f(i,{extensions:e.extensions,lang:e.markupLang,readonly:"",dark:e.dark},{default:b(()=>[X]),_:1},8,["extensions","lang","dark"]),Y,Z,t("div",ee,[t("div",te,[f(i,{modelValue:e.demo,"onUpdate:modelValue":n[0]||(n[0]=d=>e.demo=d),lang:e.demoLang,extensions:e.extensions,theme:e.cmTheme,dark:e.dark,wrap:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","extensions","theme","dark","onUpdate"])]),t("div",oe,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,ne)])]),ae,re,se,ie,f(i,{extensions:e.extensions,lang:e.markupLang,readonly:"",dark:e.dark},{default:b(()=>[le]),_:1},8,["extensions","lang","dark"]),de,f(i,{readonly:"",dark:e.dark},{default:b(()=>[ce]),_:1},8,["dark"])])}var me=y(W,[["render",ue]]);const pe=k({components:{DemoPage:me},setup(){const e=u(!1);return v(e,()=>{const n=document.querySelector(".navbar").classList,r=document.querySelector("main").classList,a=document.querySelector(".footer").classList;e.value?(n.remove("navbar-dark","bg-dark"),n.add("navbar-light","bg-light"),r.remove("bg-white","text-dark"),r.add("bg-black","text-light"),a.remove("bg-light","text-dark"),a.add("bg-dark","text-light")):(n.add("navbar-dark","bg-dark"),n.remove("navbar-light","bg-light"),r.add("bg-white","text-dark"),r.remove("bg-black","text-light"),a.add("bg-light","text-dark"),a.remove("bg-dark","text-light"))}),{dark:e}}}),he={class:"navbar navbar-expand-md navbar-dark bg-dark"},fe={class:"container-fluid d-flex justify-content-between"},ge=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),ve=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),be={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},ke={class:"navbar-nav"},we=E('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),_e={class:"nav-item"},ye=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),xe=[ye],$e={role:"main",class:"flex-shrink-0 pt-4 bg-white"},Le={class:"container"},Ce=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("address",{class:"container mb-0"},[t("a",{href:"//logue.dev/"},"Logue"),c(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),c(" . ")])],-1);function Me(e,n,r,a,o,s){const i=x("demo-page");return _(),w(j,null,[t("header",null,[t("nav",he,[t("div",fe,[ge,ve,t("div",be,[t("ul",ke,[we,t("li",_e,[t("a",{class:"nav-link",onClick:n[0]||(n[0]=d=>e.dark=!e.dark)},xe)])])])])])]),t("main",$e,[t("div",Le,[f(i,{dark:e.dark},null,8,["dark"])])]),Ce],64)}var Ve=y(pe,[["render",Me]]);console.info("\u2139 Running as Vue3."),O(Ve).mount("#app");

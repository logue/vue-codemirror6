import{d as k,r as u,t as L,c as M,w as v,o as $,n as V,a as q,b as w,e as C,v as S,f as a,g as T,h as _,i as B,j as h,k as b,l as d,m as x,p as O,q as j}from"./vue.35ee487a.js";import{E as m,a as p,b as N,k as U,i as E,m as H,h as D}from"./codemirror.cdeea18c.js";import{l as f}from"./lodash.4271d345.js";const z=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}};z();var y=(e,o)=>{const i=e.__vccOpts||e;for(const[n,t]of o)i[n]=t;return i};const A=k({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},selection:{type:Object,default:void 0},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:void 0},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Array,default:void 0}},emits:["update:modelValue","update"],setup(e,o){const i=u(),n=u(e.modelValue),{dark:t}=L(e),s=o.emit,r=M(()=>{const c=[e.basic?N:void 0,m.updateListener.of(g=>s("update",g)),m.theme(e.theme,{dark:t.value}),e.wrap?m.lineWrapping:void 0,e.tab?U.of([E]):void 0,e.phrases?p.phrases.of(e.phrases):void 0,e.readonly?p.readOnly.of(e.readonly):void 0,e.editable?m.editable.of(e.editable):void 0,e.lang?B(e.lang):void 0];return e.linter&&f.exports.merge(c,e.linter),e.extensions&&f.exports.merge(c,e.extensions),f.exports.compact(c)});let l;return v(n,c=>{if(l.composing)return;const g=l.state.selection;l.setState(p.create({doc:c,extensions:r.value,selection:g}))}),v(t,()=>{l.setState(p.create({doc:n.value,extensions:r.value}))}),$(async()=>{n.value==""&&i.value&&(n.value=f.exports.trim(i.value.childNodes[0].innerText)),l=new m({state:p.create({doc:n.value,selection:e.selection,extensions:r.value}),parent:i.value,dispatch:c=>{l.update([c]),!c.changes.empty&&(n.value=l.state.doc.toString(),s("update:modelValue",n.value))}}),await V()}),q(()=>l.destroy()),{context:o,editor:i}}}),I={ref:"editor",class:"vue-codemirror"};function R(e,o,i,n,t,s){return _(),w("div",I,[C(a("aside",null,[T(e.$slots,"default")],512),[[S,!e.context.slots.default]])],512)}var P=y(A,[["render",R]]);const W=k({components:{CodeMirror:P},props:{dark:{type:Boolean,default:!1}},setup(){const e=u(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),o=u(""),i=u(H()),n=u(D()),t=u({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(r=>{o.value=r.parse(e.value)}),v(e,r=>{window.markdown.ready.then(l=>{o.value=l.parse(r)})}),{demo:e,output:o,cmLangMd:i,cmLangHtml:n,cmTheme:t,onViewUpdate:r=>console.log(r)}}}),F={id:"app",class:"container"},K=a("h1",null,"Vue CodeMirror6 Markdown Editor Demo",-1),G=a("h2",null,"Normal Method",-1),J=a("p",null,[d(" This is an example of simply pouring text into CodeMirror using "),a("code",null,"v-model"),d(" . ")],-1),Q=a("pre",null,`<template>
  <code-mirror
    v-model="demo"
    :lang="demoLang"
    basic
    wrap
  />
</template>

<script>
import { defineComponent } from 'vue';
// for vue2
// import { defineComponent } from '@vue/composition-api';

import CodeMirror from 'vue-codemirror6';

import { markdown } from '@codemirror/lang-markdown';

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
      cmLang,
    };
  },
});
<\/script>
`,-1),X=a("h3",null,"Sample",-1),Y=a("p",null,[d(" The actual execution result is as follows. In this sample, the markdwon entered in the form on the left is reflected on the right side in real time using "),a("a",{href:"https://github.com/rsms/markdown-wasm"},"markdown-wasm"),d(" . ")],-1),Z={class:"row"},ee={class:"col"},te={class:"col"},ae=["innerHTML"],oe=a("hr",null,null,-1),ne=a("h2",null,"Slot Method",-1),re=a("p",null,[d(" In this sample, the text is put directly inside the "),a("code",null,"<code-mirror>"),d(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ie=d(" Markup: "),se=a("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),le=d(" Sample: "),de=a("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function ce(e,o,i,n,t,s){const r=x("code-mirror");return _(),w("div",F,[K,G,J,h(r,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:b(()=>[Q]),_:1},8,["lang","dark"]),X,Y,a("div",Z,[a("div",ee,[h(r,{modelValue:e.demo,"onUpdate:modelValue":o[0]||(o[0]=l=>e.demo=l),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),a("div",te,[a("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,ae)])]),oe,ne,re,ie,h(r,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:b(()=>[se]),_:1},8,["lang","dark"]),le,h(r,{readonly:"",basic:"",dark:e.dark},{default:b(()=>[de]),_:1},8,["dark"])])}var ue=y(W,[["render",ce]]);const me=k({components:{DemoPage:ue},setup(){const e=u(!1);return v(e,()=>{const o=document.querySelector(".navbar").classList,i=document.querySelector("main").classList,n=document.querySelector(".footer").classList;e.value?(o.remove("navbar-dark","bg-dark"),o.add("navbar-light","bg-light"),i.remove("bg-white","text-dark"),i.add("bg-black","text-light"),n.remove("bg-light","text-dark"),n.add("bg-dark","text-light")):(o.add("navbar-dark","bg-dark"),o.remove("navbar-light","bg-light"),i.add("bg-white","text-dark"),i.remove("bg-black","text-light"),n.add("bg-light","text-dark"),n.remove("bg-dark","text-light"))}),{dark:e}}}),pe=O('<header><nav class="navbar navbar-expand-md navbar-dark bg-dark"><div class="container-fluid d-flex justify-content-between"><a class="navbar-brand" href="#">Vue CodeMirror6</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div id="navbarCollapse" class="collapse navbar-collapse flex-grow-0"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li></ul></div></div></nav></header>',1),he={role:"main",class:"flex-shrink-0 pt-4 bg-white"},fe={class:"container"},ve=a("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[a("div",{class:"container mb-0"},[d(" \xA9 2022 by "),a("a",{href:"http://logue.dev/"},"Logue"),d(" . Licensed under the "),a("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),d(" . ")])],-1);function ge(e,o,i,n,t,s){const r=x("demo-page");return _(),w("div",null,[pe,a("main",he,[a("div",fe,[h(r,{dark:e.dark},null,8,["dark"])])]),ve])}var be=y(me,[["render",ge]]);console.info("\u2139 Running as Vue3."),j(be).mount("#app");

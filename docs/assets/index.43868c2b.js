import{d as w,r as c,c as V,w as g,o as $,n as y,a as M,b as _,e as C,v as q,f as o,g as S,h as b,i as h,j as v,k as u,l as x,F as T,m as E,p as j}from"./vue.a73abd7b.js";import{E as m,a as p,m as O,b as B,h as N,j as U}from"./codemirror.7f7ca4a8.js";import{l as f}from"./lodash.4271d345.js";const D=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}};D();var k=(e,r)=>{const s=e.__vccOpts||e;for(const[i,n]of r)s[i]=n;return s};const z=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:void 0},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Array,default:void 0}},emits:["update:modelValue","update"],setup(e,r){const s=c(),i=c(e.modelValue),n=r.emit,t=V(()=>{console.log(e.theme,e.dark);const d=[m.updateListener.of(l=>n("update",l)),m.theme(e.theme,{dark:e.dark}),e.wrap?m.lineWrapping:void 0,e.phrases?p.phrases.of(e.phrases):void 0,e.lang,e.readonly?p.readOnly.of(e.readonly):void 0,e.editable?m.editable.of(e.editable):void 0];return e.linter&&f.exports.merge(d,e.linter),e.extensions&&f.exports.merge(d,e.extensions),f.exports.compact(d)});let a;return g(i,d=>{if(a.composing)return;const l=a.state.selection;a.setState(p.create({doc:d,extensions:t.value,selection:l}))}),g(t,async()=>{a.setState(p.create({doc:i.value,extensions:t.value})),await y()},{deep:!0}),$(async()=>{const d=!i.value&&s.value?f.exports.trim(s.value.childNodes[0].innerText):i.value;a=new m({state:p.create({doc:d,extensions:t.value}),parent:s.value,dispatch:l=>{a.update([l]),!l.changes.empty&&(i.value=a.state.doc.toString(),n("update:modelValue",i.value))}}),await y()}),M(()=>a.destroy()),{context:r,editor:s}}}),A={ref:"editor",class:"vue-codemirror"};function H(e,r,s,i,n,t){return b(),_("div",A,[C(o("aside",null,[S(e.$slots,"default")],512),[[q,!e.context.slots.default]])],512)}var I=k(z,[["render",H]]);const F=w({components:{CodeMirror:I},setup(){const e=c(O()),r=c(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),s=c(""),i=[B],n=c(N()),t=c(U()),a=c({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(l=>{s.value=l.parse(r.value)}),g(r,l=>{window.markdown.ready.then(L=>{s.value=L.parse(l)})}),{demoLang:e,demo:r,output:s,extensions:i,markupLang:n,scriptLang:t,cmTheme:a,onViewUpdate:l=>console.log(l)}}}),P={id:"app",class:"container"},R=o("h1",null,"Vue CodeMirror6 Markdown Editor Demo",-1),W=o("h2",null,"Normal Method",-1),K=o("p",null,[u(" This is an example of simply pouring text into CodeMirror using "),o("code",null,"v-model"),u(" . ")],-1),G=o("pre",null,`<template>
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
`,-1),J=o("h3",null,"Sample",-1),Q=o("p",null,[u(" The actual execution result is as follows. In this sample, the markdwon entered in the form on the left is reflected on the right side in real time using "),o("a",{href:"https://github.com/rsms/markdown-wasm"},"markdown-wasm"),u(" . ")],-1),X={class:"row"},Y={class:"col"},Z={class:"col"},ee=["innerHTML"],ne=o("hr",null,null,-1),oe=o("h2",null,"Slot Method",-1),te=o("p",null,[u(" In this sample, the text is put directly inside the "),o("code",null,"<code-mirror>"),u(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ae=u(" Markup: "),re=o("pre",null,`<code-mirror readonly dark>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),se=u(" Sample: "),ie=o("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function le(e,r,s,i,n,t){const a=x("code-mirror");return b(),_("div",P,[R,W,K,h(a,{extensions:e.extensions,lang:e.markupLang,readonly:""},{default:v(()=>[G]),_:1},8,["extensions","lang"]),J,Q,o("div",X,[o("div",Y,[h(a,{modelValue:e.demo,"onUpdate:modelValue":r[0]||(r[0]=d=>e.demo=d),lang:e.demoLang,extensions:e.extensions,theme:e.cmTheme,wrap:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","extensions","theme","onUpdate"])]),o("div",Z,[o("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,ee)])]),ne,oe,te,ae,h(a,{extensions:e.extensions,lang:e.markupLang,readonly:""},{default:v(()=>[re]),_:1},8,["extensions","lang"]),se,h(a,{readonly:"",dark:""},{default:v(()=>[ie]),_:1})])}var de=k(F,[["render",le]]);const ue=w({components:{DemoPage:de}}),ce=E('<header><nav class="navbar navbar-expand-md navbar-dark bg-dark"><div class="container-fluid d-flex justify-content-between"><a class="navbar-brand" href="#">Vue CodeMirror6</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div id="navbarCollapse" class="collapse navbar-collapse flex-grow-0"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li></ul></div></div></nav></header>',1),me={role:"main",class:"flex-shrink-0 mt-4"},pe={class:"container"},he=o("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[o("address",{class:"container mb-0"},[o("a",{href:"//logue.dev/"},"Logue"),u(" . Licensed under the "),o("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),u(" . ")])],-1);function fe(e,r,s,i,n,t){const a=x("demo-page");return b(),_(T,null,[ce,o("main",me,[o("div",pe,[h(a)])]),he],64)}var ve=k(ue,[["render",fe]]);console.info("\u2139 Running as Vue3."),j(ve).mount("#app");

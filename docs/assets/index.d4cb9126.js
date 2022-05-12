import{d as _,r as u,c as M,w,o as V,n as x,a as $,b,e as C,v as q,f as o,g as S,h as k,i as h,j as v,k as c,l as L,F as T,m as E,p as j}from"./vue.a73abd7b.js";import{E as f,a as p,m as O,b as N,h as U,j as B}from"./codemirror.7f7ca4a8.js";import{l as g}from"./lodash.4271d345.js";const D=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerpolicy&&(t.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?t.credentials="include":n.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}};D();var y=(e,a)=>{const s=e.__vccOpts||e;for(const[r,n]of a)s[r]=n;return s};const z=_({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>{}},dark:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:void 0},phrases:{type:Object,default:void 0},lang:{type:Object,default:void 0},linter:{type:Array,default:void 0}},emits:["update:modelValue","update"],setup(e,a){const s=u(),r=u(e.modelValue),n=u(e.dark),t=a.emit,i=M(()=>{const l=[f.updateListener.of(m=>t("update",m)),f.theme(e.theme,{dark:n.value}),e.phrases?p.phrases.of(e.phrases):void 0,e.lang,e.readonly?p.readOnly.of(e.readonly):void 0,e.editable?f.editable.of(e.editable):void 0];return e.linter&&g.exports.merge(l,e.linter),e.extensions&&g.exports.merge(l,e.extensions),g.exports.compact(l)});let d;return w(r,l=>{if(d.composing)return;const m=d.state.selection;d.setState(p.create({doc:l,extensions:i.value,selection:m}))}),w(i,async l=>{d.setState(p.create({doc:r.value,extensions:l})),await x()},{deep:!0}),V(async()=>{const l=!r.value&&s.value?s.value.childNodes[0].innerText:r.value;d=new f({state:p.create({doc:l,extensions:i.value}),parent:s.value,dispatch:m=>{d.update([m]),!m.changes.empty&&(r.value=d.state.doc.toString(),t("update:modelValue",r.value))}}),await x()}),$(()=>d.destroy()),{context:a,editor:s}}}),A={ref:"editor",class:"vue-codemirror"};function H(e,a,s,r,n,t){return k(),b("div",A,[C(o("aside",null,[S(e.$slots,"default")],512),[[q,!e.context.slots.default]])],512)}var I=y(z,[["render",H]]);const F=_({components:{CodeMirror:I},setup(){const e=u(O()),a=u(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),s=u(""),r=[N],n=u(U()),t=u(B()),i=u({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(l=>{s.value=l.parse(a.value)}),w(a,l=>{window.markdown.ready.then(m=>{s.value=m.parse(l)})}),{demoLang:e,demo:a,output:s,extensions:r,markupLang:n,scriptLang:t,cmTheme:i,onViewUpdate:l=>console.log(l)}}}),P={id:"app",class:"container"},R=o("h1",null,"Vue CodeMirror6 Markdown Editor Demo",-1),K=o("h2",null,"Normal Method",-1),W=o("p",null,[c(" This is an example of simply pouring text into CodeMirror using "),o("code",null,"v-model"),c(" . ")],-1),G=o("pre",null,`<template>
  <code-mirror
    v-model="demo"
    :lang="demoLang"
    :extensions="demoExtension"
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
`,-1),J=c(" Sample: "),Q={class:"row"},X={class:"col"},Y={class:"col"},Z=c(" Here, the input text is converted to Markdown in real time using "),ee=o("a",{href:"https://github.com/rsms/markdown-wasm"},"markdown-wasm",-1),ne=c(" . "),oe=["innerHTML"],te=o("hr",null,null,-1),ae=o("h2",null,"Slot Method",-1),se=o("p",null,[c(" In this sample, the text is put directly inside the "),o("code",null,"<code-mirror>"),c(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),re=c(" Markup: "),ie=o("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),le=c(" Sample: "),de=o("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1);function ce(e,a,s,r,n,t){const i=L("code-mirror");return k(),b("div",P,[R,K,W,h(i,{extensions:e.extensions,lang:e.markupLang,readonly:""},{default:v(()=>[G]),_:1},8,["extensions","lang"]),J,o("div",Q,[o("div",X,[h(i,{modelValue:e.demo,"onUpdate:modelValue":a[0]||(a[0]=d=>e.demo=d),lang:e.demoLang,extensions:e.extensions,theme:e.cmTheme,onUpdate:e.onViewUpdate},null,8,["modelValue","lang","extensions","theme","onUpdate"])]),o("div",Y,[Z,ee,ne,o("div",{class:"p-3 m-2 bg-light text-dark",innerHTML:e.output},null,8,oe)])]),te,ae,se,re,h(i,{extensions:e.extensions,lang:e.markupLang,readonly:""},{default:v(()=>[ie]),_:1},8,["extensions","lang"]),le,h(i,{readonly:""},{default:v(()=>[de]),_:1})])}var ue=y(F,[["render",ce]]);const me=_({components:{DemoPage:ue}}),pe=E('<header><nav class="navbar navbar-expand-md navbar-dark bg-dark"><div class="container-fluid d-flex justify-content-between"><a class="navbar-brand" href="#">Vue CodeMirror6</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div id="navbarCollapse" class="collapse navbar-collapse flex-grow-0"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li></ul></div></div></nav></header>',1),he={role:"main",class:"flex-shrink-0 mt-4"},fe={class:"container"},ve=o("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[o("address",{class:"container mb-0"},[o("a",{href:"//logue.dev/"},"Logue"),c(" . Licensed under the "),o("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),c(" . ")])],-1);function ge(e,a,s,r,n,t){const i=L("demo-page");return k(),b(T,null,[pe,o("main",he,[o("div",fe,[h(i)])]),ve],64)}var we=y(me,[["render",ge]]);console.info("\u2139 Running as Vue3."),j(we).mount("#app");
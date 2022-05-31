import{h as q,d as k,r as h,t as U,w as b,o as j,n as B,a as E,b as O,c as S,e as t,f as p,g as w,i as A,v as z,j as u,k as _,l as V,m as M,p as D}from"./vue.5514597c.js";import{E as v,a as f,b as N,k as H,i as R,l as G,c as J,d as L,m as F,h as I,j as W,e as P}from"./codemirror.23818c89.js";import{l as x}from"./lodash.4271d345.js";import{z as K}from"./linter.4d0ec9e4.js";const Y=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}};Y();const Q=e=>e?Object.entries(e).reduce((r,[a,l])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...r,[a]:l}),{}):null,C=(e,r={},a)=>{const{props:l,domProps:o,on:i,...n}=r,d=i?Q(i):{};return q(e,{...n,...l,...o,...d},a)},X=e=>typeof e=="function"?e():e;var Z=k({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Function,default:void 0},lintGutter:{type:Boolean,defalt:!1}},emits:["update:modelValue","update"],setup(e,r){const a=h(),{dark:l}=U(e),o=h(e.modelValue),i=r.emit;let n;b(o,s=>{if(n.composing)return;const c=n.state.selection;n.setState(f.create({doc:s,extensions:d(),selection:c}))}),b(()=>e.modelValue,s=>n.dispatch({changes:{from:0,to:n.state.doc.length,insert:s}})),b(l,()=>{n.setState(f.create({doc:o.value,extensions:d()}))}),j(async()=>{a.value&&a.value.childNodes[0]&&(o.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),o.value=x.exports.trim(a.value.childNodes[0].innerText)),n=new v({state:f.create({doc:o.value,extensions:d()}),parent:a.value,dispatch:s=>{n.update([s]),!s.changes.empty&&(o.value=n.state.doc.toString(),i("update:modelValue",o.value))}}),await B()}),E(()=>n.destroy());const d=()=>{const s=x.exports.compact([e.basic?N:void 0,v.updateListener.of(c=>i("update",c)),v.theme(e.theme,{dark:l.value}),e.wrap?v.lineWrapping:void 0,e.tab?H.of([R]):void 0,e.phrases?f.phrases.of(e.phrases):void 0,e.readonly?f.readOnly.of(e.readonly):void 0,e.editable?v.editable.of(e.editable):void 0,e.lang?O(e.lang):void 0,e.linter?G(e.linter):void 0,e.linter&&e.lintGutter?J():void 0,...e.extensions]);return console.debug("[CodeMirror.vue] Loaded extensions: ",s),s},m=()=>n.state.selection;return{context:r,editor:a,selection:m,getRange:(s,c)=>n.state.sliceDoc(s,c),getLine:s=>n.state.doc.line(s+1).text,lineCount:()=>n.state.doc.lines,getCursor:()=>m().main.head,listSelections:()=>m().ranges,getSelection:()=>n.state.sliceDoc(m().main.from,m().main.to),getSelections:()=>m().ranges.map(s=>n.state.sliceDoc(s.from,s.to)),somethingSelected:()=>m().ranges.some(s=>!s.empty),replaceRange:(s,c,T)=>n.dispatch({changes:{from:c,to:T,insert:s}}),replaceSelection:s=>n.dispatch(n.state.replaceSelection(s)),setCursor:s=>n.dispatch({selection:{anchor:s}}),setSelection:(s,c)=>n.dispatch({selection:{anchor:s,head:c}}),setSelections:(s,c)=>n.dispatch({selection:L.create(s,c)}),extendSelectionsBy:s=>n.dispatch({selection:L.create(m().ranges.map(c=>c.extend(s(c))))}),focus:()=>n.focus(),hasFocus:()=>n.hasFocus}},render(){return C("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?C("aside",{style:"display: none;"},X(this.$slots.default)):void 0)}}),$=(e,r)=>{const a=e.__vccOpts||e;for(const[l,o]of r)a[l]=o;return a};const ee=k({components:{CodeMirror:Z},props:{dark:{type:Boolean,default:!1}},setup(){const e=h(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),r=h(`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);`),a=h(""),l=F(),o=I(),i=W(),n=P(new K),d=h({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(g=>{a.value=g.parse(e.value)}),b(e,g=>{window.markdown.ready.then(y=>{a.value=y.parse(g)})}),{demo:e,demo2:r,output:a,cmLangMd:l,cmLangHtml:o,cmLangJs:i,cmLintJs:n,cmTheme:d,onViewUpdate:g=>console.log(g)}}}),te={class:"container"},ne=t("section",{class:"mb-5"},[t("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),t("p",null,[u(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),u(" icon in the upper left. ")])],-1),oe={class:"mb-5"},ae=_('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),se=t("pre",null,`<template>
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
`,-1),re=t("h3",null,"Sample",-1),ie=t("p",null,[u(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),u(" object in the console log. ")],-1),le={class:"row"},de={class:"col"},ce={class:"col"},ue=["innerHTML"],me=t("p",null,[u(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),u(" . ")],-1),pe=t("h2",null,"Slot Method",-1),he=t("p",null,[u(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),u(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ge=t("p",null,[u(" It's just for simple syntax highlighting. Do not use with "),t("code",null,"v-model"),u(" . ")],-1),ve=t("h3",null,"Markup",-1),fe=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),be=t("h3",null,"Sample",-1),we=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1),ke=_('<h2>Linter and cross binding demo</h2><p>This is a sample using JavaScript and linter.</p><p> When using <code>lintGutter</code> prop, \u{1F534} is displayed on the line with the error. <br> Click \u{1F534} or press a <kbd>Ctrl</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> ( <kbd>Cmd</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> on macOS), the error content will be displayed on the panel. <kbd>F8</kbd> key shows the next error. </p><p> This sample uses <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank"> eslint4b-prebuilt </a> for the eslint linter. </p>',4),_e=t("pre",null,`<template>
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
`,-1),ye=t("h3",null,"Sample",-1),Le=t("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),xe={class:"row"},Ce={class:"col-6"},Se={class:"col-6"},Ve=t("p",null,"Also, make sure that changing either value reflects that value.",-1);function Me(e,r,a,l,o,i){const n=V("code-mirror");return M(),S("div",te,[ne,t("section",oe,[ae,p(n,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:w(()=>[se]),_:1},8,["lang","dark"]),re,ie,t("div",le,[t("div",de,[p(n,{modelValue:e.demo,"onUpdate:modelValue":r[0]||(r[0]=d=>e.demo=d),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",ce,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,ue)])]),me]),t("section",null,[pe,he,ge,ve,p(n,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:w(()=>[fe]),_:1},8,["lang","dark"]),be,p(n,{readonly:"",dark:e.dark},{default:w(()=>[we]),_:1},8,["dark"])]),t("section",null,[ke,p(n,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:w(()=>[_e]),_:1},8,["lang","dark"]),ye,Le,t("div",xe,[t("div",Ce,[p(n,{modelValue:e.demo2,"onUpdate:modelValue":r[1]||(r[1]=d=>e.demo2=d),lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,lintGutter:"",basic:""},null,8,["modelValue","lang","linter","dark"])]),t("div",Se,[A(t("textarea",{"onUpdate:modelValue":r[2]||(r[2]=d=>e.demo2=d),rows:"3",class:"form-control"},null,512),[[z,e.demo2]])])]),Ve])])}var $e=$(ee,[["render",Me]]);const Te=k({components:{DemoPage:$e},setup(){const e=h(window.matchMedia("(prefers-color-scheme: dark)").matches);return b(e,()=>{const r=document.querySelector(".navbar").classList,a=document.querySelector("main").classList,l=document.querySelector(".footer").classList;e.value?(r.remove("navbar-dark","bg-dark"),r.add("navbar-light","bg-light"),a.remove("bg-white","text-dark"),a.add("bg-black","text-light"),l.remove("bg-light","text-dark"),l.add("bg-dark","text-light")):(r.add("navbar-dark","bg-dark"),r.remove("navbar-light","bg-light"),a.add("bg-white","text-dark"),a.remove("bg-black","text-light"),l.add("bg-light","text-dark"),l.remove("bg-dark","text-light"))}),{dark:e}}}),qe={class:"navbar navbar-expand-md navbar-dark bg-dark"},Ue={class:"container-fluid d-flex justify-content-between"},je=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Be=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),Ee={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},Oe={class:"navbar-nav"},Ae=_('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),ze={class:"nav-item"},De=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Ne=[De],He={role:"main",class:"flex-shrink-0 pt-4 bg-white"},Re=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[u(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),u(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),u(" . ")])],-1);function Ge(e,r,a,l,o,i){const n=V("demo-page");return M(),S("div",null,[t("header",null,[t("nav",qe,[t("div",Ue,[je,Be,t("div",Ee,[t("ul",Oe,[Ae,t("li",ze,[t("a",{class:"nav-link",href:"#",onClick:r[0]||(r[0]=d=>e.dark=!e.dark)},Ne)])])])])])]),t("main",He,[p(n,{dark:e.dark},null,8,["dark"])]),Re])}var Je=$(Te,[["render",Ge]]);console.info("\u2139 Running as Vue3.");D(Je).mount("#app");

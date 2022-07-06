import{h as j,d as w,r as p,c as y,w as v,o as B,n as E,a as O,t as A,b as V,e as n,f as m,g as f,i as z,v as D,j as u,k,l as M,m as $,p as N}from"./vue.7dc6131d.js";import{l as L}from"./lodash.0a8ed3d0.js";import{E as g,b as H,m as J,k as R,i as F,a as x,l as G,c as I,S as W,d as C,e as P,h as K,j as Y,f as Q}from"./codemirror.50ace0f3.js";import{z as X}from"./eslint4b.8481f1c2.js";const Z=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}};Z();const ee=e=>e?Object.entries(e).reduce((s,[o,r])=>(o=o.charAt(0).toUpperCase()+o.slice(1),o=`on${o}`,{...s,[o]:r}),{}):{},S=(e,s={},o)=>{const{props:r,domProps:t,on:i,...l}=s,c=i?ee(i):{};return j(e,{...l,...r,...t,...c},o)},te=e=>typeof e=="function"?e():e;var T=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Function,default:void 0},lintGutter:{type:Boolean,defalt:!1}},emits:["update:modelValue","update:view"],setup(e,s){const o=p(),r=p(e.modelValue);let t;const i=y({get:()=>t.state.selection,set:a=>t.dispatch({selection:a})}),l=y({get:()=>i.value.main.head||0,set:a=>t.dispatch({selection:{anchor:a}})}),c=s.emit;v(()=>e.modelValue,a=>{if(t.composing)return;const d=t.state.selection;t.dispatch({changes:{from:0,to:t.state.doc.length,insert:a},selection:d})}),v(()=>e.dark,()=>{t.dispatch({effects:W.reconfigure.of(b())})}),B(async()=>{let a=r.value;o.value&&o.value.childNodes[0]&&(r.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),a=L.exports.trim(o.value.childNodes[0].innerText)),t=new g({doc:a,extensions:b(),parent:o.value,dispatch:d=>{t.update([d]),!d.changes.empty&&c("update:modelValue",t.state.doc.toString())}}),await E()}),O(()=>t.destroy());const b=()=>L.exports.compact([e.basic?H:void 0,e.minimal&&!e.basic?J:void 0,g.updateListener.of(d=>c("update:view",d)),g.theme(e.theme,{dark:e.dark}),e.wrap?g.lineWrapping:void 0,e.tab?R.of([F]):void 0,e.phrases?x.phrases.of(e.phrases):void 0,e.readonly?x.readOnly.of(e.readonly):void 0,e.editable?g.editable.of(e.editable):void 0,e.lang?A(e.lang):void 0,e.linter?G(e.linter):void 0,e.linter&&e.lintGutter?I():void 0,...e.extensions]);return{context:s,editor:o,cursor:l,selection:i,getRange:(a,d)=>t.state.sliceDoc(a,d),getLine:a=>t.state.doc.line(a+1).text,lineCount:()=>t.state.doc.lines,getCursor:()=>l.value,listSelections:()=>t.state.selection.ranges,getSelection:()=>t.state.sliceDoc(t.state.selection.main.from,t.state.selection.main.to),getSelections:()=>t.state.selection.ranges.map(a=>t.state.sliceDoc(a.from,a.to)),somethingSelected:()=>t.state.selection.ranges.some(a=>!a.empty),replaceRange:(a,d,U)=>t.dispatch({changes:{from:d,to:U,insert:a}}),replaceSelection:a=>t.dispatch(t.state.replaceSelection(a)),setCursor:a=>l.value=a,setSelection:(a,d)=>t.dispatch({selection:{anchor:a,head:d}}),setSelections:(a,d)=>t.dispatch({selection:C.create(a,d)}),extendSelectionsBy:a=>t.dispatch({selection:C.create(i.value.ranges.map(d=>d.extend(a(d))))}),focus:()=>t.focus(),hasFocus:()=>t.hasFocus}},render(){return S("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?S("aside",{style:"display: none;","aria-hidden":"true"},te(this.$slots.default)):void 0)}});typeof window<"u"&&window.Vue&&window.Vue.use(T);var q=(e,s)=>{const o=e.__vccOpts||e;for(const[r,t]of s)o[r]=t;return o};const ne=w({components:{CodeMirror:T},props:{dark:{type:Boolean,default:!1}},setup(){const e=p(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),s=p(`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);`),o=p(""),r=P(),t=K(),i=Y(),l=Q(new X),c=p({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(h=>{o.value=h.parse(e.value)}),v(e,h=>{window.markdown.ready.then(_=>{o.value=_.parse(h)})}),{demo:e,demo2:s,output:o,cmLangMd:r,cmLangHtml:t,cmLangJs:i,cmLintJs:l,cmTheme:c,onViewUpdate:h=>console.log(h)}}}),oe={class:"container"},ae=n("section",{class:"mb-5"},[n("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),n("p",null,[u(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[n("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),u(" icon in the upper left. ")])],-1),se={class:"mb-5"},ie=k('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),re=n("pre",null,`<template>
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
`,-1),le=n("h3",null,"Sample",-1),de=n("p",null,[u(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),n("code",null,"ViewUpdate"),u(" object in the console log. ")],-1),ce={class:"row"},ue={class:"col"},me={class:"col"},pe=["innerHTML"],he=n("p",null,[u(" This conversion to Markdown uses "),n("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),u(" . ")],-1),ge=n("h2",null,"Slot Method",-1),fe=n("p",null,[u(" In this sample, the text is put directly inside the "),n("code",null,"<code-mirror>"),u(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),ve=n("p",null,[u(" It's just for simple syntax highlighting. Do not use with "),n("code",null,"v-model"),u(" . ")],-1),be=n("h3",null,"Markup",-1),we=n("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),ke=n("h3",null,"Sample",-1),_e=n("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1),ye=k('<h2>Linter and cross binding demo</h2><p>This is a sample using JavaScript and linter.</p><p> When using <code>lintGutter</code> prop, \u{1F534} is displayed on the line with the error. <br> Click \u{1F534} or press a <kbd>Ctrl</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> ( <kbd>Cmd</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> on macOS), the error content will be displayed on the panel. <kbd>F8</kbd> key shows the next error. </p><p> This sample uses <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank"> eslint4b-prebuilt </a> for the eslint linter. </p>',4),Le=n("pre",null,`<template>
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
// for less than vue 2.6.x
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
`,-1),xe=n("h3",null,"Sample",-1),Ce=n("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),Se={class:"row"},Ve={class:"col-6"},Me={class:"col-6"},$e=n("p",null,"Also, make sure that changing either value reflects that value.",-1);function Te(e,s,o,r,t,i){const l=M("code-mirror");return $(),V("div",oe,[ae,n("section",se,[ie,m(l,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:f(()=>[re]),_:1},8,["lang","dark"]),le,de,n("div",ce,[n("div",ue,[m(l,{modelValue:e.demo,"onUpdate:modelValue":s[0]||(s[0]=c=>e.demo=c),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"","onUpdate:view":e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate:view"])]),n("div",me,[n("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,pe)])]),he]),n("section",null,[ge,fe,ve,be,m(l,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:f(()=>[we]),_:1},8,["lang","dark"]),ke,m(l,{readonly:"",dark:e.dark},{default:f(()=>[_e]),_:1},8,["dark"])]),n("section",null,[ye,m(l,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:f(()=>[Le]),_:1},8,["lang","dark"]),xe,Ce,n("div",Se,[n("div",Ve,[m(l,{modelValue:e.demo2,"onUpdate:modelValue":s[1]||(s[1]=c=>e.demo2=c),lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,"lint-gutter":"",basic:""},null,8,["modelValue","lang","linter","dark"])]),n("div",Me,[z(n("textarea",{"onUpdate:modelValue":s[2]||(s[2]=c=>e.demo2=c),"aria-label":"two way bind test",rows:"3",class:"form-control"},null,512),[[D,e.demo2]])])]),$e])])}var qe=q(ne,[["render",Te]]);const Ue=w({components:{DemoPage:qe},setup(){const e=p(window.matchMedia("(prefers-color-scheme: dark)").matches);return v(e,()=>{const s=document.querySelector(".navbar").classList,o=document.querySelector("main").classList,r=document.querySelector(".footer").classList;e.value?(s.remove("navbar-dark","bg-dark"),s.add("navbar-light","bg-light"),o.remove("bg-white","text-dark"),o.add("bg-black","text-light"),r.remove("bg-light","text-dark"),r.add("bg-dark","text-light")):(s.add("navbar-dark","bg-dark"),s.remove("navbar-light","bg-light"),o.add("bg-white","text-dark"),o.remove("bg-black","text-light"),r.add("bg-light","text-dark"),r.remove("bg-dark","text-light"))}),{dark:e}}}),je={class:"navbar navbar-expand-md navbar-dark bg-dark"},Be={class:"container-fluid d-flex justify-content-between"},Ee=n("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Oe=n("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[n("span",{class:"navbar-toggler-icon"})],-1),Ae={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},ze={class:"navbar-nav"},De=k('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),Ne={class:"nav-item"},He=n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[n("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Je=[He],Re={class:"flex-shrink-0 pt-4 bg-white"},Fe=n("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[n("div",{class:"container mb-0"},[u(" \xA9 2022 by "),n("a",{href:"http://logue.dev/"},"Logue"),u(" . Licensed under the "),n("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),u(" . ")])],-1);function Ge(e,s,o,r,t,i){const l=M("demo-page");return $(),V("div",null,[n("header",null,[n("nav",je,[n("div",Be,[Ee,Oe,n("div",Ae,[n("ul",ze,[De,n("li",Ne,[n("a",{class:"nav-link",href:"#",onClick:s[0]||(s[0]=c=>e.dark=!e.dark)},Je)])])])])])]),n("main",Re,[m(l,{dark:e.dark},null,8,["dark"])]),Fe])}var Ie=q(Ue,[["render",Ge]]);N(Ie).mount("#app");

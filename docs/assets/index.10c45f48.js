import{h as q,d as w,r as h,c as U,w as v,o as j,n as B,a as E,t as O,b as S,e as t,f as p,g as b,i as A,v as z,j as u,k,l as V,m as M,p as D}from"./vue.7dc6131d.js";import{E as f,b as N,m as H,k as R,i as G,a as y,l as J,c as F,d as L,S as I,e as W,h as P,j as K,f as Y}from"./codemirror.e83176e4.js";import{l as C}from"./lodash.4271d345.js";import{z as Q}from"./linter.4d0ec9e4.js";const X=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const n of l.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerpolicy&&(l.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?l.credentials="include":s.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(s){if(s.ep)return;s.ep=!0;const l=a(s);fetch(s.href,l)}};X();const Z=e=>e?Object.entries(e).reduce((r,[a,i])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...r,[a]:i}),{}):null,x=(e,r={},a)=>{const{props:i,domProps:s,on:l,...n}=r,c=l?Z(l):{};return q(e,{...n,...i,...s,...c},a)},ee=e=>typeof e=="function"?e():e;var te=w({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:window.matchMedia("(prefers-color-scheme: dark)").matches},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Function,default:void 0},lintGutter:{type:Boolean,defalt:!1}},emits:["update:modelValue","update"],setup(e,r){const a=h(),i=h(e.modelValue),s=U({get:()=>n.state.selection.main.head,set:o=>n.dispatch({selection:{anchor:o}})}),l=r.emit;let n;v(i,o=>{n.composing||n.dispatch({changes:{from:0,to:o.length,insert:o},selection:{anchor:s.value}})}),v(()=>e.modelValue,o=>n.dispatch({changes:{from:0,to:n.state.doc.length,insert:o},selection:{anchor:s.value}})),v(()=>e.dark,()=>{n.dispatch({effects:I.reconfigure.of(c())})}),j(async()=>{let o=i.value;a.value&&a.value.childNodes[0]&&(i.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),o=C.exports.trim(a.value.childNodes[0].innerText)),n=new f({doc:o,extensions:c(),parent:a.value,dispatch:d=>{n.update([d]),!d.changes.empty&&(i.value=n.state.doc.toString(),l("update:modelValue",i.value))}}),await B()}),E(()=>n.destroy());const c=()=>C.exports.compact([e.basic?N:void 0,e.minimal&&!e.basic?H:void 0,f.updateListener.of(d=>l("update",d)),f.theme(e.theme,{dark:e.dark}),e.wrap?f.lineWrapping:void 0,e.tab?R.of([G]):void 0,e.phrases?y.phrases.of(e.phrases):void 0,e.readonly?y.readOnly.of(e.readonly):void 0,e.editable?f.editable.of(e.editable):void 0,e.lang?O(e.lang):void 0,e.linter?J(e.linter):void 0,e.linter&&e.lintGutter?F():void 0,...e.extensions]),m=()=>n.state.selection;return{context:r,editor:a,cursor:s,selection:m,getRange:(o,d)=>n.state.sliceDoc(o,d),getLine:o=>n.state.doc.line(o+1).text,lineCount:()=>n.state.doc.lines,getCursor:()=>s.value,listSelections:()=>m().ranges,getSelection:()=>n.state.sliceDoc(m().main.from,m().main.to),getSelections:()=>m().ranges.map(o=>n.state.sliceDoc(o.from,o.to)),somethingSelected:()=>m().ranges.some(o=>!o.empty),replaceRange:(o,d,T)=>n.dispatch({changes:{from:d,to:T,insert:o}}),replaceSelection:o=>n.dispatch(n.state.replaceSelection(o)),setCursor:o=>s.value=o,setSelection:(o,d)=>n.dispatch({selection:{anchor:o,head:d}}),setSelections:(o,d)=>n.dispatch({selection:L.create(o,d)}),extendSelectionsBy:o=>n.dispatch({selection:L.create(m().ranges.map(d=>d.extend(o(d))))}),focus:()=>n.focus(),hasFocus:()=>n.hasFocus}},render(){return x("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?x("aside",{style:"display: none;","aria-hidden":"true"},ee(this.$slots.default)):void 0)}}),$=(e,r)=>{const a=e.__vccOpts||e;for(const[i,s]of r)a[i]=s;return a};const ne=w({components:{CodeMirror:te},props:{dark:{type:Boolean,default:!1}},setup(){const e=h(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),r=h(`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);`),a=h(""),i=W(),s=P(),l=K(),n=Y(new Q),c=h({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(g=>{a.value=g.parse(e.value)}),v(e,g=>{window.markdown.ready.then(_=>{a.value=_.parse(g)})}),{demo:e,demo2:r,output:a,cmLangMd:i,cmLangHtml:s,cmLangJs:l,cmLintJs:n,cmTheme:c,onViewUpdate:g=>console.log(g)}}}),oe={class:"container"},ae=t("section",{class:"mb-5"},[t("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),t("p",null,[u(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),u(" icon in the upper left. ")])],-1),re={class:"mb-5"},se=k('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),ie=t("pre",null,`<template>
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
`,-1),Ce=t("h3",null,"Sample",-1),xe=t("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),Se={class:"row"},Ve={class:"col-6"},Me={class:"col-6"},$e=t("p",null,"Also, make sure that changing either value reflects that value.",-1);function Te(e,r,a,i,s,l){const n=V("code-mirror");return M(),S("div",oe,[ae,t("section",re,[se,p(n,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:b(()=>[ie]),_:1},8,["lang","dark"]),le,de,t("div",ce,[t("div",ue,[p(n,{modelValue:e.demo,"onUpdate:modelValue":r[0]||(r[0]=c=>e.demo=c),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",me,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,pe)])]),he]),t("section",null,[ge,fe,ve,be,p(n,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:b(()=>[we]),_:1},8,["lang","dark"]),ke,p(n,{readonly:"",dark:e.dark},{default:b(()=>[_e]),_:1},8,["dark"])]),t("section",null,[ye,p(n,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:b(()=>[Le]),_:1},8,["lang","dark"]),Ce,xe,t("div",Se,[t("div",Ve,[p(n,{modelValue:e.demo2,"onUpdate:modelValue":r[1]||(r[1]=c=>e.demo2=c),lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,lintGutter:"",basic:""},null,8,["modelValue","lang","linter","dark"])]),t("div",Me,[A(t("textarea",{"onUpdate:modelValue":r[2]||(r[2]=c=>e.demo2=c),rows:"3",class:"form-control"},null,512),[[z,e.demo2]])])]),$e])])}var qe=$(ne,[["render",Te]]);const Ue=w({components:{DemoPage:qe},setup(){const e=h(window.matchMedia("(prefers-color-scheme: dark)").matches);return v(e,()=>{const r=document.querySelector(".navbar").classList,a=document.querySelector("main").classList,i=document.querySelector(".footer").classList;e.value?(r.remove("navbar-dark","bg-dark"),r.add("navbar-light","bg-light"),a.remove("bg-white","text-dark"),a.add("bg-black","text-light"),i.remove("bg-light","text-dark"),i.add("bg-dark","text-light")):(r.add("navbar-dark","bg-dark"),r.remove("navbar-light","bg-light"),a.add("bg-white","text-dark"),a.remove("bg-black","text-light"),i.add("bg-light","text-dark"),i.remove("bg-dark","text-light"))}),{dark:e}}}),je={class:"navbar navbar-expand-md navbar-dark bg-dark"},Be={class:"container-fluid d-flex justify-content-between"},Ee=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Oe=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),Ae={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},ze={class:"navbar-nav"},De=k('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),Ne={class:"nav-item"},He=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Re=[He],Ge={role:"main",class:"flex-shrink-0 pt-4 bg-white"},Je=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[u(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),u(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),u(" . ")])],-1);function Fe(e,r,a,i,s,l){const n=V("demo-page");return M(),S("div",null,[t("header",null,[t("nav",je,[t("div",Be,[Ee,Oe,t("div",Ae,[t("ul",ze,[De,t("li",Ne,[t("a",{class:"nav-link",href:"#",onClick:r[0]||(r[0]=c=>e.dark=!e.dark)},Re)])])])])])]),t("main",Ge,[p(n,{dark:e.dark},null,8,["dark"])]),Je])}var Ie=$(Ue,[["render",Fe]]);console.info("\u2139 Running as Vue3.");D(Ie).mount("#app");

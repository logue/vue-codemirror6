import{h as T,d as b,r as h,t as U,c as j,w as f,o as B,n as E,a as O,b as A,e as S,f as t,g as p,i as v,j as z,v as D,k as m,l as w,m as V,p as M,q as N}from"./vue.2b178568.js";import{E as g,b as H,m as R,k as G,i as J,a as y,l as F,c as I,S as W,d as L,e as P,h as K,j as Y,f as Q}from"./codemirror.e83176e4.js";import{l as C}from"./lodash.4271d345.js";import{z as X}from"./linter.4d0ec9e4.js";const Z=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}};Z();const ee=e=>e?Object.entries(e).reduce((s,[a,l])=>(a=a.charAt(0).toUpperCase()+a.slice(1),a=`on${a}`,{...s,[a]:l}),{}):null,x=(e,s={},a)=>{const{props:l,domProps:i,on:r,...d}=s,n=r?ee(r):{};return T(e,{...d,...l,...i,...n},a)},te=e=>typeof e=="function"?e():e;var ne=b({name:"CodeMirror",model:{prop:"modelValue",event:"update:modelValue"},props:{modelValue:{type:String,default:""},theme:{type:Object,default:()=>({})},dark:{type:Boolean,default:!1},basic:{type:Boolean,default:!1},minimal:{type:Boolean,default:!1},wrap:{type:Boolean,default:!1},tab:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},editable:{type:Boolean,default:!0},extensions:{type:Array,default:()=>[]},phrases:{type:Object,default:()=>{}},lang:{type:Object,default:()=>{}},linter:{type:Function,default:void 0},lintGutter:{type:Boolean,defalt:!1}},emits:["update:modelValue","update"],setup(e,s){const a=h(),{dark:l}=U(e),i=h(e.modelValue),r=j({get:()=>n.state.selection.main.head,set:o=>n.dispatch({selection:{anchor:o}})}),d=s.emit;let n;f(i,o=>{n.composing||n.dispatch({changes:{from:0,to:o.length,insert:o},selection:{anchor:r.value}})}),f(()=>e.modelValue,o=>n.dispatch({changes:{from:0,to:n.state.doc.length,insert:o},selection:{anchor:r.value}})),f(l,()=>{n.dispatch({effects:W.appendConfig.of(g.theme(e.theme,{dark:l.value}))})}),B(async()=>{let o=i.value;a.value&&a.value.childNodes[0]&&(i.value!==""&&console.warn("[CodeMirror.vue] The <code-mirror> tag contains child elements that overwrite the `v-model` values."),o=C.exports.trim(a.value.childNodes[0].innerText)),n=new g({doc:o,extensions:k(),parent:a.value,dispatch:c=>{n.update([c]),!c.changes.empty&&(i.value=n.state.doc.toString(),d("update:modelValue",i.value))}}),await E()}),O(()=>n.destroy());const k=()=>C.exports.compact([e.basic?H:void 0,e.minimal&&!e.basic?R:void 0,g.updateListener.of(c=>d("update",c)),g.theme(e.theme,{dark:l.value}),e.wrap?g.lineWrapping:void 0,e.tab?G.of([J]):void 0,e.phrases?y.phrases.of(e.phrases):void 0,e.readonly?y.readOnly.of(e.readonly):void 0,e.editable?g.editable.of(e.editable):void 0,e.lang?A(e.lang):void 0,e.linter?F(e.linter):void 0,e.linter&&e.lintGutter?I():void 0,...e.extensions]),u=()=>n.state.selection;return{context:s,editor:a,cursor:r,selection:u,getRange:(o,c)=>n.state.sliceDoc(o,c),getLine:o=>n.state.doc.line(o+1).text,lineCount:()=>n.state.doc.lines,getCursor:()=>r.value,listSelections:()=>u().ranges,getSelection:()=>n.state.sliceDoc(u().main.from,u().main.to),getSelections:()=>u().ranges.map(o=>n.state.sliceDoc(o.from,o.to)),somethingSelected:()=>u().ranges.some(o=>!o.empty),replaceRange:(o,c,q)=>n.dispatch({changes:{from:c,to:q,insert:o}}),replaceSelection:o=>n.dispatch(n.state.replaceSelection(o)),setCursor:o=>r.value=o,setSelection:(o,c)=>n.dispatch({selection:{anchor:o,head:c}}),setSelections:(o,c)=>n.dispatch({selection:L.create(o,c)}),extendSelectionsBy:o=>n.dispatch({selection:L.create(u().ranges.map(c=>c.extend(o(c))))}),focus:()=>n.focus(),hasFocus:()=>n.hasFocus}},render(){return x("div",{ref:"editor",class:"vue-codemirror"},this.$slots.default?x("aside",{style:"display: none;"},te(this.$slots.default)):void 0)}}),$=(e,s)=>{const a=e.__vccOpts||e;for(const[l,i]of s)a[l]=i;return a};const oe=b({components:{CodeMirror:ne},props:{dark:{type:Boolean,default:!1}},setup(){const e=h(`# The quick brown fox jumps over the lazy dog.

[Lorem ipsum](https://www.lipsum.com/) dolor sit amet, **consectetur** adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),s=h(`document.querySelectorAll('.btn').forEach(
  element => \u3042\u3042\u3042\u3042element.addEventListner('click', alert('\u3042\u3042\u3042\u3042\u3042'));
);`),a=h(""),l=P(),i=K(),r=Y(),d=Q(new X),n=h({".cm-lineWrapping":{wordBreak:"break-all"}});return window.markdown.ready.then(u=>{a.value=u.parse(e.value)}),f(e,u=>{window.markdown.ready.then(_=>{a.value=_.parse(u)})}),{demo:e,demo2:s,output:a,cmLangMd:l,cmLangHtml:i,cmLangJs:r,cmLintJs:d,cmTheme:n,onViewUpdate:u=>console.log(u)}}}),ae={class:"container"},se=t("section",{class:"mb-5"},[t("h1",null,"Vue CodeMirror6 Markdown Editor Demo"),t("p",null,[m(" A rough demo of Vue Codemirror in action. You can switch between dark modes from the "),t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})]),m(" icon in the upper left. ")])],-1),ie={class:"mb-5"},re=w('<h2>Normal Method</h2><p> This is an example of simply pouring text into CodeMirror using <code>v-model</code> . </p><p><code>basic</code> is an alias for loading <a href="https://codemirror.net/6/docs/ref/#basic-setup" target="_blank"> basic-setup </a> . <br> Use <code>wrap</code> when you want to use columns. (Enable text wrapping) <br> The value of <code>@update</code> gets the <a href="https://codemirror.net/6/docs/ref/#view.ViewUpdate" target="_blank"> ViewUpdate </a> object at that time when there is any update in the target form. In this example, the contents are output to the console log of the browser. </p>',3),le=t("pre",null,`<template>
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
`,-1),de=t("h3",null,"Sample",-1),ce=t("p",null,[m(" When you run the above sample, the output will be roughly as follows. Change the value and see that it is reflected in the right output in real time. Changing the value will output a "),t("code",null,"ViewUpdate"),m(" object in the console log. ")],-1),ue={class:"row"},me={class:"col"},pe={class:"col"},he=["innerHTML"],ge=t("p",null,[m(" This conversion to Markdown uses "),t("a",{href:"https://github.com/rsms/markdown-wasm",target:"_blank"}," markdown-wasm "),m(" . ")],-1),fe=t("h2",null,"Slot Method",-1),ve=t("p",null,[m(" In this sample, the text is put directly inside the "),t("code",null,"<code-mirror>"),m(" tag to make it the initial string. On the Vue side, it is evaluated as a DOM node and only the text node is used as the value. ")],-1),be=t("p",null,[m(" It's just for simple syntax highlighting. Do not use with "),t("code",null,"v-model"),m(" . ")],-1),we=t("h3",null,"Markup",-1),ke=t("pre",null,`<code-mirror readonly>
  <pre>How razorback-jumping frogs can level six piqued gymnasts!</pre>
</code-mirror>`,-1),_e=t("h3",null,"Sample",-1),ye=t("pre",null,"How razorback-jumping frogs can level six piqued gymnasts!",-1),Le=w('<h2>Linter and cross binding demo</h2><p>This is a sample using JavaScript and linter.</p><p> When using <code>lintGutter</code> prop, \u{1F534} is displayed on the line with the error. <br> Click \u{1F534} or press a <kbd>Ctrl</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> ( <kbd>Cmd</kbd> - <kbd>Shift</kbd> - <kbd>m</kbd> on macOS), the error content will be displayed on the panel. <kbd>F8</kbd> key shows the next error. </p><p> This sample uses <a href="https://github.com/marijnh/eslint4b-prebuilt" target="_blank"> eslint4b-prebuilt </a> for the eslint linter. </p>',4),Ce=t("pre",null,`<template>
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
`,-1),xe=t("h3",null,"Sample",-1),Se=t("p",null,"Make sure you see \u{1F534} when you change the value to get an error.",-1),Ve={class:"row"},Me={class:"col-6"},$e={class:"col-6"},qe=t("p",null,"Also, make sure that changing either value reflects that value.",-1);function Te(e,s,a,l,i,r){const d=V("code-mirror");return M(),S("div",ae,[se,t("section",ie,[re,p(d,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:v(()=>[le]),_:1},8,["lang","dark"]),de,ce,t("div",ue,[t("div",me,[p(d,{modelValue:e.demo,"onUpdate:modelValue":s[0]||(s[0]=n=>e.demo=n),lang:e.cmLangMd,theme:e.cmTheme,dark:e.dark,wrap:"",basic:"",tab:"",onUpdate:e.onViewUpdate},null,8,["modelValue","lang","theme","dark","onUpdate"])]),t("div",pe,[t("div",{class:"p-3 bg-light text-dark",innerHTML:e.output},null,8,he)])]),ge]),t("section",null,[fe,ve,be,we,p(d,{lang:e.cmLangHtml,readonly:"",basic:"",dark:e.dark},{default:v(()=>[ke]),_:1},8,["lang","dark"]),_e,p(d,{readonly:"",dark:e.dark},{default:v(()=>[ye]),_:1},8,["dark"])]),t("section",null,[Le,p(d,{lang:e.cmLangHtml,readonly:"",dark:e.dark,basic:""},{default:v(()=>[Ce]),_:1},8,["lang","dark"]),xe,Se,t("div",Ve,[t("div",Me,[p(d,{modelValue:e.demo2,"onUpdate:modelValue":s[1]||(s[1]=n=>e.demo2=n),lang:e.cmLangJs,linter:e.cmLintJs,dark:e.dark,lintGutter:"",basic:""},null,8,["modelValue","lang","linter","dark"])]),t("div",$e,[z(t("textarea",{"onUpdate:modelValue":s[2]||(s[2]=n=>e.demo2=n),rows:"3",class:"form-control"},null,512),[[D,e.demo2]])])]),qe])])}var Ue=$(oe,[["render",Te]]);const je=b({components:{DemoPage:Ue},setup(){const e=h(window.matchMedia("(prefers-color-scheme: dark)").matches);return f(e,()=>{const s=document.querySelector(".navbar").classList,a=document.querySelector("main").classList,l=document.querySelector(".footer").classList;e.value?(s.remove("navbar-dark","bg-dark"),s.add("navbar-light","bg-light"),a.remove("bg-white","text-dark"),a.add("bg-black","text-light"),l.remove("bg-light","text-dark"),l.add("bg-dark","text-light")):(s.add("navbar-dark","bg-dark"),s.remove("navbar-light","bg-light"),a.add("bg-white","text-dark"),a.remove("bg-black","text-light"),l.add("bg-light","text-dark"),l.remove("bg-dark","text-light"))}),{dark:e}}}),Be={class:"navbar navbar-expand-md navbar-dark bg-dark"},Ee={class:"container-fluid d-flex justify-content-between"},Oe=t("a",{class:"navbar-brand",href:"#"},"Vue CodeMirror6",-1),Ae=t("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation"},[t("span",{class:"navbar-toggler-icon"})],-1),ze={id:"navbarCollapse",class:"collapse navbar-collapse flex-grow-0"},De={class:"navbar-nav"},Ne=w('<li class="nav-item"><a class="nav-link" aria-current="page" href="https://logue.dev/"> Home </a></li><li class="nav-item"><a class="nav-link" href="https://github.com/logue/vue-codemirror6"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg></a></li>',2),He={class:"nav-item"},Re=t("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-circle-half",viewBox:"0 0 16 16"},[t("path",{d:"M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"})],-1),Ge=[Re],Je={role:"main",class:"flex-shrink-0 pt-4 bg-white"},Fe=t("footer",{class:"footer mt-auto py-3 mb-0 bg-light"},[t("div",{class:"container mb-0"},[m(" \xA9 2022 by "),t("a",{href:"http://logue.dev/"},"Logue"),m(" . Licensed under the "),t("a",{href:"http://opensource.org/licenses/mit-license.php"},"MIT License"),m(" . ")])],-1);function Ie(e,s,a,l,i,r){const d=V("demo-page");return M(),S("div",null,[t("header",null,[t("nav",Be,[t("div",Ee,[Oe,Ae,t("div",ze,[t("ul",De,[Ne,t("li",He,[t("a",{class:"nav-link",href:"#",onClick:s[0]||(s[0]=n=>e.dark=!e.dark)},Ge)])])])])])]),t("main",Je,[p(d,{dark:e.dark},null,8,["dark"])]),Fe])}var We=$(je,[["render",Ie]]);console.info("\u2139 Running as Vue3.");N(We).mount("#app");

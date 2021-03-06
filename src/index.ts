import CodeMirror from './components/CodeMirror';

// TODO: Move phrases props to option.
const installCodeMirror = (app: any) => app.component('CodeMirror', CodeMirror);

export { CodeMirror as default, installCodeMirror as install };

// For CDN. (Maybe Vue2 only)
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  window.Vue.use(CodeMirror);
}

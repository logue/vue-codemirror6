import CodeMirror from './components/CodeMirror';
import Meta from './Meta';

// TODO: Move phrases props to option.
const installCodeMirror = (app: any): void =>
  app.component('CodeMirror', CodeMirror);

export { CodeMirror as default, installCodeMirror as install, Meta };

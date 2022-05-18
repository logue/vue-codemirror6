/**
 * Vue CodeMirror6 Component
 *
 * @license MIT
 * @author Logue {@link logue@hotmail.co.jp}
 * @copyright 2022 Masashi Yoshikawa {@link https://logue.dev/} All rights reserved.
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import CodeMirror from './components/CodeMirror.vue';
import { install, isVue3 } from 'vue-demi';

const installCodeMirror = isVue3
  ? install()
  : app => app.component('CodeMirror', CodeMirror);

export { CodeMirror, installCodeMirror as install };
export default CodeMirror;

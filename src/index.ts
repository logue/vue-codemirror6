/* eslint-disable */
/**
 * Vue CodeMirror6 Component
 *
 * @license MIT
 * @author Logue {@link logue@hotmail.co.jp}
 * @copyright 2022 Masashi Yoshikawa {@link https://logue.dev/} All rights reserved.
 * @see {@link https://github.com/logue/vue-codemirror6}
 */

import CodeMirror from './components/CodeMirror';

// TODO: Move phrases props to option.
const installCodeMirror = app => app.component('CodeMirror', CodeMirror);

export { CodeMirror as default, installCodeMirror as install };

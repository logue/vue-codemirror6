import { Vue2, isVue2 } from 'vue-demi';

// Import vue component
import component from './components/CodeMirror.vue';

export default /* #__PURE__*/ (() => {
  if (isVue2) {
    /* Assign InstallableComponent type */
    const installable = component;

    // Attach install function executed by Vue.use()
    installable.install = (Vue: typeof Vue2) => {
      Vue.component('CodeMirror', installable);
    };

    return installable;
  }
  return {
    install(app) {
      app.component('CodeMirror', component);
    },
  };
})();

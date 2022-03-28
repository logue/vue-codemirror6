import { Vue2, isVue2 } from 'vue-demi';

// Import vue component
import component from './components/CodeMirror.vue';

export default (() => {
  if (isVue2) {
    // Vue2

    /* Assign InstallableComponent type */
    const installable = component;

    // Attach install function executed by Vue.use()
    installable.install = (Vue: typeof Vue2) => {
      Vue.component('CodeMirror', installable);
    };

    return installable;
  }
  // Vue3
  return {
    install: app => {
      app.component('CodeMirror', component);
    },
  };
})();

import { createApp, isVue3, Vue2 } from 'vue-demi';
import App from './App.vue';

if (isVue3) {
  console.info('ℹ Running as Vue3.');
  createApp(App).mount('#app');
} else {
  console.info('ℹ Running as Vue2.');
  // @ts-ignore
  new Vue2({
    render: h => h(App),
  }).$mount('#app');
}

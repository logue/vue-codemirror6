import { createApp, isVue3 } from 'vue-demi';
import App from './App.vue';

if (isVue3) {
  console.info('ℹ Running as Vue3.');
} else {
  console.info('ℹ Running as Vue2.');
}

createApp(App).mount('#app');

/** Demo Code */
import '@carbon/styles/css/styles.min.css';
import './style.css';

// Carbon Web Components used by the demo.
// They must be registered before Vue mounts so that props are set as DOM properties.
import '@carbon/web-components/es/components/checkbox/index.js';
import '@carbon/web-components/es/components/link/index.js';
import '@carbon/web-components/es/components/notification/index.js';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/text-input/index.js';
import '@carbon/web-components/es/components/textarea/index.js';
import '@carbon/web-components/es/components/toggle/index.js';
import { createApp } from 'vue';

import App from './App.vue';

createApp(App).mount('#app');

import '@/global/styles/theme.css';

import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import '@/global/page';
import './library';
import '@/global/styles/index.css';
import './modules';

// import { initI18n } from '@/global/page/i18n';

const app = new Vue({
    router,
    // i18n: initI18n(),
});
app.$mount('#app');

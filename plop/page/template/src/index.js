import '@/global/styles/theme.css';

import Vue from 'vue';
import App from './app.vue';
import { initRouter } from './router';
import '@/global/page';
import './library';
import '@/global/styles/index.css';
import './modules';
import micro from './micro';
// import { initI18n } from '@/global/page/i18n';

if (window.microApp && window.microApp.isMicro) {
    micro.init(initRouter);
} else {
    const app = new Vue({
        router: initRouter(),
        ...App,
        // i18n: initI18n(),
    });
    app.$mount('#app');
}


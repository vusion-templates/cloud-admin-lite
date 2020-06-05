import '@/global/styles/theme.css';

import Vue from 'vue';
import App from './index.vue';
import { initRouter } from './router';
import '@/global/page';
import './library';
import '@/global/styles/index.css';
import modules from './modules';
import micro from './micro';
// import { initI18n } from '@/global/page/i18n';

Vue.prototype.$services = Object.assign({}, Vue.prototype.$services, modules.services);
if (window.microApp && window.microApp.isMicro) {
    micro.init(initRouter);
} else {
    const app = new Vue({
        name: 'app',
        router: initRouter(),
        ...App,
        // i18n: initI18n(),
    });
    app.$mount('#app');
}


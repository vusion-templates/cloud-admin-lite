import '@/global/styles/theme.css';

import Vue from 'vue';
import App from './index.vue';
import { initRouter } from './router';
import '@/global/page';
import './library';
import '@/global/styles/index.css';
import installServices from '@/global/services/install';
import { install as installModuleServices } from './modules';
import micro from './micro';
// import { initI18n } from '@/global/page/i18n';

Vue.use(installModuleServices);
Vue.use(installServices);

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


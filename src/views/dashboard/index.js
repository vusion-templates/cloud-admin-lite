import '@/global/styles/index.css';
import 'babel-polyfill';
import Vue from 'vue';
import router from './router';
import './library';
import './modules';
import loadStatus from '@/global/mixins/load';
// import { initI18n } from './i18n';

const app = new Vue({
    router,
    // i18n: initI18n(),
});
Vue.mixin(loadStatus);
app.$mount('#app');

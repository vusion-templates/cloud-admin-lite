import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

let instance;

export function initI18n(locale, messages) {
    instance = new VueI18n({
        locale: locale || 'zh-CN',
        messages,
    });
    return instance;
}

export default instance;

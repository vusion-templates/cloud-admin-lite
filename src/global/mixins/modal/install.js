import cache from './cache';
export default {
    install(Vue) {
        Vue.prototype.$modal = {
            show(name, data) {
                const modal = cache[name];
                modal.open(data);
                return modal;
            },
            hide(name, data) {
                const modal = cache[name];
                modal.close(data);
            },
        };
    },
};

import services from './index';

export default {
    install(Vue, options = {}) {
        const keys = Object.keys(services);
        if (Vue.prototype.$services) {
            keys.forEach((key) => {
                if (Vue.prototype.$services[key]) {
                    throw new Error('services repeat:' + key);
                }
            });
        }
        if (keys.length) {
            Vue.prototype.$services = Object.assign({}, Vue.prototype.$services, services);
        }
    },
};

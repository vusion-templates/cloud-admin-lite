import getModules, { sort } from '@/global/page/modules';
import modulesOrder from './modules.order';
const modulesConfig = require.context('./', true, /\.\/([^/]*?)\/index\.js$/);
const modules = getModules(
    modulesConfig,
);
export default {
    ...modules,
    sidebar: sort(modules.modules, modulesOrder.sidebar),
    navbar: sort(modules.modules, modulesOrder.navbar),
    normal: sort(modules.modules, modulesOrder.normal),
};
export const install = function (Vue, options = {}) {
    const services = modules.services;
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
};

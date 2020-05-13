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

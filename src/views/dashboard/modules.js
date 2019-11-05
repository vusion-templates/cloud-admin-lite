import moduleInfos from './getModules';
import modulesOrder from './modules.order';

const modules = {}; // { [name: string]: { [env: string]: {...} } }

moduleInfos.config.forEach((item) => {
    modules[item.module] = item;
});
function sort(modules, modulesOrder) {
    return modulesOrder.map((moduleName) => {
        if (typeof moduleName === 'string' && moduleName !== '|') {
            return modules[moduleName];
        } else {
            return moduleName;
        }
    });
}
export default modules;
export const sortedModules = sort(modules, modulesOrder);

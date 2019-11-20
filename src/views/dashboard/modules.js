import _ from 'lodash';
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

if (modules.global) {
    Object.keys(modules).filter((key) => key !== 'global').forEach((key) => {
        modules[key] = _.mergeWith({}, modules.global, modules[key], (a, b) => {
            if (_.isArray(a) || _.isArray(b)) {
                return a && b ? b : (a || b);
            }
        });
    });
}
export default modules;
export const sortedModules = sort(modules, modulesOrder);

import mergeWith from 'lodash/mergeWith';
const formatModuleConfig = function (moduleConfig) {
    const modules = {}; // { [name: string]: { [env: string]: {...} } }

    moduleConfig.forEach((item) => {
        modules[item.module] = item;
    });

    if (modules.global) {
        Object.keys(modules).filter((key) => key !== 'global').forEach((key) => {
            modules[key] = mergeWith({}, modules.global, modules[key], (a, b) => {
                if (Array.isArray(a) || Array.isArray(b)) {
                    return a && b ? b : (a || b);
                }
            });
        });
    }
    return modules;
};
const sort = function (modules, modulesOrder) {
    return modulesOrder.map((moduleName) => {
        if (typeof moduleName === 'string' && moduleName !== '|') {
            return modules[moduleName];
        } else {
            return moduleName;
        }
    });
};
export default function (importFiles, modulesOrder) {
    let routes = [];
    const config = [];

    importFiles.keys().forEach((key) => {
        const moduleItem = importFiles(key).default;
        if (moduleItem.routes) {
            routes.push(moduleItem.routes);
        }
        if (moduleItem.config) {
            if (!moduleItem.config.module) {
                console.error('must have module attr');
            }
            config.push(moduleItem.config);
        }
    });
    routes = routes.map((moduleRoutes) => {
        if (typeof moduleRoutes === 'function') {
            return moduleRoutes(routes);
        }
        return moduleRoutes;
    });
    const modules = formatModuleConfig(config);
    return {
        routes,
        modules,
        sortedModules: sort(modules, modulesOrder),
    };
}

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
export const sort = function (modules, modulesOrder) {
    return modulesOrder.map((moduleName) => {
        if (typeof moduleName === 'string' && moduleName !== '|') {
            return modules[moduleName];
        } else {
            return moduleName;
        }
    });
};
const formatServices = function (services, module, serviceFiles) {
    const service = services[module] = services[module] || {};
    serviceFiles.keys().forEach((key) => {
        const serviceFileContent = serviceFiles(key).default;
        const moduleServiceName = key.replace('./services/', '').replace('.js', '').split('/');
        if (moduleServiceName.length > 1) {
            const last = moduleServiceName.pop();
            if (last !== 'index') {
                moduleServiceName.push(last);
            }
        }
        const namespace = moduleServiceName.reduce((pre, current) => {
            if (pre) {
                current = current.replace(/^[a-z]/, (s) => s.toUpperCase()).replace(/-([a-z])/g, (a, s) => s.toUpperCase());
            }
            return pre + current;
        }, '');
        service[namespace] = serviceFileContent;
    });
};
export default function (importFiles) {
    let routes = [];
    const config = [];
    const services = {};

    importFiles.keys().forEach((key) => {
        const moduleItem = importFiles(key).default;
        if (moduleItem.routes) {
            routes.push(moduleItem.routes);
        }
        if (!moduleItem.config || !moduleItem.config.module) {
            throw new Error('must have config module:', key);
        }
        if (moduleItem.services) {
            formatServices(services, moduleItem.config.module, moduleItem.services);
        }
        config.push(moduleItem.config);
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
        services,
    };
}

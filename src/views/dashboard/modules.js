import modulesOrder from './modules.order';

const cache = {};
const modules = {}; // { [name: string]: { [env: string]: {...} } }

function importAll(r) {
    r.keys().forEach((key) => {
        const [moduleDir, moduleEnv] = key.split(/\/module\/(.+?)\.js$/);
        const envs = cache[moduleDir] = cache[moduleDir] || {};
        envs[moduleEnv] = r(key).default;
    });
}

// 这里会解析 views/ 目录下 module/**/*.js 文件，如果需要添加新的路由，请按此方案命名
importAll(require.context('./', true, /module\/(.*?)\.js$/));

Object.keys(cache).forEach((key) => {
    const moduleEnvs = cache[key];
    const arr = key.split('/');

    if (moduleEnvs.base) {
        if (!moduleEnvs.base.name)
            moduleEnvs.base.name = arr[arr.length - 1];
        // 单环境
        modules[moduleEnvs.base.name] = moduleEnvs.base;
        // 多环境
        // modules[moduleName] = moduleEnvs;
    } else {
        console.error(key + ' 模块的 module/base.js 不存在，或未声明 module 信息');
    }
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

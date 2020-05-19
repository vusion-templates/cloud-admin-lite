import Layout from './layout/views/index.vue';
import AppConfig from './app.config';
import moduleInfos from './modules';
import Utils from '@/global/utils';
let defaultRoute = AppConfig.router.defaults;
let notFoundRoute = AppConfig.router.notFound;

if (!Utils.hasRoute(moduleInfos.routes, defaultRoute)) {
    if (moduleInfos.routes.length) {
        defaultRoute = moduleInfos.routes[0].path;
    } else {
        defaultRoute = '';
    }
}

if (!Utils.hasRoute(moduleInfos.routes, notFoundRoute)) {
    notFoundRoute = '/';
}

export default [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', redirect: defaultRoute },
            ...moduleInfos.routes,
        ],
    },
    { path: '*', beforeEnter(to, from, next) {
        if (window.microApp && window.microApp.isMicro) {
            if (!location.pathname.startsWith(window.microApp.prefix)) {
                next();
                return;
            }
        }
        next(notFoundRoute); // 无法匹配的链接跳转
    } },
];

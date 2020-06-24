import Layout from './layout/views/index.vue';
import { LWrapper } from 'cloud-ui.vusion';
import appConfig from './app.config';
import moduleInfos from './modules';
import utils from '@/global/utils';
let defaultRoute = appConfig.router.defaults;
let notFoundRoute = appConfig.router.notFound;
let unauthorized = appConfig.router.unauthorized;

if (!utils.hasRoute(moduleInfos.routes, defaultRoute)) {
    if (moduleInfos.routes.length) {
        defaultRoute = moduleInfos.routes[0].path;
    } else {
        defaultRoute = '';
    }
}

if (!utils.hasRoute(moduleInfos.routes, notFoundRoute)) {
    notFoundRoute = '/';
}

if (!utils.hasRoute(moduleInfos.routes, unauthorized)) {
    unauthorized = '/';
}

Object.assign(appConfig.router, {
    defaultRoute,
    notFoundRoute,
    unauthorized,
});

export default [
    {
        path: '/',
        component: appConfig.layout === 'noNav' ? LWrapper : Layout,
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

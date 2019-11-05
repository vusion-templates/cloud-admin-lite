import Layout from './layout/views/index.vue';
import moduleInfos from './getModules';
let routes = moduleInfos.routes;
routes = routes.map((moduleRoutes) => {
    if (typeof moduleRoutes === 'function') {
        return moduleRoutes(routes);
    }
    return moduleRoutes;
});
export default [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', redirect: 'overview' },
            ...routes,
        ],
    },
    { path: '*', beforeEnter(to, from, next) {
        next('/exception/404'); // 无法匹配的链接跳转到 404
    } },
];

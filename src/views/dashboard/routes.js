import { importSubRoutes } from '@/global/utils/routerUtils';
import Layout from './layout/views/index.vue';
export default [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', redirect: 'overview' },
            ...importSubRoutes(require.context('./', true, /\.\/(views\/)?[^\\/]+\/routes\.js$/)),
        ],
    },
    { path: '*', beforeEnter(to, from, next) {
        next('/exception/404'); // 无法匹配的链接跳转到 404
    } },
];

import Wrapper from '@/global/layouts/l-wrapper.vue';

export default {
    path: 'sample',
    component: Wrapper,
    meta: { title: '样本' },
    children: [
        { path: '', redirect: 'list' },
        { path: 'list', component: () => import(/* webpackChunkName: 'sample' */ './views/list.vue') },
        { path: 'create', component: () => import(/* webpackChunkName: 'sample' */ './views/create.vue'), meta: { title: '创建样本' } },
        { path: 'setting', component: () => import(/* webpackChunkName: 'sample' */ './views/setting.vue'), meta: { title: '设置样本' } },
        { path: 'detail', component: () => import(/* webpackChunkName: 'sample' */ './views/detail/index.vue'), meta: { title: '样本详情' }, children: [
            { path: '', redirect: 'info' },
            { path: 'info', component: () => import(/* webpackChunkName: 'sample' */ './views/detail/info.vue') },
            { path: 'monitor', component: () => import(/* webpackChunkName: 'sample' */ './views/detail/monitor.vue') },
            { path: 'logs', component: () => import(/* webpackChunkName: 'sample' */ './views/detail/logs.vue') },
        ] },
    ],
};

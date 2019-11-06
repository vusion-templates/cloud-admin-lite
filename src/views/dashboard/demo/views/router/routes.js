import Wrapper from '@/global/layouts/l-wrapper.vue';
export default {
    path: 'router',
    component: Wrapper,
    meta: {
        title: '路由',
        locks: [{
            include: [/router/],
            params: ['search', 'demo.router.list.page'],
        }],
    },
    children: [
        { path: '', redirect: 'list' },
        {
            path: 'list',
            name: 'demo.router.list',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.vue'),
            meta: {
                title: '列表页(路由)',
            },
        },
        {
            path: 'setting',
            name: 'demo.router.setting',
            component: () => import(/* webpackChunkName: 'demo' */ './views/setting.vue'),
            meta: {
                title: '设置页',
            },
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail.vue'),
            meta: {
                title: '详情页',
            },
            children: [
                {
                    path: '',
                    redirect: 'info',
                    name: 'demo.router.detail',
                },
                {
                    path: 'info',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/detail/info.vue'),
                },
                {
                    path: 'monitor',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/detail/monitor.vue'),
                },
            ],
        },
    ],
};

import { LWrapper } from 'cloud-ui.vusion';
export default {
    path: 'router',
    component: LWrapper,
    meta: {
        title: '路由',
        crumb: '路由',
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
                title: '列表(路由)',
                crumb: '列表(路由)',
            },
        },
        {
            path: 'setting',
            name: 'demo.router.setting',
            component: () => import(/* webpackChunkName: 'demo' */ './views/setting.vue'),
            meta: {
                title: '设置',
                crumb: '设置',
            },
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail.vue'),
            meta: {
                title: '详情',
                crumb: '详情',
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
                    meta: {
                        crumb: '详细信息',
                    },
                },
                {
                    path: 'monitor',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/detail/monitor.vue'),
                    meta: {
                        crumb: '监控',
                    },
                },
            ],
        },
    ],
};

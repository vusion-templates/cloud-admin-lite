import { LWrapper } from 'cloud-ui.vusion';

export default {
    path: 'demo',
    component: LWrapper,
    meta: {
        crumb: 'demo',
    },
    children: [
        {
            path: '',
            redirect: 'list',
        },
        {
            path: 'list',
            component: LWrapper,
            meta: {
                title: '列表',
                crumb: '列表',
            },
            children: [
                { path: '', redirect: 'basic' },
                {
                    path: 'basic',
                    name: 'demo.list',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.vue'),
                    meta: {
                        title: '基础列表',
                        crumb: '基础列表',
                    },
                },
                {
                    path: 'localList',
                    name: 'demo.localList',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.local.vue'),
                    meta: {
                        title: '本地分页',
                        crumb: '本地分页',
                    },
                },
                {
                    path: 'tabs',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.tabs.vue'),
                    meta: {
                        title: 'tab 列表',
                        crumb: {
                            title: 'tab 列表',
                        },
                    },
                    children: [
                        {
                            path: '',
                            redirect: 'list',
                            name: 'demo.tabsList',
                        },
                        {
                            path: 'list',
                            name: 'demo.tabs.list',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.vue'),
                            meta: {
                                title: '列表页',
                                crumb: {
                                    title: '列表页',
                                },
                            },
                        },
                        {
                            path: 'localList',
                            name: 'demo.tabs.localList',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.local.vue'),
                            meta: {
                                title: '本地分页',
                                crumb: {
                                    title: '本地分页',
                                },
                            },
                        },
                        {
                            path: 'noPageList',
                            name: 'demo.tabs.noPageList',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.noPage.vue'),
                            meta: {
                                title: '列表页(无分页)',
                                crumb: {
                                    title: '列表页(无分页)',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: 'form',
            component: LWrapper,
            meta: {
                title: '表单',
                crumb: '表单',
            },
            children: [
                {
                    path: '',
                    redirect: 'basic',
                },
                {
                    path: 'basic',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/form/basic.vue'),
                    meta: {
                        title: '基础表单',
                        crumb: '基础表单',
                    },
                },
                {
                    path: 'setting',
                    name: 'demo.form.setting',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/form/setting.vue'),
                    meta: {
                        title: '设置',
                        crumb: '设置',
                    },
                },
            ],
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail/index.vue'),
            meta: {
                title: '详情',
                crumb: '详情',
            },
            children: [
                {
                    path: '',
                    redirect: 'info',
                    name: 'demo.detail',
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
        {
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
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/list.vue'),
                    meta: {
                        title: '列表(路由)',
                        crumb: '列表(路由)',
                    },
                },
                {
                    path: 'setting',
                    name: 'demo.router.setting',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/setting.vue'),
                    meta: {
                        title: '设置',
                        crumb: '设置',
                    },
                },
                {
                    path: 'detail',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/index.vue'),
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
                            component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/info.vue'),
                            meta: {
                                crumb: '详细信息',
                            },
                        },
                        {
                            path: 'monitor',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/monitor.vue'),
                            meta: {
                                crumb: '监控',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: 'micro',
            component: LWrapper,
            meta: {
                title: '微前端',
                crumb: '微前端',
            },
            children: [
                {
                    path: 'cloud-admin-1**',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/micro/cloud-admin-1.vue'),
                    meta: {
                        title: 'cloud-admin-1',
                        crumb: 'cloud-admin-1',
                    },
                },
                {
                    path: 'cloud-admin-2**',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/micro/cloud-admin-2.vue'),
                    meta: {
                        title: 'cloud-admin-2',
                        crumb: 'cloud-admin-2',
                    },
                },
            ],
        },
    ],
};

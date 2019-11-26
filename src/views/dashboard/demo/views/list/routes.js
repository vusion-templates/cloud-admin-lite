import Wrapper from '@/global/layouts/l-wrapper.vue';
export default {
    path: 'list',
    component: Wrapper,
    meta: {
        title: '列表',
        crumb: '列表',
    },
    children: [
        { path: '', redirect: 'basic' },
        {
            path: 'basic',
            name: 'demo.list',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.vue'),
            meta: {
                title: '基础列表',
                crumb: '基础列表',
            },
        },
        {
            path: 'localList',
            name: 'demo.localList',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.local.vue'),
            meta: {
                title: '本地分页',
                crumb: '本地分页',
            },
        },
        {
            path: 'tabs',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.tabs.vue'),
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
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list.vue'),
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
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list.local.vue'),
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
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list.noPage.vue'),
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
};

export default {
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
};


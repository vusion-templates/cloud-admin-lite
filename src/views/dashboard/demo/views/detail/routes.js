export default {
    path: 'detail',
    component: () => import(/* webpackChunkName: 'demo' */ './views/detail.vue'),
    meta: {
        title: '详情页',
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
        },
        {
            path: 'monitor',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail/monitor.vue'),
        },
    ],
};


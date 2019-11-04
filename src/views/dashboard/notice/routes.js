import Wrapper from '@/global/layouts/l-wrapper.vue';
export default {
    path: 'notice',
    component: Wrapper,
    meta: {
        title: '系统通知',
    },
    children: [
        { path: '', redirect: 'list' },
        {
            path: 'list',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.vue'),
            meta: {
                title: '通知列表',
            },
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail.vue'),
            meta: {
                title: '通知详情',
            },
        },
    ],
};

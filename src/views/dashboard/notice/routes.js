import { LWrapper } from 'cloud-ui.vusion';
export default {
    path: 'notice',
    component: LWrapper,
    meta: {
        title: '系统通知',
        crumb: '系统通知',
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
                crumb: '通知详情',
            },
        },
    ],
};

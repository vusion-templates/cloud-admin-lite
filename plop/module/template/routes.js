import { LWrapper } from 'cloud-ui.vusion';

export default {
    path: '{{ name }}',
    component: LWrapper,
    meta: {
        title: '',
        crumb: '{{ title }}列表',
    },
    children: [
        {
            path: '',
            redirect: 'list',
        },
        {
            path: 'list',
            component: () => import(/* webpackChunkName: '{{ name }}' */ './views/list.vue'),
        },
        {
            path: 'create',
            component: () => import(/* webpackChunkName: '{{ name }}' */ './views/create.vue'),
            meta: {
                title: '创建{{ title }}',
                crumb: '创建{{ title }}',
            },
        },
        {
            path: 'setting',
            component: () => import(/* webpackChunkName: '{{ name }}' */ './views/setting.vue'),
            meta: {
                title: '设置{{ title }}',
                crumb: '设置{{ title }}',
            },
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: '{{ name }}' */ './views/detail/index.vue'),
            meta: {
                title: '{{ title }}详情',
                crumb: '{{ title }}详情',
            },
            children: [{
                path: '',
                redirect: 'info',
            },
            {
                path: 'info',
                component: () => import(/* webpackChunkName: '{{ name }}' */ './views/detail/info.vue'),
                meta: {
                    title: '详细信息',
                    crumb: '详细信息',
                },
            },
            ],
        },
    ],
};

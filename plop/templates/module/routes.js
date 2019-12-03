import Wrapper from '@/global/layouts/l-wrapper.vue';

export default {
    path: '{{ name }}',
    component: Wrapper,
    meta: {
        title: '',
        crumb: '列表',
    },
    children: [
        {
            path: '',
            redirect: 'list'
        },
        {
            path: 'list',
            component: () => import( /* webpackChunkName: '{{ name }}' */ './views/list.vue')
        },
        {
            path: 'create',
            component: () => import( /* webpackChunkName: '{{ name }}' */ './views/create.vue'),
            meta: {
                title: '创建',
                crumb: '创建',
            }
        },
        {
            path: 'setting',
            component: () => import( /* webpackChunkName: '{{ name }}' */ './views/setting.vue'),
            meta: {
                title: '设置',
                crumb: '设置',
            }
        },
        {
            path: 'detail',
            component: () => import( /* webpackChunkName: '{{ name }}' */ './views/detail/index.vue'),
            meta: {
                title: '详情',
                crumb: '详情',
            },
            children: [{
                    path: '',
                    redirect: 'info'
                },
                {
                    path: 'info',
                    component: () => import( /* webpackChunkName: '{{ name }}' */ './views/detail/info.vue'),
                    meta: {
                        title: '详细信息',
                        crumb: '详细信息',
                    }
                },
            ]
        },
    ],
};

export default {
    path: 'account',
    component: () => import(/* webpackChunkName: 'account' */ './views/index.vue'),
    meta: {
        crumb: '账号',
    },
    children: [
        {
            path: '',
            redirect: 'center',
        },
        {
            path: 'center',
            name: 'account.center',
            component: () => import(/* webpackChunkName: 'account' */ './views/center.vue'),
            meta: {
                title: '个人中心',
                crumb: '个人中心',
            },
        },
        {
            path: 'setting',
            name: 'account.setting',
            component: () => import(/* webpackChunkName: 'account' */ './views/setting.vue'),
            meta: {
                title: '个人设置',
                crumb: '个人设置',
            },
        },
        {
            path: 'security',
            name: 'account.security',
            component: () => import(/* webpackChunkName: 'account' */ './views/security.vue'),
            meta: {
                title: '安全设置',
                crumb: '安全设置',
            },
        },
    ],
};

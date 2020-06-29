export default {
    'list/basic': {
        name: 'demo.list',
        meta: {
            title: '基础列表',
            crumb: '基础列表',
        },
    },
    'list/localList': {
        name: 'demo.localList',
        meta: {
            title: '本地分页',
            crumb: '本地分页',
        },
    },
    'list/tabs': {
        meta: {
            title: '列表页集合',
            crumb: {
                title: '列表页集合',
            },
        },
    },
    'list/tabs/basic': {
        name: 'demo.tabsList',
        meta: {
            title: '列表页',
            crumb: {
                title: '列表页',
            },
        },
    },
    'list/tabs/localList': {
        name: 'demo.tabs.localList',
        meta: {
            title: '本地分页',
            crumb: {
                title: '本地分页',
            },
        },
    },
    'list/tabs/noPageList': {
        name: 'demo.tabs.noPageList',
        meta: {
            title: '列表页(无分页)',
            crumb: {
                title: '列表页(无分页)',
            },
        },
    },
    form: {
        meta: {
            title: '表单',
            crumb: '表单',
        },
    },
    'form/basic': {
        meta: {
            title: '基础表单',
            crumb: '基础表单',
        },
    },
    'form/setting': {
        name: 'demo.form.setting',
        meta: {
            title: '设置',
            crumb: '设置',
        },
    },
    detail: {
        name: 'demo.detail',
        meta: {
            title: '详情',
            crumb: '详情',
        },
    },
    'detail/info': {
        meta: {
            crumb: '详细信息',
        },
    },
    'detail/monitor': {
        meta: {
            crumb: '监控',
        },
    },
    router: {
        meta: {
            title: '路由',
            crumb: '路由',
            locks: [{
                include: [/router/],
                params: ['search', 'demo.router.list.page'],
            }],
        },
    },
    'router/list': {
        name: 'demo.router.list',
        first: true,
        meta: {
            title: '列表(路由)',
            crumb: '列表(路由)',
        },
    },
    'router/setting': {
        name: 'demo.router.setting',
        meta: {
            title: '设置',
            crumb: '设置',
        },
    },
    'router/detail': {
        name: 'demo.router.detail',
        meta: {
            title: '详情',
            crumb: '详情',
        },
    },
    'router/detail/info': {
        meta: {
            crumb: '详细信息',
        },
    },
    'router/detail/monitor': {
        meta: {
            crumb: '监控',
        },
    },
};

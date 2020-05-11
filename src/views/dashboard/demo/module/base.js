export default {
    module: 'demo',
    sidebar: {
        title: 'demo',
        children: [
            {
                subnav: [
                    {
                        title: '列表',
                        children: [
                            {
                                title: '基础列表',
                                to: '/demo/list/basic',
                            },
                            {
                                title: '本地列表',
                                to: '/demo/list/localList',
                            },
                            {
                                title: 'Tab 列表',
                                to: '/demo/list/tabs',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: '路由',
                        children: [
                            {
                                title: '基础路由',
                                to: '/demo/router/list',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: '表单',
                        children: [
                            {
                                title: '基础表单',
                                to: '/demo/form/basic',
                            },
                            {
                                title: '设置页',
                                to: '/demo/form/setting',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: '详情页',
                        children: [
                            {
                                title: '详情页',
                                to: '/demo/detail',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: '微前端',
                        children: [
                            {
                                title: 'cloud-admin-1',
                                to: '/demo/micro/cloud-admin-1/demo/form/setting',
                            },
                            {
                                title: 'cloud-admin-2',
                                to: '/demo/micro/cloud-admin-2/demo/detail/info',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

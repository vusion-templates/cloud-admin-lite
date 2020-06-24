export default {
    title: '网易云',
    name: 'demo.cloud-admin-lite',
    project: 'cloud-admin-lite',
    layout: 'navbar',
    router: {
        defaults: '/overview',
        notFound: '/exception/404',
        unauthorized: '/exception/404',
    },
};

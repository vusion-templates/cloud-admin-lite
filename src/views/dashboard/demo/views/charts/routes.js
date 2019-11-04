import Wrapper from '@/global/layouts/l-wrapper.vue';
export default {
    path: 'charts',
    component: Wrapper,
    meta: {
        title: '图表',
    },
    children: [
        { path: '', redirect: 'echarts' },
        {
            path: 'echarts',
            component: () => import(/* webpackChunkName: 'demo' */ './views/echarts.vue'),
            meta: {
                title: 'ECharts',
            },
        },
    ],
};

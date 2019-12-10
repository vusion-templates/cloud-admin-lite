import { LWrapper } from 'cloud-ui.vusion';
import Exception404 from './views/404.vue';
import Exception500 from './views/500.vue';
export default {
    path: 'exception',
    component: LWrapper,
    children: [
        {
            path: '404',
            name: '404',
            component: Exception404,
            meta: {
                title: '抱歉，你访问的页面不存在。',
            },
        },
        {
            path: '500',
            name: '500',
            component: Exception500,
            meta: {
                title: '抱歉，服务出现错误。',
            },
        },
    ],
};

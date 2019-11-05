import Wrapper from '@/global/layouts/l-wrapper.vue';
import List from './views/list';
import Form from './views/form';
import Detail from './views/detail';
export default {
    path: 'demo',
    component: Wrapper,
    children: [
        {
            path: '',
            redirect: 'list',
        },
        List.routes,
        Form.routes,
        Detail.routes,
    ],
};

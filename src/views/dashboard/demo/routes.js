import Wrapper from '@/global/layouts/l-wrapper.vue';
import { importSubRoutes } from '@/global/utils/routerUtils';
export default {
    path: 'demo',
    component: Wrapper,
    children: [
        {
            path: '',
            redirect: 'list',
        },
        ...importSubRoutes(require.context('./', true, /\.\/(views\/)?[^\\/]+\/routes\.js$/)),
    ],
};

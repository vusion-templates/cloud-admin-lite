import { createService } from '@/global/utils/services';
import apis from './apis';

const service = createService(apis, {
    config: {
        baseURL: 'http://59.111.90.154:7000/api/ingress/',
    },
});

export default service;

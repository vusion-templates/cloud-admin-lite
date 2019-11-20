import { createService } from '@/global/utils/services';
import apis from './apis';

const service = createService(apis, {
    config: {
        baseURL: '',
    },
});

export default service;

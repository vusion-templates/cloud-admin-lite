import { createService } from '@/global/utils/service';
import apis from './apis';

const service = createService(apis, {
    config: {
        baseURL: '',
    },
});

export default service;

import { createService } from '@/global/utils/services';
import apis from './apis';
export default createService(apis, {
    config: {
        baseURL: 'https://api.apiopen.top/',
    },
});

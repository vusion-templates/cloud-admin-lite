import { createService } from '@/global/utils/service';
import api from './api';
import apiConfig from './api.config';
import merge from 'lodash/merge';

const service = createService(merge(api, apiConfig), {
    config: {
        baseURL: 'https://api.apiopen.top/',
    },
});
service.loadList = function (...args) {
    return service.$loadList(...args).then((res) => {
        const result = [];
        res.result.forEach((item) => {
            item.channellist.forEach((channel) => {
                channel.thumb = channel.thumb || channel.avatar;
                channel.time = new Date() - 0;
                channel.cate_sname = channel.cate_sname || item.title;
            });
            result.push(...item.channellist);
        });
        return result;
    });
};
export default service;

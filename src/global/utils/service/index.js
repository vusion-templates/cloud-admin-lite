import Service from 'request-pre';
import axios from 'axios';
import { stringify } from 'qs';
import addConfigs from './add.configs';
const formatContentType = function (contentType, data) {
    const map = {
        'application/x-www-form-urlencoded'(data) {
            return stringify(data);
        },
    };
    return map[contentType] && map[contentType](data) || data;
};
const requester = function (requestInfo) {
    const { url, config = {} } = requestInfo;
    const { path, method, body = {}, headers = {}, query = {} } = url;
    const baseURL = config.baseURL ? config.baseURL : '';
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    const req = axios({
        params: query,
        baseURL,
        method,
        url: path,
        data: formatContentType(headers['Content-Type'], body),
        headers,
        withCredentials: !baseURL,
    });
    return req;
};
const service = new Service(requester);
addConfigs(service);
export const createService = function createService(apiSchemaList, serviceConfig, dynamicServices) {
    const fixServiceConfig = serviceConfig || {};
    fixServiceConfig.config = fixServiceConfig.config || {};
    Object.assign(fixServiceConfig.config, {
        httpCode: true,
        httpError: true,
        shortResponse: true,
    });
    serviceConfig = fixServiceConfig;
    return service.generator(apiSchemaList, dynamicServices, serviceConfig);
};

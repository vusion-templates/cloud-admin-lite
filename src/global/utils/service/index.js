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
export const createService = function createService(apiSchemaList, serviceConfig) {
    const service = new Service(apiSchemaList, serviceConfig, requester);
    addConfigs(service);
    return service;
};

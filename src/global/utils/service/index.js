import Service from 'request-pre';
import axios from 'axios';
import { stringify } from 'qs';
import errHandles from './errHandles';
const formatContentType = function (contentType, data) {
    const map = {
        'application/x-www-form-urlencoded'(data) {
            return stringify(data);
        },
    };
    return map[contentType] && map[contentType](data) || data;
};
const isPromise = function (func) {
    return func && typeof func.then === 'function';
};
const requester = function (requestInfo) {
    const { url, config } = requestInfo;
    const { path, method, body = {}, headers = {}, query = {} } = url;
    let baseURL = '';
    if (config && config.baseURL) {
        baseURL = config.baseURL;
        if (!baseURL.startsWith('http')) {
            throw new Error('set baseURL only support cross domain');
        }
    }
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
    return req.then(({ data }) => {
        if ((data.code + '').startsWith('2')) {
            return data;
        }
        return Promise.reject({
            code: data.code,
            msg: data.msg,
        });
    }).catch((err) => {
        // 处理code
        let handleOut;
        if (err === 'expired request') {
            throw err;
        }
        if (err.code) {
            let handle = errHandles[err.code];
            if (!handle && !config.noAlert)
                handle = errHandles.defaults;

            if (handle) {
                handleOut = handle.bind(this)({
                    config, baseURL, url, method, body, headers,
                }, err);
            }
        } else if (err.code === undefined) {
            if (!config.noLocalError)
                handleOut = errHandles.localError.bind(this)(err);
        }

        if (isPromise(handleOut))
            return handleOut;

        throw err;
    });
};
export const createService = function createService(apiSchemaList, serviceConfig) {
    return new Service(apiSchemaList, serviceConfig, requester);
};

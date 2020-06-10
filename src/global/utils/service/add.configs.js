import errHandles from './errHandles';

const isPromise = function (func) {
    return func && typeof func.then === 'function';
};
function httpCode({ data }, params, requestInfo) {
    if ((data.code === undefined) || (data.code + '').startsWith('2')) {
        return data;
    }
    return Promise.reject({
        code: data.code,
        msg: data.msg,
    });
}
const httpError = {
    reject(err, params, requestInfo) {
        const { url, config = {} } = requestInfo;
        const { method, body = {}, headers = {} } = url;
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
                    config, baseURL: (config.baseURL || ''), url, method, body, headers,
                }, err);
            }
        } else if (err.code === undefined) {
            if (!config.noLocalError)
                handleOut = errHandles.localError.bind(this)(err);
        }

        if (isPromise(handleOut))
            return handleOut;

        throw err;
    },
};
export default function (service) {
    if (process.env.NODE_ENV === 'development') {
        service.preConfig.set('baseURL', (requestInfo, baseURL) => {
            if (!baseURL.startsWith('http')) {
                throw new Error('set baseURL only support cross domain');
            }
        });
    }
    service.postConfig.set('httpCode', httpCode);
    service.postConfig.set('httpError', httpError);

    const fixServiceConfig = service.serviceConfig || {};
    fixServiceConfig.config = fixServiceConfig.config || {};
    Object.assign(fixServiceConfig.config, {
        httpCode: true,
        httpError: true,
    });
    service.serviceConfig = fixServiceConfig;
}

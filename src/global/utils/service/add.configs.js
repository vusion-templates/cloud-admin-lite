import errHandles from './errHandles';

const isPromise = function (func) {
    return func && typeof func.then === 'function';
};
function httpCode(response, params, requestInfo) {
    const data = response.data;
    if ((data.code === undefined) || (data.code + '').startsWith('2')) {
        return response;
    }
    return Promise.reject({
        code: data.code,
        msg: data.msg,
    });
}
function shortResponse(response, params, requestInfo) {
    return response.data;
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
            if (!handle)
                handle = errHandles.defaults;

            if (handle) {
                handleOut = handle({
                    config, baseURL: (config.baseURL || ''), url, method, body, headers,
                }, err);
            }
        } else if (err.code === undefined) {
            if (!config.noLocalError)
                handleOut = errHandles.localError(err);
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
    service.postConfig.set('shortResponse', shortResponse);
}

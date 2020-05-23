import isFunction from 'lodash/isFunction';
export default {
    methods: {
        initLoadStatus(status) {
            status = Array.isArray(status) ? status : [status];
            const map = {};
            status.forEach((item) => {
                map[`${item}ing`] = false;
                map[`${item}Error`] = false;
                map[`${item}Done`] = false;
            });
            return map;
        },
        updateLoadStatus(req, status, obj) {
            obj = obj || this;
            const ing = `${status}ing`;
            const error = `${status}Error`;
            const done = `${status}Done`;
            obj[ing] = true;
            obj[error] = false;
            obj[done] = false;
            return (isFunction(req) ? req() : req).then((data) => {
                obj[ing] = false;
                obj[error] = false;
                obj[done] = true;
                return data;
            }, (err) => {
                obj[ing] = false;
                obj[error] = true;
                obj[done] = false;
                return Promise.reject(err);
            });
        },
    },
};

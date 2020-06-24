import Vue from 'vue';
import auth from './index';
export const loginAuth = function (to, from, next, currentPath, authOptions) {
    auth.getUserInfo().then(() => {
        auth.getUserResources().then(() => {
            if (auth.has(currentPath))
                next();
            else
                throw new Error('Unauthorized');
        }).catch((e) => {
            authOptions.tipMessage && Vue.prototype.$toast.show(authOptions.tipMessage);
            const redirect = typeof authOptions.redirect === 'function' ? authOptions.redirect(to) : authOptions.redirect;
            next(redirect);
        });
    }).catch(() => {
        authOptions.noLogin();
    });
};

/**
* 是否有当前路由下的子权限
* 该方法只能在 Vue 中调用
* @param {*} subPath 子权限路径，如 /createButton/enabled
*/
export const hasSub = function (base, router) {
    return function (subPath) {
        const currentPath = base + router.currentRoute.path;
        if (subPath[0] !== '/')
            subPath = '/' + subPath;
        return this.has(currentPath + subPath);
    };
};

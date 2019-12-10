import Vue from 'vue';
import VueRouter from 'vue-router';
import { isFunction } from 'lodash';

import routerLock from '@/global/utils/router.lock';

Vue.use(VueRouter);

export default function (routes, appendTitle) {
    appendTitle = appendTitle || ((a) => a);
    const router = new VueRouter({
        routes,
    });

    // 自动传参
    router.beforeEach(routerLock.beforeEach);
    Vue.use(routerLock);

    // 权限验证
    router.beforeEach((to, from, next) => {
        let called = false;
        const _next = function (...args) {
            if (called) {
                return;
            }
            called = true;
            next(...args);
        };
        to.matched.every((item) => {
            item.meta && item.meta.auth && item.meta.auth(to, from, _next);
            return !called;
        });
        _next();
    });

    // 自动修改 title
    router.afterEach((to, from) => {
        const moduleRoute = to.matched.concat().reverse().find((item) => item.meta.title);
        if (moduleRoute) {
            const metaTitle = moduleRoute.meta.title;
            document.title = appendTitle(isFunction(metaTitle) ? metaTitle(to, from) : metaTitle);
        }
    });
    return router;
}

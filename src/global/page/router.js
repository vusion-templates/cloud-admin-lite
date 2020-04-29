import Vue from 'vue';
import VueRouter from 'vue-router';
import isFunction from 'lodash/isFunction';

import routerLock from '@/global/utils/router.lock';

Vue.use(VueRouter);

export default function (routes, base, appendTitle) {
    appendTitle = appendTitle || ((a) => a);
    const router = new VueRouter({
        routes,
        base,
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
            if (args && args.length) {
                called = true;
                next(...args);
            }
        };
        let p = Promise.resolve();
        to.matched.every((item) => {
            if (item.meta && item.meta.auth) {
                p = p.then(() => {
                    if (called) {
                        return Promise.reject();
                    }
                    const out = item.meta.auth(to, from, _next);
                    if (out && out.then) {
                        return out;
                    } else {
                        return called ? Promise.reject() : Promise.resolve();
                    }
                });
            }
            return !called;
        });
        p.then(() => {
            if (!called) {
                called = true;
                next();
            }
        }, () => {
            if (!called) {
                called = true;
                console.error('router auth error');
                next('/');
            }
        });
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

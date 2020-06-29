import Vue from 'vue';
import VueRouter from 'vue-router';
import isFunction from 'lodash/isFunction';

import routerLock from '@/global/utils/router.lock';
import AuthPlugin from './auth/vue';
import { loginAuth } from './auth/router';
import { runAhead } from './auth';

Vue.use(VueRouter);

export default function (routes, base, appendTitle, authOptions) {
    appendTitle = appendTitle || ((a) => a);
    if (authOptions) {
        runAhead(authOptions);
    }
    authOptions = Object.assign({
        tipMessage: '没有访问该页面的权限',
        noLogin() {
            window.location.href = '/';
        },
        redirect: '/',
    }, authOptions);
    const router = new VueRouter({
        routes,
        base,
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    selector: to.hash,
                };
            }
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
    });

    // 自动传参
    router.beforeEach(routerLock.beforeEach);
    Vue.use(routerLock);
    Vue.use(AuthPlugin, {
        base,
        router,
        autoHide: true,
    });
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
                    let out;
                    if (item.meta.auth === 'loginAuth') {
                        out = loginAuth(to, from, _next, base + to.path, authOptions);
                    } else {
                        out = item.meta.auth(to, from, _next);
                    }
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

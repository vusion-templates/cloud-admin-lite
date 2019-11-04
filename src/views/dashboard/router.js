import Vue from 'vue';
import VueRouter from 'vue-router';
import _ from 'lodash';
import appConfig from './app.config';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

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
        document.title = (_.isFunction(metaTitle) ? metaTitle(to, from) : metaTitle) + ' - ' + appConfig.title;
    }
});

export default router;

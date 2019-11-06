const routerLock = {
    beforeEach(to, from, next) {
        const matched = to.matched || [];
        const locks = [];
        matched.forEach((item) => {
            if (item.meta && item.meta.locks) {
                const itemLocks = item.meta.locks;
                itemLocks.forEach((lock) => {
                    if (lock.params && lock.params.length) {
                        locks.push(lock);
                    }
                });
            }
        });
        if (!locks.length) {
            next();
            return;
        }
        const includePath = function (path) {
            if (typeof path === 'string') {
                return path === to.name || path === to.path;
            }
            if (path instanceof RegExp) {
                return path.test(to.name) || path.test(to.path);
            }
            return false;
        };

        const fromQuery = from.query;
        const toQuery = to.query;
        let isChanged = false;
        locks.forEach((lock) => {
            let included = false;
            if (lock.exclude) {
                included = !lock.exclude.some(includePath);
            }
            if (lock.include) {
                included = lock.include.some(includePath);
            }
            if (included) {
                lock.params.forEach((param) => {
                    if (!(param in toQuery)) {
                        isChanged = true;
                        toQuery[param] = fromQuery[param];
                    }
                    if (toQuery[param] === '') {
                        toQuery[param] = undefined;
                    } // 美化路由
                });
            }
        });
        if (isChanged) {
            next({
                path: to.path,
                query: toQuery,
            });
        } else {
            next();
        }
    },
    update(query, route, router) {
        if (Object.keys(query).some((key) => query[key] !== route.query[key])) {
            router.push({
                path: route.path,
                query: {
                    ...route.query,
                    ...query,
                },
            });
        }
    },
    install(Vue) {
        Vue.prototype.$routerLock = function (...args) {
            return routerLock.update(...args, this.$route, this.$router);
        };
    },
};
export default routerLock;

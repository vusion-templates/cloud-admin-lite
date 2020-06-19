import cookie from '@/global/utils/cookie';
import authService from '../services/auth';
import pkg from '../../../package.json';

export default {
    install(Vue, options = {}) {
        let $auth = Vue.prototype.$auth = undefined;
        options.redirect = options.redirect || '/';
        options.toast = options.toast || '没有访问该页面的权限';
        const router = options.router;

        // VUE_APP_DEVELOPMENT
        const base = router.options.base.replace(/\/$/, '');
        const DomainName = pkg.name.replace(/-client$/, '');

        let promise;
        const getUserResources = () => authService.GetUserResources({
            query: {
                DomainName,
                UserName: cookie.get('userName'),
            },
        }).then((result) => { // 目前返回授权的资源树有问题，暂时用这个模拟
            const resources = result.items.filter((resource) => resource.ResourceType === 'ui');

            $auth = Vue.prototype.$auth = {};
            resources.forEach((resource) => $auth[resource.ResourceValue] = resource);

            toComponents.forEach((comp) => comp._updateVisibleByAuth());
        }).catch((e) => {
            // 获取权限异常
            promise = undefined;
        });
        // 需要在外面调，因为有些路由是初始的，不进 beforeEach
        promise = getUserResources();

        // designer 环境放行权限
        if (process.env.VUE_APP_DESIGNER)
            return;

        // 账号与权限中心验证
        router.beforeEach((to, from, next) => {
            if (to.path === options.redirect || to.redirectedFrom === options.redirect)
                return next();

            const checkAuth = () => {
                const routePath = base + to.path;
                if ($auth[routePath])
                    next();
                else {
                    options.toast && Vue.prototype.$toast.show(options.toast);
                    next(options.redirect);
                }
            };

            if ($auth) {
                checkAuth();
            } else {
                if (!promise)
                    promise = getUserResources();
                promise.then(() => checkAuth());
            }
        });

        // 自动隐藏组件功能
        const toComponents = [];
        if (options.autoHide) {
            Vue.mixin({
                mounted() {
                    if (this.to) {
                        toComponents.push(this);
                        this._updateVisibleByAuth();
                    }
                },
                destroyed() {
                    const index = toComponents.indexOf(this);
                    ~index && toComponents.splice(index, 1);
                },
                methods: {
                    _updateVisibleByAuth() {
                        if (!this.to || !$auth)
                            return;

                        let to = this.to;
                        if (typeof to === 'object')
                            to = to.path;

                        const routePath = base + to;
                        this.$el && (this.$el.style.display = $auth[routePath] ? '' : 'none');
                    },
                },
            });
        }
    },
};


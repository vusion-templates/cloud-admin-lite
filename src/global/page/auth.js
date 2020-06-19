import cookie from '@/global/utils/cookie';
import authService from '../services/auth';
import pkg from '../../../package.json';

export default {
    install(Vue, options = {}) {
        let $auth = Vue.prototype.$auth = undefined;
        options.redirect = options.redirect || '/';
        const router = options.router;

        // VUE_APP_DEVELOPMENT
        const base = router.options.base.replace(/\/$/, '');
        const DomainName = pkg.name.replace(/-client$/, '');
        authService.GetResources({
            body: {
                filter: {
                    DomainName,
                    ResourceType: 'ui',
                },
            },
        }).then((resources) => { // 目前返回授权的资源树有问题，暂时用这个模拟
            return Promise.all(resources.map((resource) =>
                authService.IsUserHasPermission({
                    body: {
                        UserName: cookie.get('userName'),
                        DomainName,
                        ResourceValue: resource.ResourceValue,
                        ResourceType: resource.ResourceType,
                    },
                    config: {
                        noLocalError: true,
                    },
                }).then((result) => {
                    if (result.Result === 'true')
                        return resource;
                }).catch((e) => {
                    // 不处理
                    return undefined;
                })));
        }).then((resources) => {
            resources = resources.filter((resource) => !!resource);
            console.log(resources);

            $auth = Vue.prototype.$auth = {};
            resources.forEach((resource) => $auth[resource.ResourceValue] = resource);

            const routePath = base + router.currentRoute.path;
            if (!$auth[routePath] && routePath !== options.redirect) {
                options.toast && Vue.prototype.$toast.show(options.toast);
                router.replace(options.redirect);
            }

            // autoHide
            toComponents.forEach((comp) => comp._updateVisibleByAuth());
        });

        // 账号与权限中心验证
        router.beforeEach((to, from, next) => {
            if (to.path === options.redirect || to.redirectedFrom === options.redirect)
                return next();
            if (!$auth) // 刚开始没有的时候不处理
                return next();

            const routePath = base + to.path;
            if ($auth[routePath])
                next();
            else {
                options.toast && Vue.prototype.$toast.show(options.toast);
                next(options.redirect);
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


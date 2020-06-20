import cookie from '@/global/utils/cookie';
import authService from '../services/auth';
import pkg from '../../../package.json';

export default {
    install(Vue, options = {}) {
        options.redirect = options.redirect || '/';
        options.toast = options.toast || '没有访问该页面的权限';
        options.allowList = [].concat(['/login'], options.allowList);
        const router = options.router;

        const base = router.options.base.replace(/\/$/, '');
        const DomainName = pkg.name.replace(/-client$/, '');

        /**
         * 账号与权限中心验证
         */
        const $auth = Vue.prototype.$auth = {
            _map: undefined,
            _promise: undefined,
            /**
             * 权限项是否初始化
             */
            isInit() {
                return !!this._map;
            },
            /**
             * 初始化权限项。目前就是从接口获取权限项
             */
            init() {
                if (this._promise)
                    return this._promise;
                else {
                    return this._promise = authService.GetUserResources({
                        query: {
                            DomainName,
                            UserName: cookie.get('userName'),
                        },
                    }).then((result) => {
                        const resources = result.items.filter((resource) => resource.ResourceType === 'ui');

                        // 初始化权限项
                        $auth._map = new Map();
                        resources.forEach((resource) => $auth._map.set(resource.ResourceValue, resource));

                        toComponents.forEach((comp) => comp._updateVisibleByAuth());
                        authComponents.forEach((comp) => comp._updatePropByAuth());
                    }).catch((e) => {
                        // 获取权限异常
                        this._promise = undefined;
                    });
                }
            },
            /**
             * 是否有权限
             * @param {*} authPath 权限路径，如 /dashboard/entity/list
             */
            has(authPath) {
                return this._map.has(authPath);
            },
        };

        // designer 环境直接放行权限
        if (process.env.VUE_APP_DESIGNER)
            return;

        // 需要在外面初始化，因为有些路由是初始的，不进 beforeEach
        $auth.init();
        router.beforeEach((to, from, next) => {
            if (options.allowList.includes(to.path))
                return next();
            if (to.path === options.redirect || to.redirectedFrom === options.redirect)
                return next();

            const checkAuth = () => {
                if ($auth.isInit() && $auth.has(base + to.path))
                    next();
                else {
                    options.toast && Vue.prototype.$toast.show(options.toast);
                    next(options.redirect);
                }
            };

            if ($auth.isInit())
                checkAuth();
            else
                $auth.init().then(() => checkAuth());
        });

        /**
         * 自动隐藏路由组件功能
         */
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
                    if (this.to) {
                        const index = toComponents.indexOf(this);
                        ~index && toComponents.splice(index, 1);
                    }
                },
                methods: {
                    _updateVisibleByAuth() {
                        if (!this.to || !$auth.isInit())
                            return;

                        let toPath = this.to;
                        if (typeof toPath === 'object')
                            toPath = toPath.path;

                        this.$el && (this.$el.style.display = $auth.has(base + toPath) ? '' : 'none');
                    },
                },
            });
        }

        /**
         * 组件权限项功能
         */
        const authComponents = [];
        Vue.mixin({
            mounted() {
                if (this.$attrs['vusion-auth-id']) {
                    authComponents.push(this);
                    this._updatePropByAuth();
                }
            },
            destroyed() {
                if (this.$attrs['vusion-auth-id']) {
                    const index = authComponents.indexOf(this);
                    ~index && authComponents.splice(index, 1);
                }
            },
            methods: {
                _updatePropByAuth() {
                    if (!this.$attrs['vusion-auth-id'] || !$auth.isInit())
                        return;

                    const authPath = `${base + this.$route.path}/${this.$attrs['vusion-auth-id']}`;
                    this.$el && (this.$el.style.display = $auth.has(authPath) ? '' : 'none');

                    if (this.$attrs['vusion-auth-actions']) {
                        const actions = this.$attrs['vusion-auth-actions'].split(',');
                        actions.forEach((action) => {
                            action = action.trim();
                            const authPath = `${base + this.$route.path}/${this.$attrs['vusion-auth-id']}/${action}`;
                            if (action === 'enabled') {
                                this._props.disabled = !$auth.has(authPath);
                            }
                        });
                    }
                },
            },
        });
    },
};


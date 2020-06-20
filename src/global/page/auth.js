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
            /**
             * 是否有当前路由下的子权限
             * @param {*} subPath 子权限路径，如 /createButton/enabled
             */
            hasSub(subPath) {
                const currentPath = base + router.currentRoute.path;
                if (subPath[0] !== '/')
                    subPath = '/' + subPath;
                return this.has(currentPath + subPath);
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
         * - 组件权限项功能
         * - 自动隐藏路由组件功能
         * 实现该需求无非三种方案：
         *     - 源码修改 v-show 或 disabled 属性，比如 :disabled="!$auth.hasSub('createButton/enabled') || !canSubmit"，
         *       从而从根本上改变 render 函数，有一定风险+恶心
         *     - 在 beforeUpdate 和 updated 阶段植入一些东西，缺点就是每次 updated 都会走一遍
         *     - 修改原组件 disabled 属性等，不是很推荐。在外层包装组件也属于这种情况
         */
        Vue.mixin({
            props: {
                vusionAuth: { type: [Boolean, String] },
                vusionAuthActions: { type: Array },
            },
            mounted() {
                // 目前只开放权限显隐
                this._updateVisibleByAuth();
            },
            updated() {
                this._updateVisibleByAuth();
            },
            methods: {
                _updateVisibleByAuth() {
                    if (!(options.autoHide && this.to || this.vusionAuth))
                        return;
                    if (!$auth.isInit())
                        return;

                    let visible = true;
                    if (options.autoHide && this.to) {
                        let toPath = this.to;
                        if (typeof toPath === 'object')
                            toPath = toPath.path;

                        visible = visible && $auth.has(base + toPath);
                    } else {
                        const authPath = `${base + this.$route.path}/${this.vusionAuth === true ? this.$vnode.data.ref : this.vusionAuth}`;
                        visible = visible && $auth.has(authPath);
                    }

                    this.$el && (this.$el.style.display = visible ? '' : 'none');
                },
                _updatePropByAuth() {
                    if (this.vusionAuth && this.vusionAuthActions) {
                        const actions = this.vusionAuthActions;
                        actions.forEach((action) => {
                            action = action.trim();
                            const authPath = `${base + this.$route.path}/${this.vusionAuth}/${action}`;
                            if (action === 'enabled') {
                                // 直接赋值属性姿势不太好
                                this.disabled = this.disabled || !$auth.has(authPath);
                            }
                        });
                    }
                },
            },
        });
    },
};


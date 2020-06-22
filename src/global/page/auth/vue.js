import $auth from './index';

export default {
    install(Vue, options = {}) {
        // 只关心鉴权的跳转，没 login 是有问题的状态
        options.redirect = options.redirect || '/';
        options.allowList = [].concat([], options.allowList);

        const router = options.router;
        const base = router.options.base.replace(/\/$/, '');

        /**
         * 是否有当前路由下的子权限
         * 该方法只能在 Vue 中调用
         * @param {*} subPath 子权限路径，如 /createButton/enabled
         */
        $auth.hasSub = function (subPath) {
            const currentPath = base + router.currentRoute.path;
            if (subPath[0] !== '/')
                subPath = '/' + subPath;
            return this.has(currentPath + subPath);
        };
        /**
         * 账号与权限中心
         */
        Vue.prototype.$auth = $auth;

        // designer 环境直接放行认证和鉴权
        if (process.env.VUE_APP_DESIGNER)
            return;

        // 需要在外面初始化，因为有些路由是初始的，不进 beforeEach
        $auth.init();
        router.beforeEach((to, from, next) => {
            if (options.allowList.includes(to.path))
                return next();

            const redirect = typeof options.redirect === 'function' ? options.redirect(to) : options.redirect;
            if (to.path === redirect || to.redirectedFrom === redirect)
                return next();

            $auth.getUserInfo().then(() => {
                $auth.getUserResources().then(() => {
                    if ($auth.has(base + to.path))
                        next();
                    else
                        throw new Error('Unauthorized');
                }).catch((e) => {
                    Vue.prototype.$toast.show('没有访问该页面的权限');
                    next(redirect);
                });
            }).catch(() => {
                window.location.href = '/';
            });
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


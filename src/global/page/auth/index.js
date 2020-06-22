import cookie from '@/global/utils/cookie';
import authService from '@/global/services/auth';
import pkg from '../../../../package.json';

let userInfoPromise = null;
let userResourcesPromise = null;
export default {
    _map: undefined,
    getUserInfo() {
        if (userInfoPromise)
            return userInfoPromise;
        else {
            return userInfoPromise = authService.GetUser({
                config: {
                    noErrorTip: true,
                },
                query: {
                    // 等接口好了去除
                    UserName: cookie.get('userName'),
                },
            });
        }
    },
    getUserResources() {
        const DomainName = pkg.name.replace(/-client$/, '');

        if (userResourcesPromise)
            return userResourcesPromise;
        else {
            return userResourcesPromise = authService.GetUserResources({
                query: {
                    DomainName,
                    UserName: cookie.get('userName'),
                },
            }).then((result) => {
                const resources = result.items.filter((resource) => resource.ResourceType === 'ui');

                // 初始化权限项
                this._map = new Map();
                resources.forEach((resource) => this._map.set(resource.ResourceValue, resource));
            }).catch((e) => {
                // 获取权限异常
                userResourcesPromise = undefined;
            });
        }
    },
    /**
     * 权限服务是否初始化
     */
    isInit() {
        return !!this._map;
    },
    /**
     * 初始化权限服务
     */
    init() {
        return this.getUserInfo().then(() => this.getUserResources());
    },
    /**
     * 是否有权限
     * @param {*} authPath 权限路径，如 /dashboard/entity/list
     */
    has(authPath) {
        return this._map.has(authPath);
    },
};

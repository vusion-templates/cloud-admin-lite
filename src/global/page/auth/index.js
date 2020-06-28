import authService from '@/global/services/auth';

let userInfoPromise = null;
let userResourcesPromise = null;
const maxTimes = 3;
const request = function (times) {
    return authService.GetUser({
        config: {
            noErrorTip: true,
        },
    }).catch((err) => {
        times--;
        if (times > 0) {
            return request(times);
        } else {
            throw err;
        }
    });
};
const auth = {
    _map: undefined,
    getUserInfo(times = 1) {
        if (!userInfoPromise) {
            userInfoPromise = request(times).catch((e) => {
                userInfoPromise = undefined;
                throw e;
            });
        }
        return userInfoPromise;
    },
    getUserResources(DomainName) {
        if (!userResourcesPromise) {
            userResourcesPromise = authService.GetUserResources({
                query: {
                    DomainName,
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
        return userResourcesPromise;
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
    init(domainName, times) {
        return this.getUserInfo(times || maxTimes).then(() => this.getUserResources(domainName));
    },
    /**
     * 是否有权限
     * @param {*} authPath 权限路径，如 /dashboard/entity/list
     */
    has(authPath) {
        return this._map.has(authPath);
    },
};
export default auth;

export const runAhead = function (domainName, times) {
    auth.init(domainName, times);
};

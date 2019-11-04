/**
 * 自动查找当前目录下一级的子路由
 * ./xxx/routes，或 ./views/xxx/routes
 * 这样 routes 可以递归书写
 */
export function importSubRoutes(r) {
    const subRoutes = [];

    r.keys().forEach((key) => {
        const component = r(key).default;
        if (key !== './routes.js' && component) {
            component && subRoutes.push(component);
        }
    });

    return subRoutes;
}


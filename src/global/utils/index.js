export default {
    hasRoute(routes, targetRoute) {
        let hasRoute = false;
        routes.forEach((route) => {
            const formatPath = '/' + route.path;
            if (targetRoute.startsWith(formatPath)) {
                let target = route;
                let current = route.children;
                targetRoute.replace(formatPath, '').split('/').every((routeItem) => {
                    if (!routeItem) {
                        return true;
                    }
                    if (current) {
                        target = current.find((item) => item.path === routeItem);
                        if (target) {
                            current = target.children;
                            return true;
                        }
                    } else {
                        target = null;
                    }
                    return false;
                });
                hasRoute = !!target;
            }
        });
        return hasRoute;
    },
};

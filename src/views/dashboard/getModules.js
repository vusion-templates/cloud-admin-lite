function importModules(r) {
    const map = {
        routes: [],
        config: [],
    };

    r.keys().forEach((key) => {
        const moduleItem = r(key).default;
        if (moduleItem.routes) {
            map.routes.push(moduleItem.routes);
        }
        if (moduleItem.config) {
            if (!moduleItem.config.module) {
                console.error('must have module attr');
            }
            map.config.push(moduleItem.config);
        }
    });

    return map;
}

export default importModules(require.context('./', true, /\.\/([^/]*?)\/index\.js$/));

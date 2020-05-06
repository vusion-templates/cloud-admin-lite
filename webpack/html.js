const pages = require('../pages.json');
module.exports = {
    chain(config) {
        Object.keys(pages).forEach((pageName) => {
            config.plugins.delete('preload-' + pageName);
            config.plugins.delete('prefetch-' + pageName);
        });
        config.module.rule('ftl')
            .test(/\.ftl$/i)
            .use('underscore-template')
            .loader('underscore-template-loader')
            .options({
                attributes: ['img:src', 'link:style', 'script:src'],
                root: '~',
                engine: 'lodash',
                withImports: false,
                parseDynamicRoutes: false,
                parseMacros: false,
                interpolate: '<%=([\\s\\S]+?)%>',
            });
    },
};

module.exports = {
    chain(config) {
        config.plugins.delete('preload-dashboard');
        config.plugins.delete('prefetch-dashboard');
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

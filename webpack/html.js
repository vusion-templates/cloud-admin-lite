const pages = require('../pages.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    chain(config, isDevelopment) {
        Object.keys(pages).forEach((pageName) => {
            config.plugins.delete('preload-' + pageName);
            config.plugins.delete('prefetch-' + pageName);
        });
        if (isDevelopment && !pages.index && !Object.values(pages).filter((page) => page.filename === 'index.html').length) {
            const entryKeys = Object.keys(config.entryPoints.entries());
            config.plugin('html-index').before(`html-${entryKeys[0]}`).use(HtmlWebpackPlugin, [{
                title: '说明页',
                filename: 'index.html',
                templateContent: `<body>此为生成的 index 页面，可以创建相应的 index 页面或者修改 pages.json 中的 filename 进行覆盖。<br>
                请注意：仅在 develop 模式下会生成此文件，线上环境合理配置后端路由
目前可访问页面：<br>
        ${Object.values(pages).map((page) => `<a href="/${page.filename.replace('.html', '')}">${page.filename}</a>`).join('<br>')}</body>`,
                chunks: [],
            }]); // 顺序不能错，一定要在其他 html 之前
        }
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

const pkg = require('./package.json');
const pages = require('./pages.json');
const argv = require('minimist')(process.argv.slice(2));
if (argv.pages) {
    argv.pages = argv.pages.split(',');
    Object.keys(pages).forEach((key) => {
        if (!argv.pages.includes(key))
            delete pages[key];
    });
}
if (Object.keys(pages).length > 1) {
    Object.keys(pages).forEach((key) => {
        if (pages[key].micro) {
            console.warn(`page[${key}] is microApp`);
            delete pages[key];
        }
    });
}
const isDevelopment = process.env.NODE_ENV === 'development';
const publicPathPrefix = process.env.SITE_TYPE === 'gh-pages' ? `https://vusion-templates.github.io/${pkg.name}` : '/';

const port = argv.port || 8810;

const devServer = require('./webpack.dev-server')(port);

const webpackMicro = require('./webpack/micro');
const isMicro = webpackMicro.isMicro(pages);

const webpackDll = require('./webpack/dll');
const webpackStyle = require('./webpack/style');
const webpackRoutes = require('./webpack/routes');
const webpackHtml = require('./webpack/html');
const webpackOptimization = require('./webpack/optimization');

if (isMicro) {
    webpackMicro.setup(pages);
}
const assetsDir = 'public';
let baseConfig = {
    publicPath: publicPathPrefix,
    assetsDir,
    productionSourceMap: false,
    transpileDependencies: [
        /lodash/,
        'resize-detector',
        /cloud-ui\.vusion/,
        /vusion-micro-app/,
        /@cloud-ui/,
    ],
};
if (isMicro) {
    baseConfig = webpackMicro.config(baseConfig, port, isDevelopment);
}
const vueConfig = {
    ...baseConfig,
    pages,
    chainWebpack(config) {
        webpackHtml.chain(config, isDevelopment);
        webpackOptimization.chain(config, isDevelopment, pages);
        if (isMicro) {
            webpackMicro.chain(config, isDevelopment);
        } else {
            webpackDll.chain(config, publicPathPrefix, isDevelopment);
        }
        webpackStyle.chain(config);
        webpackRoutes.chain(config);
        config.output.jsonpFunction('webpackJsonp' + pkg.name);
    },
    devServer,
};

module.exports = vueConfig;

const path = require('path');
const webpack = require('webpack');
const crypto = require('crypto');
const fs = require('fs');
const pkg = require('./package.json');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const md5 = function (str, len = 16) {
    const md5 = crypto.createHash('md5');
    return md5.update(str).digest('hex').substr(0, len);
};
const fixDll = function () {
    const content = fs.readFileSync(path.join(__dirname, './dll/vendor.online.js')).toString();
    const cache = './dll/.cache';
    const cacheRoot = path.join(__dirname, cache);
    if (!fs.existsSync(cacheRoot)) {
        fs.mkdirSync(cacheRoot);
    }
    const newPath = path.join(cache, `/vendor.${md5(content, 8)}.js`);
    fs.writeFileSync(path.join(__dirname, newPath), content);
    return newPath;
};
const isDevelopment = process.env.NODE_ENV === 'development';
const publicPathPrefix = process.env.SITE_TYPE === 'gh-pages' ? `/${pkg.name}/` : '/public';

const devServer = require('./webpack.dev-server')(publicPathPrefix);
const proxy = devServer.proxy;
// vue-cli 对 proxy 不支持 context 的自定义
delete devServer.proxy;
const manifest = require(isDevelopment ? './dll/vendor.manifest.json' : './dll/vendor.manifest.online.json');
const outputDir = path.resolve(__dirname, 'public');

const vueConfig = {
    outputDir,
    publicPath: publicPathPrefix,
    assetsDir: undefined,
    productionSourceMap: false,
    transpileDependencies: [
        /atom-validator/,
        /vusion-utils/,
        /lodash/,
        'vue-echarts',
        'resize-detector',
    ],
    pages: {
        index: {
            entry: './src/views/dashboard/index.js',
            template: path.join(__dirname, './src/pages/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, './src/pages/favicon.ico'),
            title: 'Dashboard',
            inject: true,
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            chunksSortMode: 'manual',
        },
    },
    chainWebpack(config) {
        config.output.filename(isDevelopment ? '[name].js' : '[name].[chunkhash:16].js');

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

        config.plugins.delete('preload');
        config.plugins.delete('prefetch');

        config.plugin('dll').use(webpack.DllReferencePlugin, [{
            manifest,
        }]);

        config.plugin('copy').use(CopyPlugin, [
            [{
                from: 'chunk-*.js',
                to: outputDir,
                context: path.join(__dirname, 'ui'),
            }],
        ]);

        if (!isDevelopment) {
            config.plugin('namedchunk').use(webpack.NamedChunksPlugin, [
                (chunk) => {
                    if (chunk.name)
                        return chunk.name;
                    const seen = new Set();
                    const nameLength = 4;
                    const modules = Array.from(chunk.modulesIterable);
                    if (modules.length > 1) {
                        const joinedHash = md5(modules.map((m) => m.id).join('_'));
                        let len = nameLength;
                        while (seen.has(joinedHash.substr(0, len)))
                            len++;
                        seen.add(joinedHash.substr(0, len));
                        return `chunk-${joinedHash.substr(0, len)}`;
                    } else
                        return modules[0].id;
                },
            ]);
        } else {
            config.plugin('namedmodule').use(webpack.NamedModulesPlugin);
        }

        const entryKeys = Object.keys(config.entryPoints.entries());
        if (config.plugins.has('icon-font-plugin')) {
            config.plugin('icon-font-plugin').tap(([opts]) => {
                opts.fontName = 'font-' + entryKeys.join('_').replace(/-/, '_');
                return [opts];
            });
        }
        if (config.plugins.has('css-sprite-plugin')) {
            config.plugin('css-sprite-plugin').tap(([opts]) => {
                opts.filename = '[name].[hash:16].[ext]';
                return [opts];
            });
        }
        let dllPath = './dll/vendor.js';
        if (!isDevelopment) {
            dllPath = fixDll();
        }
        entryKeys.forEach((entryKey) => {
            config.plugin(`${entryKey}-dll`).after(`html-${entryKey}`).use(AddAssetHtmlPlugin, [{
                filepath: path.resolve(__dirname, dllPath),
            }]).end();
        });
    },
    devServer,
    pluginOptions: {
        proxy,
    },
};

module.exports = vueConfig;

const microPlugin = require('webpack-micro');
const webpack = require('webpack');
const path = require('path');
const microConfig = require('../micro.config.json');
const microEntryName = microConfig.entryName;
module.exports = {
    setup(pages) {
        if (!microConfig.name) {
            console.error('please config micro name');
            process.exit(1);
        }
        Object.values(pages).forEach((page) => {
            page.chunks.unshift(microEntryName);
        });
        pages[microEntryName] = {
            entry: './node_modules/vusion-micro-app/dist/index.js',
        };
    },
    config(vueConfig, port, isDevelopment) {
        if (!vueConfig.publicPath.startsWith('http') || !vueConfig.publicPath.startsWith('//')) {
            console.warn('ensure master and slave app has same origin');
        }
        if (isDevelopment) {
            vueConfig.publicPath = 'http://localhost:' + port + vueConfig.publicPath;
        }
        return vueConfig;
    },
    chain(config) {
        config.plugin('wrap-micro-plugin').use(microPlugin.wrap, [
            {
                microName: microConfig.name,
                entry: microEntryName,
            },
        ]);
        config.plugin('assets-micro-plugin').use(microPlugin.plugin, [
            {
                record: false,
                refresh: false,
                micro: {
                    app: {
                        name: microConfig.name,
                    },
                },
                path: path.join(__dirname, '../.tmp'),
                entry: microEntryName,
            },
        ]);
        config.plugin('micro-name-plugin').use(webpack.DefinePlugin, [{
            MICRO_NAME: JSON.stringify(microConfig.name),
        }]);
        config.plugins.delete('preload-micro');
        config.plugins.delete('prefetch-micro');
        config.plugins.delete('html-micro');
        config.optimization.splitChunks({
            chunks(chunk) {
                return chunk.name !== microEntryName;
            },
        });
        const entryKeys = Object.keys(config.entryPoints.entries());
        config.plugin('icon-font-plugin').tap((args) => {
            args[0].entries = entryKeys.filter((i) => i !== 'micro');
            return args;
        });
    },
};

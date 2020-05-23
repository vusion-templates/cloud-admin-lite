const microPlugin = require('webpack-micro');
const webpack = require('webpack');
const util = require('./util');
const microConfig = require('../micro.config.json');
module.exports = {
    setup(pages) {
        Object.values(pages).forEach((page) => {
            page.chunks.unshift(microConfig.entryName);
        });
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
    chain(config, isDevelopment) {
        config.plugin('micro-name-plugin').use(webpack.DefinePlugin, [{
            MICRO_NAME: JSON.stringify(microConfig.name),
        }]);

        config.plugin('micro-assets-plugin').use(microPlugin.newPlugin, [{
            latest: true,
            prefix: isDevelopment ? '' : './public/js/',
            filename: util.getCommitId(),
            entryName: microConfig.entryName,
            microName: microConfig.name,
        }]);
    },
};

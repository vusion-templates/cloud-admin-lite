const microPlugin = require('webpack-micro');
const webpack = require('webpack');
const util = require('./util');
let microConfig = null;
module.exports = {
    isMicro(pages) {
        const pagesValue = Object.values(pages);
        if (pagesValue.length > 1) {
            if (pagesValue.find((i) => i.micro)) {
                console.error('microApp only support single build');
                process.exit(1);
            }
            return false;
        } else if (pagesValue.length === 1) {
            const page = pagesValue[0];
            microConfig = page.micro;
            delete page.micro;
            return !!microConfig;
        }
    },
    setup(pages) {
        const page = Object.values(pages)[0];
        page.chunks.unshift(microConfig.entryName);
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
        const microPrefix = 'public/js/' + microConfig.name + '-';
        config.plugin('micro-name-plugin').use(webpack.DefinePlugin, [{
            MICRO_NAME: JSON.stringify(microConfig.name),
            MICRO_PREFIX: JSON.stringify(microPrefix),
        }]);

        config.plugin('micro-assets-plugin').use(microPlugin.newPlugin, [{
            latest: true,
            prefix: microPrefix,
            filename: util.getCommitId(),
            entryName: microConfig.entryName,
            microName: microConfig.name,
        }]);
    },
};

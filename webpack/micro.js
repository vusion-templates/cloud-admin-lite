const microPlugin = require('webpack-micro');
const webpack = require('webpack');
const util = require('./util');
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
    chain(config, isDevelopment) {
        config.plugin('wrap-micro-plugin').use(microPlugin.wrap, [
            {
                microName: microConfig.name,
                entry: microEntryName,
            },
        ]);
        [util.getCommitId(), 'latest'].forEach((filename) => {
            const data = {
                record: false,
                refresh: false,
                micro: {
                    app: {
                        name: microConfig.name,
                    },
                },
                entry: microEntryName,
                useCompilerPath: true,
                keepInMemory: true,
            };
            const prefix = isDevelopment ? '' : './public/js/';
            config.plugin(`assets-micro-plugin-${filename}`).use(microPlugin.plugin, [
                {
                    ...data,
                    filename: `${prefix}${filename}.json`,
                },
            ]);
            config.plugin(`assets-micro-plugin-${filename}-js`).use(microPlugin.plugin, [
                {
                    ...data,
                    filename: `${prefix}${filename}.js`,
                    processOutput(assets) {
                        return `;(function(){
var m=window.micro=window.micro||{};
var c=m.subApps=m.subApps||{};
c["${microConfig.name}"]=${JSON.stringify(assets)};
m.subApps=c;})();`;
                    },
                },
            ]);
        });

        config.plugin('micro-name-plugin').use(webpack.DefinePlugin, [{
            MICRO_NAME: JSON.stringify(microConfig.name),
        }]);
        config.plugins.delete('html-' + microEntryName);

        const entryKeys = Object.keys(config.entryPoints.entries());
        config.plugin('icon-font-plugin').tap((args) => {
            args[0].entries = entryKeys.filter((i) => i !== microEntryName);
            return args;
        });

        const splitChunks = config.optimization.get('splitChunks');
        if (splitChunks) {
            splitChunks.cacheGroups.vendors.chunks = function (chunk) {
                return chunk.name !== microEntryName;
            };
            config.optimization.splitChunks(splitChunks);
        }
    },
};

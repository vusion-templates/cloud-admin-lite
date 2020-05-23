const path = require('path');
const webpack = require('webpack');

module.exports = (env = {}) => {
    // Dll 生成路径
    const dllDir = path.resolve(__dirname, './dll');
    const publicPath = '/dist';

    // 开发模式的文件信息
    let config = {
        filename: '[name].js',
        manifest: '[name].manifest.json',
    };

    // 生产模式的文件信息
    if (env.NODE_ENV !== 'development') {
        config = {
            filename: '[name].online.js',
            manifest: '[name].manifest.online.json',
        };
    }

    return {
        mode: env.NODE_ENV,
        entry: {
            vendor: [
                'vue',
                'vue-router',
                // 'vue-i18n',
            ],
        },
        output: {
            filename: config.filename,
            path: dllDir,
            publicPath,
            library: '[name]',
        },
        resolve: {
            alias: {
                vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
                'vue-i18n$': path.resolve(__dirname, 'node_modules/vue-i18n/dist/vue-i18n.esm.js'),
                'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
            },
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env.NODE_ENV),
                },
            }),
            new webpack.DllPlugin({
                path: path.join(dllDir, config.manifest),
                name: '[name]',
            }),
            new webpack.HashedModuleIdsPlugin(),
        ],
    };
};

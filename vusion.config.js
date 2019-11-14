const path = require('path');

module.exports = {
    type: 'app',
    docs: false,
    staticPath: './src/static',
    srcPath: './src',
    libraryPath: './src/global',
    baseCSSPath: './src/global/styles/index.css',
    theme: './src/global/styles/theme.css',
    alias: {
        vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
        'vue-i18n$': path.resolve(__dirname, 'node_modules/vue-i18n/dist/vue-i18n.esm.js'),
        'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
        '@': path.resolve(__dirname, 'src'),
        'cloud-ui.js$': path.resolve(__dirname, 'ui/index.js'),
        'cloud-ui.css$': path.resolve(__dirname, 'ui/index.css'),
    },
};

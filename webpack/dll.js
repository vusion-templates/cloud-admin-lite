const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const util = require('./util');
const pages = require('../pages.json');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const fixDll = function () {
    const content = fs.readFileSync(path.join(__dirname, '../dll/vendor.online.js')).toString();
    const cache = '../dll/.cache';
    const cacheRoot = path.join(__dirname, cache);
    if (!fs.existsSync(cacheRoot)) {
        fs.mkdirSync(cacheRoot);
    }
    const newPath = path.join(cache, `vendor.${util.md5(content, 8)}.js`);
    fs.writeFileSync(path.join(__dirname, newPath), content);
    return newPath;
};
module.exports = {
    chain(config, publicPathPrefix, isDevelopment) {
        const manifest = require(isDevelopment ? '../dll/vendor.manifest.json' : '../dll/vendor.manifest.online.json');
        let dllPath = '../dll/vendor.js';
        if (!isDevelopment) {
            dllPath = fixDll();
        }
        const entryKeys = Object.keys(config.entryPoints.entries());
        entryKeys.forEach((entryKey) => {
            config.plugin(`${entryKey}-dll`).after(`html-${entryKey}`).use(AddAssetHtmlPlugin, [{
                files: Object.values(pages).map((page) => page.filename),
                filepath: path.resolve(__dirname, dllPath),
                outputPath: 'public/js',
                publicPath: (publicPathPrefix + '/public/js').replace('//public/', '/public/'),
            }]).end();
        });
        config.plugin('dll').use(webpack.DllReferencePlugin, [{
            manifest,
        }]);
    },
};

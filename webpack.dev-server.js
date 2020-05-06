const host = 'localhost';
const path = require('path');
const pages = require('./pages.json');
module.exports = function (port) {
    return {
        host,
        port,
        open: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname),
        watchContentBase: false, // dev slow on Windows
        clientLogLevel: 'info',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        historyApiFallback: {
            rewrites: Object.keys(pages).map((k) => ({
                from: new RegExp('^' + k + '/'),
                to: '/' + k,
            })),
        },
        // proxy: [{
        //     context: ['**', `!${publicPathPrefix}/**`, '!/', '!/index.html', '!/index.html/'],
        //     target: 'http://test.com', // add host 127.0.0.1 test.com
        // }],
    };
};

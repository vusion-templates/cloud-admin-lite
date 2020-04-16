const host = 'localhost';
const port = 8820;
const path = require('path');
module.exports = function (publicPathPrefix) {
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
        // proxy: [{
        //     context: ['**', `!${publicPathPrefix}/**`, '!/', '!/index.html', '!/index.html/'],
        //     target: 'http://test.com', // add host 127.0.0.1 test.com
        // }],
    };
};

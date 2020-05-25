const host = 'localhost';
const path = require('path');

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
        proxy: {
            '^/api/': {
                target: 'http://target.com', // Add host 127.0.0.1 target.com
            },
        },
    };
};

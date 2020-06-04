const host = 'localhost';
const path = require('path');

module.exports = function (port) {
    return {
        host,
        port,
        progress: !process.env.SERVER_DEVELOP,
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
                target: 'http://target.com', // Add your proxy target
            },
        },
    };
};

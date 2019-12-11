const host = 'localhost';
const port = 8810;

module.exports = function (publicPathPrefix) {
    return {
        host,
        port,
        open: true,
        disableHostCheck: true,
        contentBase: __dirname,
        watchContentBase: false, // dev slow on Windows
        clientLogLevel: 'info',
        // proxy: [{
        //     context: ['**', `!${publicPathPrefix}/**`, '!/', '!/index.html', '!/index.html/'],
        //     target: 'http://test.com', // add host 127.0.0.1 test.com
        // }],
    };
};

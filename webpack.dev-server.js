const host = 'localhost';
const port = 8810;

module.exports = function (publicPathPrefix) {
    return {
        host,
        port,
        open: true,
        public: `http://${host}:${port}/index.html`,
        disableHostCheck: true,
        publicPath: publicPathPrefix,
        contentBase: __dirname,
        watchContentBase: false, // dev slow on Windows
        clientLogLevel: 'info',
    };
};

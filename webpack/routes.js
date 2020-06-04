module.exports = {
    chain(config) {
        config.module.rule('routes-loader')
            .test(/\broutes\.map\.js$/i)
            .use('routes-loader')
            .loader('@vusion/routes-loader')
            .before('js');
    },
};

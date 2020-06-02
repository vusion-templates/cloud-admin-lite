module.exports = {
    presets: [
        // jsx in vue needed
        ['@vue/app', {
            modules: 'commonjs',
            jsx: {
                injectH: false,
            },
            polyfills: [
                'es.symbol',
            ],
        }],
    ],
    plugins: ['@babel/plugin-transform-strict-mode'],
};

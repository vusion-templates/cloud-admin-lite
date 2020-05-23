module.exports = {
    presets: [
        // jsx in vue needed
        ['@vue/app', {
            modules: 'commonjs',
            jsx: {
                injectH: false,
            },
            polyfills: [
                'es6.symbol',
            ],
        }],
    ],
    plugins: ['@babel/plugin-transform-strict-mode'],
};

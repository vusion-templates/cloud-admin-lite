module.exports = {
    presets: [
        // jsx in vue needed
        ['@vue/app', {
            useBuiltIns: 'entry',
            jsx: {
                injectH: false,
            },
        }],
    ],
    plugins: ['@babel/plugin-transform-strict-mode'],
};

module.exports = {
    chain(config) {
        const entryKeys = Object.keys(config.entryPoints.entries());
        if (config.plugins.has('icon-font-plugin')) {
            config.plugin('icon-font-plugin').tap(([opts]) => {
                opts.fontName = 'font-' + entryKeys.join('_').replace(/-/, '_');
                return [opts];
            });
        }
        if (config.plugins.has('css-sprite-plugin')) {
            config.plugin('css-sprite-plugin').tap(([opts]) => {
                opts.filename = '[name].[hash:16].[ext]';
                return [opts];
            });
        }
    },
};

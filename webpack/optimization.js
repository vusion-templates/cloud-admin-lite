const webpack = require('webpack');
const util = require('./util');
module.exports = {
    chain(config, isDevelopment) {
        if (!isDevelopment) {
            config.plugin('namedchunk').use(webpack.NamedChunksPlugin, [
                (chunk) => {
                    if (chunk.name)
                        return chunk.name;
                    const seen = new Set();
                    const nameLength = 4;
                    const modules = Array.from(chunk.modulesIterable);
                    if (modules.length > 1) {
                        const joinedHash = util.md5(modules.map((m) => m.id).join('_'));
                        let len = nameLength;
                        while (seen.has(joinedHash.substr(0, len)))
                            len++;
                        seen.add(joinedHash.substr(0, len));
                        return `chunk-${joinedHash.substr(0, len)}`;
                    } else
                        return modules[0].id;
                },
            ]);
        } else {
            config.plugin('namedmodule').use(webpack.NamedModulesPlugin);
        }
    },
};

const crypto = require('crypto');
const shell = require('shelljs');
module.exports = {
    md5(str, len = 16) {
        const md5 = crypto.createHash('md5');
        return md5.update(str).digest('hex').substr(0, len);
    },
    getCommitId() {
        try {
            return shell.exec('git rev-parse HEAD', {
                silent: true,
            }).trim();
        } catch (error) {
            console.error(error);
            throw new Error('get commitId error.');
        }
    },
};

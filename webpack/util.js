const crypto = require('crypto');
module.exports = {
    md5(str, len = 16) {
        const md5 = crypto.createHash('md5');
        return md5.update(str).digest('hex').substr(0, len);
    },
};

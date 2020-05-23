const path = require('path');
exports.fixSlash = (filePath) => filePath.split(path.sep).join('/');

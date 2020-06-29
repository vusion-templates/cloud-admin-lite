const fse = require('fs-extra');
const path = require('path');
fse.ensureDirSync(path.join(__dirname, './src/views'));

module.exports = function (plop) {
    require('cloud-admin-template-sdk/dist/lib/cli/plopfile.js')(plop);
};

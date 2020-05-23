const path = require('path');
const fs = require('fs');
const stringify = require('javascript-stringify').stringify;

module.exports = {
    layoutMap: ['sidebar', 'navbar', 'noNav'],
    getFile(filePath) {
        let obj;
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8').trim().replace(/export default |module\.exports +=/, '');
            try {
                // eslint-disable-next-line no-eval
                obj = eval('(function(){return ' + content + '})()');
            } catch (e) {
            }
        }
        return obj;
    },
    getAppConfig(pagePath) {
        const appConfig = this.getFile(path.join(pagePath, 'app.config.js'));
        return appConfig;
    },
    getModuleOrder(pagePath) {
        const modulesOrder = this.getFile(path.join(pagePath, 'modules.order.js'));
        if (modulesOrder) {
            if (!Array.isArray(modulesOrder.sidebar))
                return;
            if (!Array.isArray(modulesOrder.navbar))
                return;
            if (!Array.isArray(modulesOrder.normal))
                return;
        }
        return modulesOrder;
    },
    setModuleOrder(pagePath, modulesOrder) {
        const modulesOrderPath = path.join(pagePath, 'modules.order.js');
        fs.writeFileSync(modulesOrderPath, 'export default ' + stringify(modulesOrder, null, 4) + ';\n', 'utf8');
    },
    fixSlash(filePath) {
        return filePath.split(path.sep).join('/');
    },
};

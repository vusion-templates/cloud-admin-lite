const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const stringify = require('javascript-stringify').stringify;

const viewsRoot = path.join(__dirname, '../../src/views');

module.exports = {
    prompts: [
        {
            type: 'list',
            name: 'page',
            message: '请选择模块所在的入口页',
            choices(answers) {
                const pages = [];
                fs.readdirSync(viewsRoot).forEach((innerDir) => {
                    const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
                    if (stat.isDirectory()) {
                        pages.push(innerDir);
                    }
                });
                return pages;
            },
        },
        {
            type: 'list',
            name: 'name',
            message: '请选择要删除的模块',
            choices(answers) {
                const modules = [];
                const pagePath = path.join(viewsRoot, answers.page);
                fs.readdirSync(pagePath).forEach((innerDir) => {
                    const stat = fs.statSync(path.resolve(pagePath, innerDir));
                    if (stat.isDirectory()) {
                        modules.push(innerDir);
                    }
                });
                return modules;
            },
        },
    ],
    actions(answers) {
        const pagePath = path.join(viewsRoot, answers.page);
        const dest = path.join(pagePath, answers.name);

        const name = chalk.blue(answers.name);

        return [
            function (answers) {
                fs.removeSync(dest);

                const modulesOrderPath = path.join(pagePath, 'modules.order.js');
                if (!fs.existsSync(modulesOrderPath))
                    return;
                const modulesOrderContent = fs.readFileSync(modulesOrderPath, 'utf8').trim().replace(/export default |module\.exports +=/, '');
                // eslint-disable-next-line no-eval
                const modulesOrder = eval(modulesOrderContent);
                const indexOf = modulesOrder.indexOf(answers.name);
                ~indexOf && modulesOrder.splice(indexOf, 1);
                fs.writeFileSync(modulesOrderPath, 'export default ' + stringify(modulesOrder, null, 4) + ';\n', 'utf8');
            },
            [
                `Module ${name} has been removed.`,
            ].join('\n'),
        ];
    },
};

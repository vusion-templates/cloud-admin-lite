const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const stringify = require('javascript-stringify').stringify;

const viewsRoot = path.join(__dirname, '../../src/views');
const pages = [];
fs.readdirSync(viewsRoot).forEach((innerDir) => {
    const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
    if (stat.isDirectory()) {
        pages.push(innerDir);
    }
});

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入模块名（将作为文件夹名、路径名等使用）',
            validate(value) {
                if (value) { return true; }
                return '模块名必填';
            },
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入模块标题（可选，用于替换模块中的常见文案）',
        },
        {
            type: 'list',
            name: 'page',
            message: '添加至',
            choices: pages,
            when() {
                return pages.length > 1;
            },
        },
        {
            type: 'confirm',
            name: 'addToSidebar',
            default: true,
            message: '是否添加到侧边栏？',
        },
    ],
    actions(answers) {
        answers.page = answers.page || pages[0];
        answers.title = answers.title || answers.name;
        const name = chalk.blue(answers.name);

        const base = path.join(__dirname, './template');
        const pagePath = path.join(viewsRoot, answers.page);

        return [
            {
                type: 'addMany',
                destination: path.join(pagePath, answers.name),
                base,
                templateFiles: base + '/**',
            },
            function () {
                if (!answers.addToSidebar)
                    return;

                const modulesOrderPath = path.join(pagePath, 'modules.order.js');
                if (!fs.existsSync(modulesOrderPath))
                    return;
                const modulesOrderContent = fs.readFileSync(modulesOrderPath, 'utf8').trim().replace(/export default |module\.exports +=/, '');
                let modulesOrder;
                try {
                    // eslint-disable-next-line no-eval
                    modulesOrder = eval(modulesOrderContent);
                    if (!Array.isArray(modulesOrder))
                        return;
                } catch (e) {
                    return;
                }
                modulesOrder.push(answers.name);
                fs.writeFileSync(modulesOrderPath, 'export default ' + stringify(modulesOrder, null, 4) + ';\n', 'utf8');
            },
            [
                `Module ${name} has been added.`,
                `Something need to know:`,
                `  module path is ${chalk.yellow(`src/views/${answers.page}/${answers.name}`)}`,
                `  you can modify module order of sidebar in file ${chalk.yellow(`src/views/${answers.page}/modules.order.js`)}`,
                `  change title and other config in file ${chalk.yellow(`src/views/${answers.page}/${answers.name}/module/base.js`)}`,
            ].join('\n'),
        ];
    },
};
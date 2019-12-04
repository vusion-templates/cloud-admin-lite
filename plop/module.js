const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const viewsRoot = path.join(__dirname, '../src/views');
const subViews = [];
fs.readdirSync(viewsRoot).forEach((dirInner) => {
    const stat = fs.statSync(path.resolve(viewsRoot, dirInner));
    if (stat.isDirectory()) {
        subViews.push(dirInner);
    }
});

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '模块名',
            validate(value) {
                if (value) { return true; }
                return '模块名必填';
            },
        },
        {
            type: 'list',
            name: 'subDir',
            message: '添加至',
            choices: subViews,
            when() {
                return subViews.length > 1;
            },
        },
    ],
    actions(answers) {
        answers.subDir = answers.subDir || subViews[0];
        const base = path.join(__dirname, './templates/module');
        const basePath = path.join(viewsRoot, answers.subDir);
        const name = chalk.blue(answers.name);
        return [
            {
                type: 'addMany',
                destination: path.join(basePath, answers.name),
                base,
                templateFiles: base + '/**',
            },
            [
                `${name} do not appear in the sidebar by default, but you can modify in this file ${chalk.yellow(`src/views/${answers.subDir}/modules.order.js`)}`,
                `can change the title(${name}) in this file ${chalk.yellow(`src/views/${answers.subDir}/${answers.name}/module/base.js`)}`,
            ].join('\n'),
        ];
    },
};

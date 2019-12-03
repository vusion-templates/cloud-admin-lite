const path = require('path');
const chalk = require('chalk');
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
    ],
    actions(answers) {
        const base = path.join(__dirname, './templates/module');
        const basePath = path.join(__dirname, '../src/views/dashboard');
        const name = chalk.blue(answers.name);
        return [
            {
                type: 'addMany',
                destination: path.join(basePath, answers.name),
                base,
                templateFiles: base + '/**',
            },
            [
                `${name} do not appear in the sidebar by default, but you can modify in this file ${chalk.yellow('src/views/dashboard/modules.order.js')}`,
                `can change the title(${name}) in this file ${chalk.yellow(`src/views/dashboard/${answers.name}/module/base.js`)}`,
            ].join('\n'),
        ];
    },
};

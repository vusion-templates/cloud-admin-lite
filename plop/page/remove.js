const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const viewsRoot = path.join(__dirname, '../../src/views');

module.exports = {
    prompts: [
        {
            type: 'list',
            name: 'name',
            message: '请选择要删除的入口页名称',
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
    ],
    actions(answers) {
        const dest = path.join(viewsRoot, answers.name);

        const { name } = answers;

        return [
            function (answers) {
                fs.removeSync(dest);
                fs.removeSync(path.join(__dirname, '../../src/pages', answers.name + '.html'));

                const pages = require('../../pages.json');
                delete pages[name];
                fs.writeFileSync(path.join(__dirname, '../../pages.json'), JSON.stringify(pages, null, 4));
            },
            [
                `Page ${name} has been removed. You need to ${chalk.green(`restart dev server`)}`,
                `Something need to know:`,
                `  webpack entry config (vue pages config) in ${chalk.yellow(`pages.json`)}`,
                `  proxy in ${chalk.yellow('webpack.dev-server.js')} may need to be updated`,
            ].join('\n'),
        ];
    },
};

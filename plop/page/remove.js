const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const viewsRoot = path.join(__dirname, '../../src/views');

module.exports = {
    prompts: [
        {
            type: 'list',
            name: 'name',
            required: true,
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
                `页面 ${name} 已经被删除。你需要${chalk.green(`重新启动 dev server`)}。`,
                `需要注意以下几点：`,
                `  Webpack 配置 (vue pages 配置) 在 ${chalk.yellow(`pages.json`)} 中`,
                `  代理在 ${chalk.yellow('webpack.dev-server.js')} 中，可能需要修改`,
            ].join('\n'),
        ];
    },
};

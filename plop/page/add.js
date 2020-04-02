const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '请输入入口页名称（如"register"，将作为文件夹名、路径名等使用）',
            validate(value) {
                if (value) { return true; }
                return '入口页名称必填';
            },
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入入口页标题（可选，如"用户注册"，作为网页 title 等使用）',
        },
    ],
    actions(answers) {
        const dest = path.join(__dirname, '../../src/views', answers.name);
        const base = path.join(__dirname, './template');

        let { name, title } = answers;
        title = title || name;

        return [
            function (answers) {
                const pages = require('../../pages.json');
                if (pages[name]) {
                    throw new Error('This page has been added');
                }
                pages[name] = {
                    entry: `./src/views/${name}/index.js`,
                    template: `./src/pages/${name}.html`,
                    filename: `${name}.html`,
                    favicon: './src/pages/favicon.ico',
                    title,
                    inject: true,
                    chunks: [
                        'chunk-vendors',
                        'chunk-common',
                        name,
                    ],
                    chunksSortMode: 'manual',
                };
                fs.writeFileSync(path.join(__dirname, '../../pages.json'), JSON.stringify(pages, null, 4));
            },
            {
                type: 'addMany',
                destination: dest,
                base: path.join(base, 'src'),
                templateFiles: path.join(base, 'src/**'),
            },
            {
                type: 'add',
                path: path.join(__dirname, '../../src/pages', name + '.html'),
                base,
                templateFile: path.join(base, 'index.html'),
            },
            [
                `Page ${chalk.blue(name)} has been initialized. You can ${chalk.green(`restart dev server`)} and open ${chalk.blue(`/${name}.html`)} to see it`,
                `Something need to know:`,
                `  src entry file path is ${chalk.yellow(`src/views/${name}/index.js`)}`,
                `  html file path is ${chalk.yellow(`src/pages/${name}.html`)}`,
                `  webpack entry config (vue pages config) in ${chalk.yellow(`pages.json`)}`,
                `  proxy in ${chalk.yellow('webpack.dev-server.js')} may need to be updated`,
            ].join('\n'),
        ];
    },
};

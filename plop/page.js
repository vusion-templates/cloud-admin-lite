const path = require('path');
const fs = require('fs');
const pages = require('../pages.json');
const chalk = require('chalk');
let name;
module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '页面名称',
            validate(value) {
                if (value) {
                    name = value;
                    return true;
                }
                return '页面名称必填';
            },
        },
    ],
    actions(answers) {
        const viewsRoot = path.join(__dirname, '../src/views', answers.name);
        const base = path.join(__dirname, './templates/page');
        return [
            function (answers) {
                const name = answers.name;
                if (pages[name]) {
                    throw new Error('This page has been added');
                }
                pages[name] = {
                    entry: `./src/views/${name}/index.js`,
                    template: `./src/pages/${name}.html`,
                    filename: `${name}.html`,
                    favicon: './src/pages/favicon.ico',
                    title: name,
                    inject: true,
                    chunks: [
                        'chunk-vendors',
                        'chunk-common',
                        name,
                    ],
                    chunksSortMode: 'manual',
                };
                fs.writeFileSync(path.join(__dirname, '../pages.json'), JSON.stringify(pages, null, 4));
            },
            {
                type: 'addMany',
                destination: viewsRoot,
                base: base + '/src',
                templateFiles: base + '/src/**',
            },
            {
                type: 'add',
                path: path.join(__dirname, '../src/pages', answers.name + '.html'),
                base,
                templateFile: base + '/index.html',
            },
            [
                `This page has been initialized, you can ${chalk.green(`restart dev server`)} and open ${chalk.blue(`/${name}.html`)} to see it`,
                `something need to know:`,
                `src entry file path is ${chalk.yellow(`src/views/${name}/index.js`)}`,
                `html file path is ${chalk.yellow(`src/pages/${name}.html`)}`,
                `webpack config in ${chalk.yellow(`pages.json`)}`,
                `proxy in ${chalk.yellow('webpack.dev-server.js')} may need to be updated`,
            ].join('\n'),
        ];
    },
};

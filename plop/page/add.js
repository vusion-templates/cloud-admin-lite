const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            required: true,
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
                    throw new Error('该页面已经存在！');
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
                `页面 ${chalk.blue(name)} 已经添加成功。你需要${chalk.green(`重新启动 dev server`)}，然后打开 ${chalk.blue(`/${name}`)} 即可查看。`,
                `需要注意以下几点：`,
                `  入口 JS 文件为 ${chalk.yellow(`src/views/${name}/index.js`)}`,
                `  入口页面模板为 ${chalk.yellow(`src/pages/${name}.html`)}`,
                `  Webpack 配置 (vue pages 配置) 在 ${chalk.yellow(`pages.json`)} 中`,
                `  代理在 ${chalk.yellow('webpack.dev-server.js')} 中，可能需要修改`,
            ].join('\n'),
        ];
    },
};

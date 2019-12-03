const path = require('path');
const chalk = require('chalk');
const basePath = path.join(__dirname, '../src/global/components');

const fixComponentName = function (name) {
    return name.replace(/^[a-z]/, (a) => a.toUpperCase()).replace(/-([a-z])/g, (a, b) => b.toUpperCase()).replace('.vue', '');
};
module.exports = {
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '组件的文件名, 如 u-text 或 u-text.vue',
            validate(value) {
                if ((/^[a-z]-([a-z])/).test(value)) { return true; }
                return '组件名称必须类似 u-text 或 u-text.vue';
            },
        },
        {
            type: 'directory',
            message: '组件的路径',
            name: 'directory',
            basePath,
        },
    ],
    actions(answers) {
        const mutil = answers.name.endsWith('.vue');
        const [root, ...sub] = answers.directory.split('/');
        sub.unshift('');
        const name = answers.name.replace(/\.vue$/, '');
        if (!mutil) {
            return [
                {
                    type: 'add',
                    path: path.join(basePath, answers.directory, answers.name + '.vue'),
                    templateFile: path.join(__dirname, './templates/component/index.vue'),

                },
                {
                    type: 'modify',
                    pattern: /([\d\D]*)/,
                    path: path.join(basePath, root, 'index.js'),
                    template: `$1\nexport { default as ${fixComponentName(answers.name)} } from '.${sub.join('/')}/${answers.name}.vue';\n`,
                },
                `use like: ${chalk.yellow(`<${name}></${name}>`)}`,
            ];
        }
        return [
            {
                type: 'addMany',
                destination: path.join(basePath, answers.directory, answers.name),
                base: path.join(__dirname, './templates/component/mutil.vue'),
                templateFiles: path.join(__dirname, './templates/component/mutil.vue') + '/**',
                data: {
                    formatName: fixComponentName(answers.name),
                },
            },
            {
                type: 'modify',
                pattern: /([\d\D]*)/,
                path: path.join(basePath, root, 'index.js'),
                template: `$1\nexport { default as ${fixComponentName(answers.name)} } from '.${sub.join('/')}/${answers.name}';\n`,
            },
            `use like: ${chalk.yellow(`<${name}></${name}>`)}`,
        ];
    },
};

const promptDirectory = require('inquirer-directory');
const moduleGenerator = require('./plop/module');
const componentGenerator = require('./plop/component');
module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('global component', componentGenerator);
    plop.setGenerator('module', moduleGenerator);
};

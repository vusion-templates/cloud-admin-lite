const promptDirectory = require('inquirer-directory');
const componentGenerator = require('./plop/component/add');
const pageGenerator = require('./plop/page/add');
// const pageGenerator = require('./plop/page/remove');
const moduleGenerator = require('./plop/module/add');
// const moduleGenerator = require('./plop/module/remove');

module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('global component', componentGenerator);
    plop.setGenerator('page', pageGenerator);
    plop.setGenerator('module', moduleGenerator);
};

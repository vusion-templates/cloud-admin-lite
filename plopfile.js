const promptDirectory = require('inquirer-directory');
const componentGenerator = require('./plop/component/add');
const addPageGenerator = require('./plop/page/add');
const removePageGenerator = require('./plop/page/remove');
const addModuleGenerator = require('./plop/module/add');
const removeModuleGenerator = require('./plop/module/remove');

module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('global component', componentGenerator);
    plop.setGenerator('add-page', addPageGenerator);
    plop.setGenerator('remove-page', removePageGenerator);
    plop.setGenerator('add-module', addModuleGenerator);
    plop.setGenerator('remove-module', removeModuleGenerator);
};

import 'cloud-ui.vusion.css';
import Vue from 'vue';
import * as CloudUI from 'cloud-ui.vusion';
import { installOptions, installDirectives, installComponents } from 'vusion-utils';
import mock from '@vusion/mock'; // 用于物料添加时的填充默认数据

installOptions(Vue);
installDirectives(Vue, CloudUI.directives);
installComponents(Vue, CloudUI);
Vue.use(mock);

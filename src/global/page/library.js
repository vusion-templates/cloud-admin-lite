import 'cloud-ui.vusion.css';
import Vue from 'vue';
import * as CloudUI from 'cloud-ui.vusion';
import { installOptions, installDirectives, installComponents } from 'vusion-utils';
installOptions(Vue);
installDirectives(Vue, CloudUI.directives);
installComponents(Vue, CloudUI);

import LoadStatus from '@/global/mixins/load';
import Modal from '@/global/mixins/modal/install';
import Vue from 'vue';
import './library';
Vue.mixin(LoadStatus);
Vue.use(Modal);

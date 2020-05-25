import { UToast } from 'cloud-ui.vusion';
export default {
    defaults({ config }, err) {
        UToast.show('系统繁忙');
    },
    500({ config }, err = {}) {
        UToast.show(err.msg || '系统繁忙');
    },
    400({ config }, err = {}) {
        UToast.show(err.msg || '系统繁忙');
    },
    localError(config, err) {
        UToast.show('客户端错误');
    },
};

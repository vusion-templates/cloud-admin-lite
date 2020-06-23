import { UToast } from 'cloud-ui.vusion';
export default {
    defaults({ config }, err) {
        if (!config.noErrorTip) {
            UToast.show('系统繁忙');
        }
    },
    500({ config }, err = {}) {
        if (!config.noErrorTip) {
            UToast.show(err.msg || '系统繁忙');
        }
    },
    400({ config }, err = {}) {
        if (!config.noErrorTip) {
            UToast.show(err.msg || '系统繁忙');
        }
    },
    localError(config, err) {
        if (!config.noErrorTip) {
            UToast.show('客户端错误');
        }
    },
};

export default {
    beforeCreate() {
        const tplRender = this.$options.tplRender;
        let tplMixins = this.$options.tplMixins || [];
        const map = {};
        const collectTpl = function (component) {
            if (!component) {
                return;
            }
            const blockName = ((component.data || {}).attrs || {})['block-name'];
            if (blockName) {
                map[blockName] = component;
            } else if (component.children) {
                component.children.forEach((component) => {
                    collectTpl(component);
                });
            }
        };
        tplMixins = tplMixins.concat({
            render: this.$options.render,
        });
        this.$options.render = function (...args) {
            const tpls = tplMixins.map((tplMixin) => tplMixin.render && tplMixin.render.apply(this, args));
            tpls.forEach(collectTpl);
            return tplRender.apply(this, [map, ...args]);
        };
    },
};
const getTpl = function (tpl) {
    return typeof tpl === 'function' ? tpl() : tpl;
};
export const vIf = function (data, tplTrue, tplFalse) {
    return data ? getTpl(tplTrue) : getTpl(tplFalse);
};

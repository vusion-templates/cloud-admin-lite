<template>
    <u-crumb v-if="crumbs && crumbs.length">
        <template v-for="item in crumbs">
            <u-crumb-item v-bind="item" :key="item.title">{{ item.title }}</u-crumb-item>
        </template>
    </u-crumb>
</template>
<script>
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import { MSubscriber, MPublisher } from 'cloud-ui.vusion';
export default {
    mixins: [MSubscriber, MPublisher],
    data() {
        return {
            crumbs: [],
        };
    },
    subscribe: {
        'custom.crumb'(crumb) {
            this.crumbs = crumb;
        },
    },
    watch: {
        $route: {
            handler(to, from) {
                if (to.fullPath !== (from && from.fullPath)) {
                    const matched = to.matched || [];
                    const crumbs = [];
                    matched.forEach((route) => {
                        let crumb = route.meta && route.meta.crumb;
                        if (crumb) {
                            if (isFunction(crumb))
                                crumb = crumb(route, to, from);
                            else if (isObject(crumb))
                                crumb = Object.assign({}, crumb);
                            else if (typeof crumb === 'string')
                                crumb = { title: crumb };

                            if (!crumb.to && !crumb.readonly)
                                crumb.to = route.path;
                            if (crumb.readonly || crumb.to === to.path)
                                crumb.type = 'text';

                            if (crumb.title)
                                crumbs.push(crumb);
                        }
                    });
                    const last = crumbs[crumbs.length - 1];
                    if (last)
                        last.type = 'text';
                    this.$publish('custom.crumb', crumbs);
                }
            },
            immediate: true,
        },
    },
};
</script>

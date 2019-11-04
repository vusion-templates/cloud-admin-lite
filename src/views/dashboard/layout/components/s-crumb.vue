<template>
    <u-crumb v-if="crumbs.length > 1">
        <template v-for="item in crumbs">
            <u-crumb-item v-bind="item" :key="item.title">{{ item.title }}</u-crumb-item>
        </template>
    </u-crumb>
</template>
<script>
import _ from 'lodash';
export default {
    data() {
        return {
            crumbs: [],
        };
    },
    watch: {
        $route: {
            handler(to, from) {
                const matched = to.matched || [];

                this.crumbs = matched.map((route) => {
                    let crumb = route.meta && route.meta.crumb;
                    if (crumb) {
                        if (_.isFunction(crumb))
                            crumb = crumb(route, to, from);
                        else if (_.isPlainObject(crumb))
                            crumb = Object.assign({}, crumb);
                        else if (typeof crumb === 'string')
                            crumb = { title: crumb };
                        if (!crumb.to && !crumb.readonly)
                            crumb.to = route.path;
                        if (crumb.readonly || crumb.to === to.path)
                            crumb.type = 'text';
                    }
                    return crumb;
                }).filter((crumb) => crumb);
            },
            immediate: true,
        },
    },
};
</script>

<template>
    <component :is="rootName" collapsible>
        <template v-for="(group, index) in config">
            <u-sidebar-group @toggle="openParent($event)" v-if="group.children" :title="group.title" :key="group.title" :class="$style.group">
                <template v-for="(item, index2) in group.children">
                    <s-sidebar :class="$style.sub" v-if="item.subnav" :config="item.subnav" :key="index2"></s-sidebar>
                    <u-sidebar-item v-else :key="item.title" :active-rule="item.activeRule" :disabled="item.disabled" :to="item.to" :href="item.href" :target="item.href ? '_blank' : '_self'">
                        <slot name="item">
                            <i-icon :name="item.icon" v-if="item.icon"> </i-icon>{{ item.title }}
                        </slot>
                    </u-sidebar-item>
                </template>
            </u-sidebar-group>
            <u-sidebar-divider v-else-if="group === '|'" :key="index"></u-sidebar-divider>
            <u-sidebar-item v-else :key="group.title" :active-rule="group.activeRule" :disabled="group.disabled" :to="group.to" :href="group.href" :target="group.href ? '_blank' : '_self'">
                <i-icon :name="group.icon" v-if="group.icon"> </i-icon>{{ group.title }}</u-sidebar-item>
        </template>
    </component>
</template>
<script>
import { MEmitter } from 'cloud-ui.vusion';

export default {
    name: 's-sidebar',
    mixins: [MEmitter],
    props: {
        config: Array,
        isSub: { type: Boolean, default: false },
    },
    computed: {
        rootName() {
            return this.isSub ? 'div' : 'u-sidebar';
        },
    },
    methods: {
        openParent($event) {
            if ($event.expanded) {
                this.$contact('u-sidebar-group', (parentVM) => {
                    parentVM.toggle(true);
                });
            }
        },
    },
};
</script>
<style module>
.group[disabled] {
    cursor: not-allowed;
}

.sub {
    margin-left: 10px;
}
</style>

<template>
    <div>
        <u-info-list-group title="基本信息" column="3">
            <u-info-list-item label="名称">{{ detail.name }}</u-info-list-item>
            <u-info-list-item label="ID">{{ detail.id }}</u-info-list-item>
            <u-info-list-item label="时间">{{ detail.time }}</u-info-list-item>
        </u-info-list-group>
        <u-info-list-group title="基本信息" column="3">
            <u-info-list-item label="名称">{{ detail.name }}</u-info-list-item>
            <u-info-list-item label="ID">{{ detail.id }}</u-info-list-item>
            <u-info-list-item label="时间">{{ detail.time }}</u-info-list-item>
        </u-info-list-group>
    </div>
</template>
<script>
import { MSubscriber, MPublisher } from 'cloud-ui.vusion';
export default {
    mixins: [MSubscriber, MPublisher],
    subscribe: {
        'demo.detail'(detail) {
            this.detail = detail;
        },
    },
    data() {
        return {
            detail: {},
        };
    },
    watch: {
        $route: {
            handler(current, prev) {
                if (current.fullPath !== (prev && prev.fullPath)) {
                    this.$publish('custom.crumb', [
                        {
                            title: '自定义面包屑-1',
                            to: '/overview',
                        },
                        {
                            title: '自定义面包屑-2',
                            to: '/demo/form',
                        },
                        {
                            title: '当前页',
                            type: 'text',
                        },
                    ]);
                }
            },
            immediate: true,
        },
    },
};
</script>

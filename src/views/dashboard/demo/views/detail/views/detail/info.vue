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
import { MSubscriber } from 'cloud-ui.js';
export default {
    mixins: [MSubscriber],
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
};
</script>

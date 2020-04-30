<template>
    <div>
        <u-info-list-group title="基本信息" column="3">
            <u-info-list-item label="名称">名称</u-info-list-item>
        </u-info-list-group>
    </div>
</template>

<script>
import { MSubscriber } from 'cloud-ui.vusion';

export default {
    mixins: [MSubscriber],
    data() {
        return {
            instance: {
               
            },
        };
    },
    subscribe: {
        '{{ name }}.loadDetail'(instance) {
            this.instance = instance;
        },
    },
};
</script>

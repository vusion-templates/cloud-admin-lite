<template>
    <u-micro
        :slave-name="slaveName"
        :entries="entries">
    </u-micro>
</template>
<script>
import microMixin from '@/global/mixins/micro';
export default {
    mixins: [microMixin],
    data() {
        const slaveName = 'demo.cloud-admin';
        return {
            slaveName,
            entries: `${process.env.VUE_APP_MICRO_SERVER}/${slaveName}-latest.js?t=${(new Date() - 0)}`,
        };
    },
    methods: {

    },
};
</script>

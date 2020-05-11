<template>
    <u-micro
        :master-name="masterName"
        :slave-name="slaveName"
        :entries="entries">
    </u-micro>
</template>
<script>
import appConfig from '@/views/dashboard/app.config';
import microMixin from '@/global/mixins/micro';
export default {
    mixins: [microMixin],
    data() {
        return {
            masterName: appConfig.name,
            slaveName: 'demo.cloud-admin',
            entries: 'https://vusion-templates.github.io/cloud-admin/public/js/latest.js?t=' + (new Date() - 0),
            // entries: 'http://localhost:8830/latest.js?t=' + (new Date() - 0),
        };
    },
    methods: {

    },
};
</script>

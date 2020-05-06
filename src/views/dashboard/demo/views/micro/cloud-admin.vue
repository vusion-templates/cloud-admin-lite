<template>
    <u-micro
        :master-name="masterName"
        :slave-name="slaveName"
        :entries="entries">
    </u-micro>
</template>
<script>
import appConfig from '@/views/dashboard/app.config';
export default {
    data() {
        return {
            masterName: appConfig.name,
            slaveName: 'demo.cloud-admin',
            entries: {
                js: [
                    'https://vusion-templates.github.io/cloud-admin/public/js/micro.e67e8c09.js',
                    'https://vusion-templates.github.io/cloud-admin/public/js/vendors~dashboard.ccf7ee84.js',
                    'https://vusion-templates.github.io/cloud-admin/public/js/dashboard.f540b93a.js',
                ],
                css: [
                    'https://vusion-templates.github.io/cloud-admin/public/css/vendors~dashboard.400f4e33.css',
                    'https://vusion-templates.github.io/cloud-admin/public/css/dashboard.657da7e0.css',
                ],
            },
        };
    },
    methods: {

    },
};
</script>

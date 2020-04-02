<template>
    <component :is="layoutComponent">
        <template #head>
            <s-navbar :config="navbarConfig">
                <template #left>
                    <s-logo>{{ logo.sub }}</s-logo>
                </template>
                <template #right>
                    <s-navbar-right :user-info="userInfo"></s-navbar-right>
                </template>
            </s-navbar>
        </template>
        <template #side v-if="hasSideBar">
            <s-sidebar :config="sidebarConfig"></s-sidebar>
        </template>
        <template #default>
            <u-linear-layout direction="vertical" :class="$style.main" :no-side="!hasSideBar">
                <s-crumb :class="$style.crumb" :no-side="!hasSideBar"></s-crumb>
                <router-view></router-view>
            </u-linear-layout>
        </template>
    </component>
</template>

<script>
import moduleInfos from '../../modules';
import LDashboard from '@/global/layouts/l-dashboard.vue';
import SNavbarRight from '../components/s-navbar-right.vue';
export default {
    components: {
        LDashboard,
        SNavbarRight,
    },

    data() {
        return {
            logo: {
                sub: '模板',
            },
            userInfo: {
                username: 'username',
            },
            navbarConfig: [
                {
                    title: 'Cloud UI',
                    href:
                        'https://vusion.github.io/cloud-ui/components/quickstart',
                },
                {
                    title: 'Vusion 官网',
                    href: 'https://vusion.github.io',
                },
                '|',
                {
                    title: '模板文档',
                    href: 'https://vusion-templates.github.io/cloud-admin-site',
                },
                {
                    title: 'GitHub',
                    href:
                        'https://github.com/vusion-templates/cloud-admin-lite',
                },
            ],
            sidebarConfig: moduleInfos.sortedModules
                .filter(
                    (item) =>
                        item
                        && item.module
                        && item.exist !== false
                        && item.sidebar,
                )
                .map((item) => item.sidebar),
        };
    },

    computed: {
        layoutComponent() {
            return this.hasSideBar ? 'l-dashboard' : 'l-page';
        },

        hasSideBar() {
            return this.sidebarConfig && this.sidebarConfig.length;
        },
    },
};
</script>

<style module>
.crumb[no-side] {
    padding: 0 0 10px;
}
.main[no-side] {
    padding: 40px;
}</style>

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
import appConfig from '@/views/dashboard/app.config';
export default {
    components: {
        LDashboard,
        SNavbarRight,
    },
    data() {
        return {
            logo: {
                sub: appConfig.title,
            },
            userInfo: {
                username: 'username',
            },
        };
    },
    computed: {
        layoutComponent() {
            return this.hasSideBar ? 'l-dashboard' : 'l-page';
        },
        hasSideBar() {
            return this.sidebarConfig && this.sidebarConfig.length;
        },
        navbarConfig() {
            const userInfo = this.userInfo;
            return this.formatNavConfig(moduleInfos.navbar, 'navbar', !!userInfo);
        },
        sidebarConfig() {
            const userInfo = this.userInfo;
            return this.formatNavConfig(moduleInfos.sidebar, 'sidebar', !!userInfo);
        },
    },
    methods: {
        formatNavConfig(moduleList, navName, isLogin) {
            return moduleList
                .filter(
                    (item) =>
                        item
                        && (item.module ? (item.exist !== false && item[navName] && (isLogin ? true : (item.auth && item.auth.login) === false)) : true),
                ).filter((item, index, arr) => {
                    if (item === '|') {
                        if (index === 0) {
                            return false;
                        } else if (arr[index - 1] === '|') {
                            return false;
                        } else if (arr.length - 1 === index) {
                            return false;
                        }
                    }
                    return true;
                })
                .map((item) => (item.module ? item[navName] : item));
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

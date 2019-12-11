<template>
    <div>
        <div :class="$style.item">
            <u-badge corner dot :value="noticeCount">
                <u-link
                    :class="noticeActive ? $style.active : ''"
                    to="/notice"
                    title="通知">
                    <i-icon name="notice" :class="$style.icon"></i-icon>
                </u-link>
            </u-badge>
        </div>
        <u-navbar-dropdown style="margin-right: 10px;">
            <template #title>
                <u-avatar :src="src" :size="36" :class="$style.avatar"></u-avatar>
                <span :class="$style.username">{{ userInfo.username }}</span>
            </template>
            <template #default>
                <u-navbar-menu>
                    <u-navbar-menu-item to="/account/center">个人中心</u-navbar-menu-item>
                    <u-navbar-menu-item @click="logout">安全退出</u-navbar-menu-item>
                </u-navbar-menu>
            </template>
        </u-navbar-dropdown>
    </div>
</template>
<script>
import avatar from '../assets/avatar.png';
export default {
    props: {
        userInfo: Object,
    },
    data() {
        return {
            src: avatar,
            noticeCount: 6,
            noticeActive: false,
        };
    },

    watch: {
        $route: {
            immediate: true,
            handler($route) {
                this.noticeActive = $route.path.startsWith('/notice');
            },
        },
    },
    methods: {
        logout() {
            this.$confirm(`确定退出登录吗？`, '提示').then(() => {
                location.reload();
            });
        },
    },
};
</script>
<style module>
.avatar {
    /* (64px-36px)/2 */
    margin-top: 12px;
    margin-bottom: 12px;
    margin-right: 10px;
}
.username {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
    color: #fff;
}
.icon {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
}
.item {
    display: inline-block;
    vertical-align: top;
    width: 64px;
    text-align: center;
    line-height: 64px;
}
.item .icon {
    font-size: 22px;
    line-height: 22px;
    color: #9ba4ad;
}

.active[class] span{
    color: #67aaf5;
}

</style>

<template>
    <u-desc-list>
        <u-desc-list-group title="安全信息">
            <u-desc-list-item label="安全手机">138****8888 <u-link @click="updateSecurityMobile()">修改</u-link></u-desc-list-item>
            <u-desc-list-item label="安全邮箱">dev****p@163.com <u-link @click="updateSecurityEmail()">修改</u-link></u-desc-list-item>
        </u-desc-list-group>
        <u-desc-list-group title="账号安全">
            <u-desc-list-item label="登录密码">
                <u-link @click="updatePassword()">修改</u-link>
            </u-desc-list-item>
        </u-desc-list-group>
    </u-desc-list>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        updateSecurityMobile() {
            this.$toast.show('修改安全手机');
        },
        updateSecurityEmail() {
            this.$toast.show('修改安全邮箱');
        },
        updatePassword() {
            this.$toast.show('修改登录密码');
        },
    },
};
</script>
<style module>

</style>

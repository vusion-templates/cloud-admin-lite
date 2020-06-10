<template>
    <div>
        <u-tabs router>
            <u-tab title="个人中心" to="/account/center"></u-tab>
            <u-tab title="个人设置" to="/account/setting"></u-tab>
            <u-tab title="安全设置" to="/account/security"></u-tab>
        </u-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
};
</script>

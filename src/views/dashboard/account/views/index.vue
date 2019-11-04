<template>
    <div>
        <u-tabs router>
            <u-tab v-for="tab in tabs" :title="tab.title" :to="tab.to" :key="tab.to"></u-tab>
        </u-tabs>
        <router-view></router-view>
    </div>

</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    title: '个人中心',
                    to: '/account/center',
                },
                {
                    title: '个人设置',
                    to: '/account/setting',
                },
                {
                    title: '安全设置',
                    to: '/account/security',
                },
            ],
        };
    },
};
</script>
<style module>

</style>

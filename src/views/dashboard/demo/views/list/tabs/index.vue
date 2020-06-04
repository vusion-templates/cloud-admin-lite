<template>
    <div>
        <u-page-summary>这里是 tab 列表，有个 tab 下面有一个不同的页面</u-page-summary>
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
                    title: '列表页',
                    to: '/demo/list/tabs/basic',
                },
                {
                    title: '本地分页',
                    to: '/demo/list/tabs/localList',
                },
                {
                    title: '列表页(无分页)',
                    to: '/demo/list/tabs/noPageList',
                },

            ],
        };
    },
};
</script>

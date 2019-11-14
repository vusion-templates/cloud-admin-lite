<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-sum>
            从远端获取所有数据，在本地进行分页处理，点击分页的时候不会发送请求，仅在刷新时会发送请求。
        </u-page-sum>
        <u-linear-layout>
            <u-button icon="create" color="primary" @click="createItem">创建实例(方法)</u-button>
            <u-button icon="create" color="primary" to="/demo/form/basic">创建实例(路由)</u-button>
            <u-button square icon="refresh" @click="refresh"></u-button>
        </u-linear-layout>
        <u-table-view :class="$style.tableView" :data="list" :loading="loading" value-field="name" :values="selected">
            <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
            <u-table-view-column title="消息标题">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.name }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="时间">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.time | dateFormat }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="操作">
                <template slot="cell" slot-scope="scope">
                    <u-linear-layout>
                        <u-link :to="{name: 'demo.detail', query: {id: scope.item.ch_name}}">
                            查看详情
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <div class="pager">
            <u-linear-layout direction="vertical">
                <u-combo-pagination show-total show-sizer show-jumper
                    :page-size-options="limitList" :total-items="total" :page-size.sync="limit"
                    :total="totalPage" :page="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-combo-pagination>
            </u-linear-layout>
        </div>
        <u-footbar :position="batchBtnPos">
            <u-linear-layout>
                <span>已选择 {{ selected.length }} 条</span>
                <u-button :disabled="!allowBatchDelete" @click="batchDelete">删除</u-button>
            </u-linear-layout>
        </u-footbar>
    </u-linear-layout>
</template>
<script>
import page from '@/global/mixins/page/page';
import noticeService from '../services/index';
export default {
    mixins: [page],
    data() {
        return {
            localPage: true,
            selected: [],
        };
    },
    computed: {
        allowBatchDelete() {
            return this.selected && this.selected.length;
        },
        batchBtnPos() {
            const pos = this.selected && this.selected.length > 0 ? 'auto' : 'static';
            return pos;
        },
    },
    watch: {
        list() {
            this.selected = [];
        },
    },
    methods: {
        loadList() {
            return noticeService.loadList().then((result) => {
                this.originList = result;
                this.total = result.length;
            });
        },
        batchDelete() {
            this.$confirm(`确认删除 ${this.selected.join(',')} 实例吗？`, '删除确认').then(() => {
                this.refresh();
            }, () => {
                console.log('取消删除');
            });
        },
        createItem() {
            this.$toast.show('创建实例');
        },
    },
};
</script>
<style module>
.tableView  {

}
</style>

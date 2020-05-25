<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            系统更新的最新消息。相关描述可以查看<u-link href="https://vusion.github.io/cloud-ui/components/u-actions">链接</u-link>
        </u-page-summary>
        <u-linear-layout>
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
                        <u-link :to="{ path: '/notice/detail', query: {id: scope.item.ch_name}}">
                            查看详情
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <div>
            <u-linear-layout direction="vertical">
                <u-pagination show-total show-sizer show-jumper
                    :page-size-options="limitList" :total-items="total" :page-size.sync="limit"
                    :page="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-pagination>
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
import noticeService from '../service';
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
            const page = this.getPage();
            return noticeService.loadList({
                query: {
                    page: page.pageNum,
                },
            }).then((result) => {
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
    },
};
</script>
<style module>
.tableView {
    vertical-align: middle;
}
</style>

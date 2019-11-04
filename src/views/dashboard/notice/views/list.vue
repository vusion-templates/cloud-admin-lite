<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-sum>
            系统更新的最新消息。相关描述可以查看<u-link href="https://vusion.github.io/cloud-ui/components/u-actions">链接</u-link>
        </u-page-sum>
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
        <div class="pager">
            <u-linear-layout direction="vertical">
                <u-combo-pagination show-total show-sizer show-jumper
                    :limit-list="limitList" :total-items="total" :limit="form.limit"
                    :total="totalPage" :page="form.page" @change="changePage($event)" @change-page-size="changeLimit">
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
            const page = this.getFormForPage();
            return noticeService.list({
                url: {
                    query: {
                        page: page.pageNum,
                    },
                },
            }).then((res) => {
                const result = [];
                res.data.result.forEach((item) => {
                    item.channellist.forEach((channel) => {
                        channel.thumb = channel.thumb || channel.avatar;
                        channel.time = new Date() - 0;
                        channel.cate_sname = channel.cate_sname || item.title;
                    });
                    result.push(...item.channellist);
                });
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

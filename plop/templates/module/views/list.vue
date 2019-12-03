<template>
<u-linear-layout direction="vertical" gap="small">
        <u-page-sum>
            系统更新的最新消息。相关描述可以查看
        </u-page-sum>
        <u-linear-layout>
            <u-button color="primary" to="/{{ name }}/create">创建</u-button>
            <u-button square icon="refresh" @click="refresh"></u-button>
        </u-linear-layout>
        <u-table-view :class="$style.tableView" :data="list" :loading="loading">
            <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
            <u-table-view-column title="名字">
                <template slot="cell" slot-scope="{ item }">
                    名字
                </template>
            </u-table-view-column>
            <u-table-view-column title="操作">
                <template slot="cell" slot-scope="scope">
                    <u-linear-layout>
                        <u-link :to="{ path: '/{{ name }}/detail', query: {id: scope.item.id}}">
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
    </u-linear-layout>
</template>

<script>
import page from '@/global/mixins/page/page';
import {{ name }}Service from '../service';

export default {
    mixins: [page],
    data() {
        return {
            
        };
    },
    methods: {
        loadList() {
            const page = this.getPage();
            return {{name}}Service.loadList({
                query: {
                    page: page.pageNum,
                    pageSize: page.pageSize,
                },
            }).then((result) => {
                this.list = result;
                this.total = result.length;
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

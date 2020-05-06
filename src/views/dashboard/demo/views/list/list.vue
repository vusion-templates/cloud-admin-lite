<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            常见的列表页
        </u-page-summary>
        <u-linear-layout justify="space-between">
            <u-linear-layout>
                <u-button icon="create" color="primary" @click="createItem">创建实例(方法)</u-button>
                <u-button icon="create" color="primary" to="/demo/form/basic">创建实例(路由)</u-button>
                <u-button square icon="refresh" @click="refresh"></u-button>
            </u-linear-layout>
            <u-linear-layout type="flex" justify="end">
                <u-button color="primary" to="/demo/list/localList">本地分页</u-button>
            </u-linear-layout>
        </u-linear-layout>
        <u-linear-layout type="flex" justify="end">
            <u-search v-model="form.search" placeholder="搜索"></u-search>
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
                            查看分类
                        </u-link>
                        <u-link @click="editDesc(scope.item)">
                            修改描述
                        </u-link>
                        <u-link @click="deleteItem">
                            删除
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <div>
            <u-linear-layout direction="vertical">
                <u-combo-pagination show-total show-sizer show-jumper
                    :page-size-options="limitList" :total-items="total" :page-size.sync="limit"
                    :page="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-combo-pagination>
            </u-linear-layout>
        </div>
        <u-footbar :position="batchBtnPos">
            <u-linear-layout>
                <span>已选择 {{ selected.length }} 条</span>
                <u-button :disabled="!allowBatchDelete" @click="batchDelete">删除</u-button>
            </u-linear-layout>
        </u-footbar>
        <u-edit-desc :modal-name="modalName"></u-edit-desc>
    </u-linear-layout>
</template>
<script>
import page from '@/global/mixins/page/page';
import noticeService from '@/views/dashboard/demo/service';
import UEditDesc from './components/u-edit-desc.vue';
export default {
    components: {
        UEditDesc,
    },
    mixins: [page],
    data() {
        return {
            modalName: 'demo.list.editDesc' + (new Date() - 0),
            selected: [],
            form: {
                search: '',
            },
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
        'form.search'() {
            this.resetPage();
            this.refresh();
        },
    },
    methods: {
        loadList() {
            const page = this.getPage();
            return noticeService.loadList({
                query: {
                    page: page.pageNum,
                    search: this.form.search,
                },
            }).then((result) => {
                if (this.form.search) {
                    result = result.filter((item) => JSON.stringify(item).includes(this.form.search));
                }
                const { pageNum, pageSize } = this.getPage();
                this.list = result.slice((pageNum - 1) * pageSize, pageNum * pageSize);
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
        deleteItem() {
            this.$confirm('确认删除该实例吗？', '确认删除').then(() => {
                this.$toast.show('开始删除');
            }, () => {
                this.$toast.show('取消删除');
            });
        },
        editDesc(detail) {
            this.$modal.show(this.modalName, {
                detail,
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

<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            常见的列表页(无分页)
        </u-page-summary>
        <u-linear-layout justify="space-between">
            <u-linear-layout display="inline">
                <u-button icon="create" color="primary" @click="createItem">创建实例(方法)</u-button>
                <u-button icon="create" color="primary" to="/demo/form/basic">创建实例(路由)</u-button>
                <u-button square icon="refresh" @click="refresh"></u-button>
            </u-linear-layout>
            <u-linear-layout type="flex" justify="end">
                <u-search v-model="form.search" placeholder="搜索"></u-search>
            </u-linear-layout>
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
                        <u-link @click="deleteItem">
                            删除
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
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
import noticeService from '@/views/dashboard/demo/service';
export default {
    mixins: [page],
    data() {
        return {
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
            return noticeService.loadList({
                query: {
                    search: this.form.search,
                },
            }).then((result) => {
                if (this.form.search) {
                    result = result.filter((item) => JSON.stringify(item).includes(this.form.search));
                }
                this.list = result;
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
    },
};
</script>
<style module>
.tableView  {
    vertical-align: middle;
}
</style>

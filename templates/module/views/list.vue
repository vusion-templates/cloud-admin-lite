<template>
    <u-linear-layout direction="vertical">
        <div>这里汇聚了你在网易云基础服务上的所有样本实例。<u-link>如何创建样本实例？</u-link></div>
        <u-linear-layout type="flex" justify="space-between">
            <u-linear-layout>
                <u-button color="primary" icon="create" to="/sample/create">创建样本</u-button>
                <u-button icon="refresh" square @click="$refs.tableView.reload()"></u-button>
            </u-linear-layout>
            <u-input v-model="keyword" placeholder="输入名称过滤列表" style="width: 196px;"></u-input>
        </u-linear-layout>
        <u-table-view ref="tableView" :data-source="load" :filtering="{ Name: ['includes', keyword] }">
            <u-table-view-column width="240" title="名称" field="Name"></u-table-view-column>
            <u-table-view-column title="InstanceId" field="InstanceId"></u-table-view-column>
            <u-table-view-column width="120" title="可用区" field="AzName">
                <template #cell="{ value }">
                    <div>可用区 {{ value.toUpperCase() }}</div>
                </template>
            </u-table-view-column>
            <u-table-view-column width="120" title="运行状态">
                <template #cell="{ item }">
                    <u-status-icon v-if="item.StatusInfo" :name="item.StatusInfo.icon">{{ item.StatusInfo.label }}</u-status-icon>
                </template>
            </u-table-view-column>
            <u-table-view-column width="200" title="创建时间" field="CreateAt" formatter="placeholder | date"></u-table-view-column>
            <u-table-view-column width="200" title="操作">
                <template #cell="{ item }">
                    <u-actions>
                        <u-action :to="{ path: '/sample/detail', query: { id: item.InstanceId } }">详情</u-action>
                        <u-action :to="{ path: '/sample/setting', query: { id: item.InstanceId } }">设置</u-action>
                        <u-action @click="deleteItem(item.InstanceId)">删除</u-action>
                    </u-actions>
                </template>
            </u-table-view-column>
        </u-table-view>
    <!-- <u-confirm ref="confirm"></u-confirm> -->
    </u-linear-layout>
</template>

<script>
import Vue from 'vue';
import sampleService from '../service';

export default {
    data() {
        return {
            keyword: '',
        };
    },
    methods: {
        load() {
            return sampleService.loadList().then(({ data }) => data);
        },
        deleteItem(id) {
            this.$confirm('是否删除该样本？', '提示').then(() => sampleService.delete({
                url: {
                    body: {
                        InstanceId: id,
                    },
                },
            })).then(() => {
                this.$refs.tableView.reload();
            });
        },
    },
};
</script>

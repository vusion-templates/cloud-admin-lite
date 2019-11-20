<template>
    <div>
        <u-head-card :title="instance.Name">
            <div slot="info">
                <ul>
                    <li><label>公网 IP：</label>{{ instance.Ip }}</li>
                    <li><label>公网带宽：</label>{{ instance.Bandwidth }} Mbs</li>
                    <li><label>状态：</label>{{ instance.StatusInfo.label }}</li>
                    <li><label>更新时间：</label>{{ instance.CreateAt | dateFormat('yyyy-MM-dd HH:mm:ss') }}</li>
                </ul>
            </div>
        </u-head-card>
        <div>
            <u-tabs router>
                <u-tab title="详细信息" :to="{ path: '/sample/detail/info', query: { id: $route.query.id } }"></u-tab>
                <u-tab title="性能监控" :to="{ path: '/sample/detail/monitor', query: { id: $route.query.id } }"></u-tab>
                <u-tab title="操作日志" :to="{ path: '/sample/detail/logs', query: { id: $route.query.id } }"></u-tab>
            </u-tabs>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import sampleService from '../../service';
import { MPublisher } from 'cloud-ui.vusion/dist';

export default {
    mixins: [MPublisher],
    data() {
        return {
            instance: {
                StatusInfo: {},
            },
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            sampleService.loadDetail({
                url: {
                    query: {
                        InstanceId: this.$route.query.id,
                    },
                },
            }).then(({ data }) => this.instance = data.data);
        },
    },
    publish: {
        'sample.loadDetail': 'instance',
    },
};
</script>

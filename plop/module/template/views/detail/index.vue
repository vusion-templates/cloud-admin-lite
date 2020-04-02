<template>
    <div>
        <u-head-card :title="instance.Name">
            <div slot="info">
                <ul>
                    <li><label>公网 IP：</label>127.0.0.1</li>
                </ul>
            </div>
        </u-head-card>
        <div>
            <u-tabs router>
                <u-tab title="详细信息" :to="{ path: '/{{ name }}/detail/info', query: { id: $route.query.id } }"></u-tab>
            </u-tabs>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import {{ name }}Service from '../../service';
import { MPublisher } from 'cloud-ui.vusion';

export default {
    mixins: [MPublisher],
    data() {
        return {
            instance: {
                
            },
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            {{ name }}Service.loadDetail({
                url: {
                    query: {
                        InstanceId: this.$route.query.id,
                    },
                },
            }).then(({ data }) => this.instance = data.data);
        },
    },
    publish: {
        '{{ name }}.loadDetail': 'instance',
    },
};
</script>

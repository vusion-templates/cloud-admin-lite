<template>
    <div>
        <u-info-list-group title="基本信息" column="3">
            <u-info-list-item label="名称">{{ instance.Name }}</u-info-list-item>
            <u-info-list-item label="UUID">{{ instance.InstanceId }}</u-info-list-item>
            <u-info-list-item label="可用区">{{ AzText[instance.AzName] }}</u-info-list-item>
            <u-info-list-item label="状态">
                <u-status-icon :name="instance.StatusInfo.icon">{{ instance.StatusInfo.label }}</u-status-icon>
            </u-info-list-item>
            <u-info-list-item label="创建时间">{{ instance.CreateAt | timeFormat }}</u-info-list-item>
            <u-info-list-item label="实例类型">{{ NetworkText[instance.Network] }}</u-info-list-item>
            <u-info-list-item label="描述" column="1">{{ instance.Description || '-' }}</u-info-list-item>
        </u-info-list-group>
    </div>
</template>

<script>
import { MSubscriber } from 'cloud-ui.vusion/dist';

export default {
    mixins: [MSubscriber],
    data() {
        return {
            instance: {
                StatusInfo: {},
            },
            AzText: {
                a: '可用区 A',
                b: '可用区 B',
            },
            NetworkText: {
                public: '公网',
                private: '私有网',
            },
        };
    },
    subscribe: {
        'sample.loadDetail'(instance) {
            this.instance = instance;
        },
    },
};
</script>

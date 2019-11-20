<template>
    <u-linear-layout direction="vertical">
        <u-form gap="large" @validate="valid = $event.valid">
            <u-form-item label="可用区">
                <u-capsules v-model="instance.AzName">
                    <u-capsule v-for="azItem in azList" v-if="azItem.value === instance.AzName" :key="azItem.value" :value="azItem.value">{{ azItem.text }}</u-capsule>
                </u-capsules>
            </u-form-item>
            <u-form-item label="网络" required layout="block">
                <u-form-table>
                    <thead><tr><th>VPC</th><th>子网</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>
                                <u-select size="huge medium" v-if="!vpcs.length" key="noVpc" placeholder="暂无可选 VPC" disabled></u-select>
                                <u-select disabled size="huge medium" v-else v-model="instance.VpcId" @select="loadSubnets($event.value)" key="vpc">
                                    <u-select-item v-for="vpc in vpcs" :key="vpc.Id" :value="vpc.Id" :flag="vpc.IsDefault ? '默认 VPC' : undefined">
                                        {{ vpc.Name }}
                                    </u-select-item>
                                </u-select>
                            </td>
                            <td style="display: relative;">
                                <u-select size="huge medium" v-if="classic && !subnets.length" disabled key="classicSelect" placeholder="-"></u-select>
                                <u-select size="huge medium" v-else-if="!classic && !subnets.length" disabled key="emptySelect" placeholder="暂无可选择的子网"></u-select>
                                <u-select v-else disabled size="huge medium" v-model="instance.SubnetId" key="select">
                                    <u-select-item v-for="subnet in subnets" :key="subnet.Id" :value="subnet.Id">
                                        {{ subnet.Name }}
                                    </u-select-item>
                                </u-select>
                            </td>
                        </tr>
                    </tbody>
                </u-form-table>
            </u-form-item>
            <u-form-item label="实例类型">
                <u-capsules v-model="instance.Network">
                    <u-capsule v-for="network in networks" v-if="network.value === instance.Network" :key="network.value" :value="network.value">{{ network.text }}</u-capsule>
                </u-capsules>
            </u-form-item>
            <u-form-item label="名称" required>
                <u-input v-model="model.Name" size="huge" maxlength="24" placeholder="1-24位小写字母、数字或中划线组成，以字母开头，字母或数字结尾"></u-input>
            </u-form-item>
            <u-form-item label="描述">
                <u-input v-model="model.Description" size="huge"></u-input>
            </u-form-item>
            <u-form-item>
                <u-button color="primary"
                    :disabled="!canSubmit || submitting"
                    :icon="submitting ? 'loading' : ''" @click="submit()">
                    提交设置
                </u-button>
            </u-form-item>
        </u-form>
    </u-linear-layout>
</template>

<script>
import sampleService from '../service';

export default {
    data() {
        return {
            model: {
                Name: '',
                Description: '',
            },
            instance: {
                StatusInfo: {},
            },
            azList: [{ text: '可用区 A', value: 'a' }, { text: '可用区 B', value: 'b' }],
            networks: [{ text: '公网', value: 'public' }, { text: '私有网', value: 'private' }],
            vpcs: [],
            subnets: [],
            classic: false,
            valid: false,
            submitting: false,
        };
    },
    computed: {
        canSubmit() {
            return this.model.Name !== this.instance.Name || this.model.Description !== this.instance.Description;
        },
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            return sampleService.loadDetail({
                url: {
                    query: {
                        InstanceId: this.$route.query.id,
                    },
                },
            }).then((info) => {
                this.instance = info.data.data;
                this.model.InstanceId = this.instance.InstanceId;
                this.model.Name = this.instance.Name;
                this.model.Description = this.instance.Description;
            });
        },
        submit() {
            return sampleService.update({
                url: {
                    body: this.model,
                },
            }).then(() => this.$router.push('/sample'));
        },
    },
};
</script>

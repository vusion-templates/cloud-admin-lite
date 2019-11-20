<template>
    <u-linear-layout direction="vertical">
        <u-form gap="large" @validate="valid = $event.valid">
            <u-form-item label="计费方式">
                <u-radios v-model="model.ChargeType">
                    <u-radio :label="0">包年包月</u-radio>
                    <u-radio :label="1">按量付费</u-radio>
                </u-radios>
            </u-form-item>
            <u-form-item label="可用区">
                <u-capsules v-model="model.AzName">
                    <u-capsule v-for="azItem in azList" :key="azItem.value" :value="azItem.value">{{ azItem.text }}</u-capsule>
                </u-capsules>
            </u-form-item>
            <u-form-item label="网络" required layout="block">
                <u-form-table>
                    <thead><tr><th>VPC</th><th>子网</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>
                                <u-select size="huge medium" v-if="!vpcs.length" key="noVpc" placeholder="暂无可选 VPC" disabled></u-select>
                                <u-select :disabled="disabled" size="huge medium" v-else v-model="model.VpcId" @select="loadSubnets($event.value)" key="vpc">
                                    <u-select-item v-for="vpc in vpcs" :key="vpc.Id" :value="vpc.Id" :flag="vpc.IsDefault ? '默认 VPC' : undefined">
                                        {{ vpc.Name }}
                                    </u-select-item>
                                </u-select>
                            </td>
                            <td>
                                <u-select size="huge medium" v-if="classic && !subnets.length" disabled key="classicSelect" placeholder="-"></u-select>
                                <u-select size="huge medium" v-else-if="!classic && !subnets.length" disabled key="emptySelect" placeholder="暂无可选择的子网"></u-select>
                                <u-select v-else size="huge medium" v-model="model.SubnetId" key="select">
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
                <u-capsules v-model="model.Network">
                    <u-capsule v-for="network in networks" :key="network.value" :value="network.value">{{ network.text }}</u-capsule>
                </u-capsules>
            </u-form-item>
            <u-form-item label="名称" required :rules="rules.Name">
                <u-input v-model="model.Name" size="huge" maxlength="24" placeholder="1-24位小写字母、数字或中划线组成，以字母开头，字母或数字结尾"></u-input>
            </u-form-item>
            <u-form-item label="描述">
                <u-input v-model="model.Description" size="huge"></u-input>
            </u-form-item>
            <u-form-item>
                <u-button color="primary"
                    :disabled="!canSubmit || submitting"
                    :icon="submitting ? 'loading' : ''" @click="submit()">
                    立即创建
                </u-button>
            </u-form-item>
        </u-form>
    </u-linear-layout>
</template>

<script>
import sampleService from '../service';
// import vpcService from '../vpc/service';

export default {
    data() {
        return {
            model: {
                ChargeType: 1,
                AzName: 'b',
                Network: 'public',
                Name: '',
                Description: '',
                VpcId: '',
                SubnetId: '',
            },
            azList: [{ text: '可用区 A', value: 'a' }, { text: '可用区 B', value: 'b' }],
            networks: [{ text: '公网', value: 'public' }, { text: '私有网', value: 'private' }],
            vpcs: [],
            subnets: [],
            classic: false,
            valid: false,
            submitting: false,
            rules: {
                Name: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入名称' },
                    { type: 'string', min: 1, max: 24, pattern: /^[a-z0-9-]+$/, trigger: 'input+blur', message: '1-24位小写字母、数字或中划线组成' },
                    { type: 'string', min: 1, max: 24, pattern: /^[a-z]/, trigger: 'input+blur', message: '请以字母开头' },
                    { type: 'string', min: 1, max: 24, pattern: /[a-z0-9]$/, trigger: 'input+blur', message: '请以字母或数字结尾' },
                ],
            },
        };
    },
    computed: {
        canSubmit() {
            return this.model.Name.trim() && this.valid;
        },
        disabled() {
            return false;
        },
    },
    methods: {
        submit() {
            return sampleService.create({
                url: {
                    body: this.model,
                },
            }).then(() => this.$router.push('/sample'));
        },
    },
};
</script>

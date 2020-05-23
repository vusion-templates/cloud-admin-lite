<template>
    <u-linear-layout direction="vertical">
        <u-form gap="large" @validate="valid = $event.valid">
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
import {{ name }}Service from '../service';

export default {
    data() {
        return {
            model: {
                Name: '',
                Description: '',
            },
            instance: {},
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
            return {{ name }}Service.loadDetail({
                url: {
                    query: {
                        InstanceId: this.$route.query.id,
                    },
                },
            }).then((info) => {
                const instance = this.instance = info.data.data;
                this.model.InstanceId = instance.InstanceId;
                this.model.Name = instance.Name;
                this.model.Description = instance.Description;
            });
        },
        submit() {
            return {{ name }}Service.update({
                url: {
                    body: this.model,
                },
            }).then(() => this.$router.push('/{{ name }}'));
        },
    },
};
</script>

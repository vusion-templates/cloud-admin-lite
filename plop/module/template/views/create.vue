<template>
    <u-linear-layout direction="vertical">
        <u-form gap="large" @validate="valid = $event.valid">
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
import {{ name }}Service from '../service';

export default {
    data() {
        return {
            model: {
                Name: '',
                Description: '',
            },
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
            return this.valid;
        },
    },
    methods: {
        submit() {
            return {{ name }}Service.create({
                url: {
                    body: this.model,
                },
            }).then(() => this.$router.push('/{{ name }}'));
        },
    },
};
</script>

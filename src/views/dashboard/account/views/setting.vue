<template>
    <u-form gap="large">
        <u-form-item label="联系方式" required>
            <u-input v-model="model.phone" size="huge"></u-input>
        </u-form-item>
        <u-form-item>
            <u-button color="primary" @click="submit()">立即提交</u-button>
        </u-form-item>
    </u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                area: undefined,
                street: '',
                phone: '',
            },
            currentNav: 'A',
        };
    },
    methods: {
        submit() {
            // todo
        },
    },
};
</script>
<style module>

</style>

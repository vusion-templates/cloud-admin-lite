<template>
    <u-input :size="size"
        search="left"
        v-model="searchInner"
        :placeholder="placeholder"
        @blur="()=>search = searchInner"
        @keyup.enter="() => search = searchInner"
        @input="($event) => searchInner = $event"></u-input>
</template>

<style module>
</style>

<script>
export default {
    name: 'u-search',
    props: {
        name: String,
        placeholder: String, // 输入框的 placeholder
        size: {
            type: String,
            default: 'medium',
        }, // 输入框的大小
        value: String, // 输入框的默认值
    },
    data() {
        const value = this.value || '';
        return {
            searchInner: value,
            search: value,
        };
    },
    watch: {
        search(search) {
            this.$emit('input', search);
        },
        value(value) {
            this.search = this.searchInner = value;
        },
    },
};
</script>

<template>
    <div :class="$style.root">
        <slot></slot>
    </div>
</template>

<style module>
.root{
    margin: 0 0 20px 0;
}
.root p{
    line-height: 20px;
    font-size: 14px;
    color: #666;
    margin: 0px;
}
.root a{
    color: #5494db;
    text-decoration: none;
}
</style>

<script>
export default {
    name: 'u-page-summary',
};
</script>

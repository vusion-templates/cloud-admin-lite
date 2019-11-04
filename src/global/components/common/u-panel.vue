<template>
    <div :class="$style.root">
        <div :class="$style.head">
            <h3 :class="$style.title">{{ title }}</h3>
        </div>
        <div :class="$style.body"><slot></slot></div>
        <div :class="$style.foot"></div>
    </div>
</template>

<style module>

.root {
    width: 100%;
    height: 320px;
    box-shadow: 0 1px 15px rgba(0,0,0,0.1);
    border-radius: 3px;
}

.head {
    padding: 20px;
    padding-bottom: 10px;
}

.title {
    color: #333;
    font-size: 16px;
    margin: 0;
}
</style>

<script>
export default {
    name: 'u-panel',
    props: {
        title: String,
    },
};
</script>

<template>
    <div :class="$style.root">
        <slot></slot>
    </div>
</template>

<style module>
.root {
    width: 100%;
    height: 120px;
    border-radius: 3px;
    padding: 30px;
    line-height: 60px;
    background: white;
    box-shadow: 0 1px 15px rgba(255,255,255,0.25);
}

.root[color="blue"] {
    background: #5182ed;
    color: white;
    box-shadow: 0 1px 15px rgba(76,132,255,0.25);
}

.root[color="green"] {
    background: #7dbd5c;
    color: white;
    box-shadow: 0 1px 15px rgba(119,196,80,0.3);
}

.root[color="purple"] {
    background: #7877d4;
    color: white;
    box-shadow: 0 1px 15px rgba(120,119,212,0.3);
}

.root[color="gray"] {
    background: #607d8b;
    color: white;
    box-shadow: 0 1px 15px rgba(96,125,139,0.3);
}
</style>

<script>
export default {
    name: 'u-portlet',
};
</script>

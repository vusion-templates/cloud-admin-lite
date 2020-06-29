<template>
    <div :class="$style.root">
        <template v-if="type === 'text'">
            <span :class="$style.text">
                <slot></slot>
            </span>
        </template>
        <template v-else>
            <a :class="$style.icon" v-bind="$attrs"></a>
            <span v-if="$slots.default" :class="$style.divider"></span>
            <span v-if="$slots.default" :class="$style.sub">
                <slot></slot>
            </span>
        </template>
    </div>
</template>
<script>
export default {
    name: 's-logo',
    props: {
        type: { type: String, default: 'text' },
    },
};

</script>
<style module>
.root {
    display: flex;
    align-items: center;
    width: var(--sidebar-width);
    height: var(--navbar-height);
    color: white;
}

/* Default Logo */
.root .icon {
    display: inline-block;
    vertical-align: middle;
    width: 114px;
    height: 64px;
    background: url('./logo-163yun-white.svg') 10px 0 no-repeat;
}

.divider {
    margin: 0 1em;
    border-left: 1px solid white;
    height: 18px;
}

.sub {
    font-size: 16px;
    color: white;
    vertical-align: -1px;
}

.text {
    padding-left: 20px;
    font-size: 20px;
}
</style>

<template>
    <div :class="$style.container">
        <div v-show="loading">
            <u-loading size="large"></u-loading>
        </div>
        <div :class="$style.wrap"
            v-html="renderDom || defaultDom" v-show="!loading">
        </div>
    </div>
</template>
<script>
import micro from 'vusion-micro';
import { v4 as uuidv4 } from 'uuid';
import merge from 'lodash/merge';
export default {
    name: 'u-micro',
    props: {
        done: {
            type: Boolean,
            default: true,
        },
        renderDom: {
            type: String,
        },
        config: Object,
        entries: [Object, String],
        masterName: {
            type: String,
            required: true,
        },
        slaveName: {
            type: String,
            required: true,
        },
    },
    data() {
        const nodeId = 'micro-' + uuidv4().replace(/-/g, '');
        const last = this.$route.matched[this.$route.matched.length - 1];
        const prefix = (this.$router.options.base + last.path.replace('**', '')).replace(/\/$/, '');
        return {
            prefix,
            nodeId,
            domReady: false,
            defaultDom: `<div id="${nodeId}"></div>`,
            loading: true,
        };
    },
    watch: {
        done: {
            handler(done) {
                this.start();
            },
            immediate: true,
        },
        entries: {
            handler(entries) {
                this.loadEntries(entries);
            },
            immediate: true,
        },
    },
    mounted() {
        this.domReady = true;
        this.start();
    },
    methods: {
        loadEntries(entries) {
            micro.loadEntries(entries, this.masterName, this.slaveName).then((entries) => {
                this.registerApp(entries);
            });
        },
        getConfig() {
            const location = window.location;
            const pathname = location.pathname;
            const activePath = pathname;
            return merge({
                urlRule: [activePath],
                customProps: {
                    node: '#' + this.nodeId,
                    prefix: this.prefix,
                },
            }, this.config);
        },
        registerApp(entries) {
            micro.registerApp({
                name: this.slaveName,
                entries,
                ...this.getConfig(),
            });
            this.loading = false;
            this.start();
        },
        start() {
            if (!this.inited && this.done && this.domReady && !this.loading) {
                this.inited = true;
                this.$nextTick(() => {
                    micro.start();
                    if (this.$route.query._m) {
                        this.$router.push(this.$route.query._m);
                    }
                });
            }
        },
    },
};
</script>
<style module>
    .container {
        position: absolute;
        top: 80px;
        bottom: 0;
        left: 40px;
        right: 40px;
    }
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>

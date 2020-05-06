<template>
    <div v-if="loading">
        <u-loading size="large">
        </u-loading>
    </div>
    <div :class="$style.container" :key="$route.path"
        v-html="renderDom || defaultDom" v-else>

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
        entries: Object,
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
        return {
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
            if (!entries || !Object.keys(entries)) {
                micro.getEntries(this.masterName).then((appEntries) => {
                    const entries = appEntries.find((item) => item.name === this.slaveName);
                    this.registerApp(entries);
                });
            } else {
                const micro = window.micro = window.micro || {};
                const microConfig = micro.config = micro.config || {};
                const apps = microConfig[this.masterName] = microConfig[this.masterName] || [];
                if (!apps.map((i) => i.name).includes(this.slaveName)) {
                    apps.push({
                        name: this.slaveName,
                        entries,
                    });
                }
                this.registerApp(entries);
            }
        },
        getConfig() {
            const location = window.location;
            const pathname = location.pathname;
            const activePath = pathname;
            const prefix = this.$route.path;
            return merge({
                isActive(location) {
                    const pathname = location.pathname;
                    const path = pathname;
                    return path.startsWith(activePath + '/') || path === activePath;
                },
                customProps: {
                    node: '#' + this.nodeId,
                    prefix,
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
</style>

import cache from './cache';
export default {
    resetModal: true, // 设置是否需要reset
    props: {
        showModal: { type: Boolean, default: false },
    },
    data() {
        return {
            show: !!this.showModal,
        };
    },
    beforeCreate() {
        const modalName = this.$attrs['modal-name'];
        if (modalName) {
            if (!cache[modalName]) {
                cache[modalName] = this;
            } else {
                console.error(`modal[${modalName}] repeat name`);
            }
        }
    },
    created() {
        this.$watch('showModal', (value) => {
            this.show = !!value;
        });
        this.$watch('show', (value) => {
            if (this.$options.resetModal && !value)
                this.resetModal();
            this.$emit('update:showModal', value);
        });
    },
    beforeDestroy() {
        const modalName = this.$attrs['modal-name'];
        if (modalName) {
            if (cache[modalName] === this) {
                delete cache[modalName];
            } else {
                console.error(`can't find modal[${modalName}]`);
            }
        }
    },
    methods: {
        open(data) {
            Object.assign(this, data);
            this.show = true;
        },
        close(data) {
            Object.assign(this, data);
            this.show = false;
        },
        resetModal() {
            const staticData = (this.$options.staticData || []).slice();
            const resetData = this.$options.data.apply(this);
            staticData.push('show');
            for (const name of staticData)
                delete resetData[name];
            Object.assign(this, resetData);
        },
    },
};

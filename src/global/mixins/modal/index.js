import cache from './cache';
export default {
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
    },
};

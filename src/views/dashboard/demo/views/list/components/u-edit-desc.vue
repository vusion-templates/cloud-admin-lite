<template>
    <u-modal title="查看分类" @ok="modalOK" @cancel="modalCancel"
        ok-button="确认" cancel-button="取消" :visible.sync="show"
        icon="info">
        <template v-if="detail">
            {{ detail.cate_sname }}
        </template>
    </u-modal>
</template>
<script>
import Modal from '@/global/mixins/modal';
export default {
    mixins: [Modal],
    data() {
        return {
            detail: null,
        };
    },
    methods: {
        modalOK() {
            this.close();
        },
        modalCancel() {
            this.close();
        },
    },
};
</script>

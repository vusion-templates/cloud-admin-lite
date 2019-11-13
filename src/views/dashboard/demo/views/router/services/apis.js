export default {
    loadList: {
        url: {
            path: '/musicBroadcasting',
            method: 'get',
            query: {
                type: 1,
            },
        },
    },
    loadDetail: {
        url: {
            path: '/musicBroadcastingDetails',
            method: 'get',
        },
    },
};

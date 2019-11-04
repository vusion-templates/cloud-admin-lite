export default {
    list: {
        url: {
            path: '/musicBroadcasting',
            method: 'get',
            query: {
                type: 1,
            },
        },
    },
    detail: {
        url: {
            path: '/musicBroadcastingDetails',
            method: 'get',
        },
    },
};

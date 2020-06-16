export default {
    loadList: {
        config: {
            postprocess(res) {
                const result = [];
                res.result.forEach((item) => {
                    item.channellist.forEach((channel) => {
                        channel.thumb = channel.thumb || channel.avatar;
                        channel.time = new Date() - 0;
                        channel.cate_sname = channel.cate_sname || item.title;
                    });
                    result.push(...item.channellist);
                });
                return result;
            },
        },
    },
};

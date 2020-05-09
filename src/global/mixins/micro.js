import micro from 'vusion-micro';
export default {
    beforeRouteLeave(to, from, next) {
        if (this.slaveName) {
            micro.unloadApp(this.slaveName).then(() => {
                next();
            }, (e) => {
                console.log(e);
            });
        }
    },
};

import micro from 'vusion-micro';
export default {
    beforeRouteEnter(to, from, next) {
        const last = to.matched[to.matched.length - 1];
        const prefix = last.path.replace('**', '').replace(/\/$/, '');
        const fullPath = to.fullPath;
        if (to.path.replace(/\/$/, '') !== prefix) {
            const params = {
                ...to.params,
            };
            const query = {
                ...to.query,
                _m: fullPath, // fix refresh subApp page
            };
            next({
                params,
                query,
                path: prefix,
            });
        } else {
            next();
        }
    },
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

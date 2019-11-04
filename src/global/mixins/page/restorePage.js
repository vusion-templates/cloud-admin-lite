export default {
    beforeRouteLeave(to, from, next) {
        if (this.needRestorePage) {
            // 非跳到列表页的子页面，删除当页的page参数
            const children = from.meta.children || [];
            const toSubPage = children.some((item) => to.path.startsWith(item));
            // 创建页是子页面，创建后需要跳转到第一页，不需要保留分页信息
            const noPageInfo = from.meta.noPageInfo || [];
            const toNoPageInfo = noPageInfo.some((item) => to.path.startsWith(item));
            if (!toSubPage || toNoPageInfo) {
                this.resetPageUrl();
            }
        }
        next();
    },
    beforeRouteUpdate(to, from, next) {
        // 处理浏览器回退历史记录时列表刷新问题
        if (this.needRestorePage) {
            const query = to.query;
            const pageData = query[this.urlPageName] ? query[this.urlPageName].split('_') : [];
            const limit = this.checkLimit(+pageData[0]);
            const page = +pageData[1] || 1; // 如果page没有设置，回退到第一页
            if (limit !== this.form.limit || page !== this.page) {
                const dataTemp = {
                    limit,
                    page,
                };
                this.updatePageData(dataTemp);
                if (!this.localPage)
                    this.refresh();
            }
        }
        next();
    },
    watch: {
        page(page) {
            this.updateUrl({ page });
        },
        'form.limit'(limit) {
            localStorage.set(this.limitStorageId, limit);
        },
    },
    methods: {
        init() {
            const currentPageName = this.$route.name;
            const name = currentPageName.substring(currentPageName.indexOf('.') + 1);
            this.urlPageName = `${name}.page`;
            this.limitStorageId = `page-limit-${currentPageName}`;
            let limit = localStorage.get(this.limitStorageId);
            const urlPageData = this.$route.query[this.urlPageName] || '';
            // localStorage里有limit，或者route里带有page信息，说明设置过，需要设置url
            if (limit || urlPageData) {
                limit = this.checkLimit(+limit);
                const pageData = urlPageData.split('_');
                const urlPage = +pageData[1] || this.page;
                let urlLimit = pageData[0] ? this.checkLimit(+pageData[0]) : '';
                urlLimit = urlLimit || limit; // url上的limit优先
                this.updateUrl({ limit: urlLimit, page: urlPage });
                localStorage.set(this.limitStorageId, urlLimit);
            } else {
                this._init();
            }
        },
        /**
         * limit or page 更改的时候，更新url
         */
        updateUrl(data = {}) {
            const dataTemp = Object.assign({
                limit: this.form.limit,
                page: this.page,
            }, data);
            const query = Object.assign({}, this.$route.query);
            const urlPageName = this.urlPageName;
            query[urlPageName] = [dataTemp.limit, dataTemp.page].join('_');
            this.changeQueryUrl(query);
            this.updatePageData(dataTemp);
            this.refresh();
        },
    },
};

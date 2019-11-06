import Page from './page';
import localStorage from '@/global/utils/storage/localStorage';
export default {
    extends: Page,
    watch: {
        page(page) {
            this.updateUrl({ page });
        },
        limit(limit) {
            this.updateUrl({ limit });
            this.setLimitByStorage(limit);
        },
    },
    data() {
        const name = this.$route.name;
        const urlPageName = `${name}.page`;
        const limitStorageId = `${name}.pageLimit`;
        const limit = this.getLimitByStorage(limitStorageId);
        const urlPageData = this.$route.query[urlPageName] || '';
        const data = {
            urlPageName,
            limitStorageId,
        };
        if (limit) {
            data.limit = +limit;
        }
        if (urlPageData) {
            const [urlLimit, urlPage] = urlPageData.split('_');
            if (urlLimit) {
                data.limit = +urlLimit;
            }
            if (urlPage) {
                data.page = +urlPage;
            }
        }
        return data;
    },
    methods: {
        beforeInit() {
            this.updateUrl({ limit: this.limit, page: this.page });
        },
        getLimitByStorage(limitStorageId) {
            limitStorageId = limitStorageId || this.limitStorageId;
            return localStorage.get(limitStorageId);
        },
        setLimitByStorage(value) {
            if (value)
                localStorage.set(this.limitStorageId, value);
        },
        /**
         * limit or page 更改的时候，更新url
         */
        updateUrl(data = {}) {
            const dataTemp = Object.assign({
                limit: this.limit,
                page: this.page,
            }, data);
            const urlPageData = [dataTemp.limit, dataTemp.page].join('_');
            const urlPageName = this.urlPageName;
            this.$routerLock({
                [urlPageName]: urlPageData,
            });
        },
    },
};

/**
 * mixins提供了：
 *  1. 对列表接口 loadList 方法进行了增强，可获取状态 loading 、loadError。
 *     需要定义 loadList 方法，返回值需要是 promise 或者 true（true 代表延迟调用 loadList，调用时机需用户自行把握），
 *     同时需要对 list total 进行赋值。
 *  2. 配额是否有剩余 lessQuota （默认是 true，在有数据的情况下会返回实际剩余配额）
 *     需要定义 loadQuota 方法（可选）主要是获取配额，同时需要对 quota 赋值配额。
 *  3. 分页控件事件响应 changePage，提供 totalPage page 取值
 *  4. 提供了获取调用远程接口参数的方法，支持传参，eg: getFormForOAI({other: 1})
 * getForm（用于接口发送 offset、limit），getFormForOAI（用于接口发送 Offset、Limit），getFormForPage（用于接口发生 pageNum、pageSize）
 *  5. 提供安全删除实例的方法，用于（最后一页只有一条的情况），同时会自动在实例上添加 deleting 属性
 *     需要定义 deleteItem 方法，返回值需要是 promise 或者 true（true 代表延迟调用 deleteItem）
 *  6. 提供前端分页模式 localPage，如需刷新，调用 refresh 即可
 *  7. 提供分页细粒度模式 needRestorePage，需要在路由配置相关信息（包括 name、meta.children、meta.noPageInfo），
 *
 */
export default {
    created() {
        this.loadListSource = this.loadList; // cache this
        this.deleteItemSource = this.deleteItem; // cache this
        this.updateItemSource = this.updateItem; // cache this
        this.loadList = this.loadListWrap;
        this.deleteItem = this.deleteItemWrap;
        this.updateItem = this.updateItemWrap;
        this.init();
    },
    data() {
        const defaultPageLimitIndex = this.defaultPageLimitIndex || 1;
        const limitList = this.limitList || [10, 20, 50];
        const page = {
            limitList,
            defaultPageLimitIndex,
        };
        return {
            ...this.reset(page),
            ...this.initLoadStatus('load'),
            list: undefined,
            originList: null,
            quota: undefined,
            totalAll: 0,
            smoothLoad: false, // 是否刷新不loading: 实时刷新新数据，但不显示loading状态。在外层控制loading状态
            loadListWhenInit: true, // 弹窗里的列表不用 created 时 loadList（loadList 时机自由把控）
            needRestorePage: false, // 是否支持分页带入 url
        };
    },
    computed: {
        lessQuota() {
            const list = this.list;
            const quota = this.quota;
            const total = this.total;
            const totalAll = this.totalAll;
            // 改这里之前，请先看一下最上面的描述
            if ((total || list || totalAll) && quota !== undefined)
                return quota - (totalAll || total || list.length);
            return true;
        },
        hasQuota() { // 配额为负数的情况
            return this.lessQuota > 0;
        },
        totalPage() {
            const { form, total } = this;
            const { limit } = form;
            return Math.ceil(total / limit) || 1;
        },
    },
    methods: {
        init() {
            if (this.loadListWhenInit) {
                this.__init();
            }
        },
        __init(params) {
            this.loadList(params);
            this.loadQuota && this.loadQuota();
        },
        /**
         * 刷新时，是否显示加载中间态
         * @param {Boolean} params.smoothLoad    若传该参数，会优先使用该参数，不使用this.smoothLoad
         */
        refresh(params = {}) {
            if (this.localPage) {
                this.originList = null;
            }
            this.__init(params);
        },
        reset(page) {
            page = page || this;
            const data = {
                form: {
                    offset: 0,
                    limit: page.limitList[page.defaultPageLimitIndex],
                },
                page: 1,
                total: 0,
            };
            data.form = page.form ? Object.assign(page.form, data.form) : data.form;
            return Object.assign(page, data);
        },
        previousPage() {
            this.page -= 1;
            this.changePage({ page: this.page });
        },
        changePage($event, force) {
            const page = Math.max(1, $event.page);
            this.page = page;
            this.form.offset = (page - 1) * this.form.limit;
            this[force ? 'refresh' : 'loadList']();
        },
        $getLocalList(requestDone) {
            if (requestDone && !this.originList) {
                throw new Error('originList is null or undefined');
            }
            const { pageNum, pageSize } = this.getFormForPage();
            this.list = this.originList.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        },
        wrap(source, params) {
            const req = this[source](params);
            if (req === true) {
                // 不执行，延迟调用
                return false;
            }
            if (process.env.NODE_ENV === 'development') {
                if (!req || !req.then) {
                    console.error('必须返回 promise 或者 true (不执行，延迟调用)');
                    return false;
                }
            }
            return req;
        },
        loadListWrap(params = {}) {
            if (this.localPage && this.originList) {
                return this.$getLocalList();
            }
            const req = this.wrap('loadListSource', params);
            if (req) {
                const smoothLoad = ('smoothLoad' in params) ? params.smoothLoad : this.smoothLoad;
                this.addLoadStatus(() => {
                    if (!smoothLoad) {
                        this.list = undefined;
                    } else {
                        this.loading = false;
                    }
                    return req.then(() => {
                        if (this.localPage) {
                            this.$getLocalList(true);
                        }
                        const { offset, limit } = this.form;
                        const length = this.list.length;
                        if (this.list) {
                            // 返回值为空，说明页码错误，跳到第一页
                            if (!length && offset !== 0) {
                                this.changePage({
                                    page: 1,
                                });
                            } else {
                                this.page = Math.ceil((length + offset) / limit);
                            }
                        }
                    });
                }, 'load');
            }
        },
        deleteItemWrap(item) {
            if (item.deleting)
                return;
            const req = this.wrap('deleteItemSource', item);
            if (req) {
                this.$set(item, 'deleting', true);
                req.then(() => {
                    item.deleting = false;
                    if (this.totalAll && Number.isNaN(this.totalAll)) {
                        this.totalAll -= 1;
                    }
                    if (this.total && Number.isNaN(this.total)) {
                        this.total -= 1;
                    }
                    // 删除最后一页，自动回到前一页
                    if (this.list.length === 1) {
                        this.changePage({
                            page: this.page - 1,
                        }, true);
                    } else {
                        this.refresh();
                    }
                }, () => {
                    item.deleting = false;
                });
            }
        },
        updateItemWrap(item) {
            if (item.updating)
                return;
            const req = this.wrap('updateItemSource', item);
            if (req) {
                this.$set(item, 'updating', true);
                req.then(() => {
                    item.updating = false;
                    this.refresh();
                }, () => {
                    item.updating = false;
                });
            }
        },
        getForm(ops) {
            return Object.assign({}, this.form, ops);
        },
        getFormForOAI(ops) {
            const { offset, limit } = this.form;
            return Object.assign({
                Offset: offset,
                Limit: limit,
            }, ops);
        },
        getFormForPage(ops) {
            const { offset, limit } = this.form;
            return Object.assign({
                pageNum: (Math.ceil(offset / limit) + 1) || 1,
                pageSize: limit,
            }, ops);
        },
        /**
         * 修改分页粒度
         */
        changeLimit($event) {
            let limit = $event.pageSize;
            limit = this.limitList.includes(limit) ? limit : this.limitList[0];
            const index = this.limitList.indexOf(limit);
            this.defaultPageLimitIndex = index;
            this.form.limit = limit;
            this.reset();
            this.refresh();
        },
        /**
         * 更新列表中的limit和page
         * 统一从url中拿取
         */
        updatePageData(data) {
            this.form.limit = +data.limit;
            this.page = +data.page;
            this.form.offset = (this.page - 1) * this.form.limit;
        },
        /**
         * 子列表退出时，需要将page的最后一位清除
         */
        resetPageUrl() {
            const query = this.$route.query;
            if (query[this.urlPageName]) {
                delete query[this.urlPageName];
            }
        },
    },
};

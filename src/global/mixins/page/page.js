/**
 * mixins提供了：
 *  1. 对列表接口 loadList 方法进行了增强，可获取状态 loading 、loadError、loadDone
 *     需要定义 loadList 方法，返回值需要是 promise 或者 true（true 代表延迟调用 loadList，调用时机需用户自行把握），
 *     同时需要对 list total 进行赋值。
 *  2. 配额是否有剩余 lessQuota （默认是 true，在有数据的情况下会返回实际剩余配额）
 *     需要定义 loadQuota 方法（可选）主要是获取配额，同时需要对 quota 赋值配额。
 *  3. 分页控件事件响应 changePage，提供 page 取值
 *  4. 提供了获取调用远程接口参数的方法，支持传参
 * getOffset（用于接口发送 offset、limit），getPage（用于接口发送 pageNum、pageSize）
 *  5. 提供安全删除实例的方法，用于（最后一页只有一条的情况），同时会自动在实例上添加 deleting 属性
 *     需要定义 deleteItem 方法，返回值需要是 promise 或者 true（true 代表延迟调用 deleteItem）
 *  6. 提供前端分页模式 localPage，如需刷新，调用 refresh 即可
 *  7. 提供修改每页条数的方法 changeLimit
 *
 */
export default {
    props: {
        limitList: {
            type: Array,
            default: () => [10, 20, 50],
        },
    },
    created() {
        this.loadListSource = this.loadList; // cache this
        this.deleteItemSource = this.deleteItem; // cache this
        this.updateItemSource = this.updateItem; // cache this
        this.loadList = this.loadListWrap;
        this.deleteItem = this.deleteItemWrap;
        this.updateItem = this.updateItemWrap;
        this.beforeInit && this.beforeInit();
        this.init();
    },
    data() {
        const limit = this.limitList[1];
        return {
            ...this.resetPage(limit),
            ...this.initLoadStatus('load'),
            list: undefined,
            originList: null,
            quota: undefined,
            totalAll: 0,
            smoothLoad: false, // 是否刷新不 loading: 实时刷新新数据，但不显示 loading 状态。在外层控制 loading 状态
        };
    },
    computed: {
        lessQuota() {
            const { list, quota, total, totalAll } = this;

            if ((total || list || totalAll) && quota !== undefined)
                return quota - (totalAll || total || list.length);
            return true;
        },
        hasQuota() {
            return this.lessQuota > 0; // 配额为负数的情况
        },
        offset() {
            const { limit, page } = this;
            return (page - 1) * limit;
        },
    },
    methods: {
        init() {
            this.resetPage(this.limit, this.page, true);
            this.__init();
        },
        __init() {
            this.loadList();
            this.loadQuota && this.loadQuota();
        },
        refresh() {
            if (this.localPage) {
                this.originList = null;
            }
            this.__init();
        },
        resetPage(limit, page = 1, addToThis) {
            limit = this.getCorrectLimit(limit);
            page = Math.max(1, page);
            const data = {
                limit,
                page,
                total: 0,
            };
            if (addToThis) {
                Object.assign(this, data);
            }
            return data;
        },
        changePage($event, force) {
            const page = Math.max(1, $event.page);
            this.page = page;
            this[force ? 'refresh' : 'loadList']();
        },
        changeLimit($event) {
            this.resetPage($event.pageSize, 1, true);
            this.refresh();
        },
        getCorrectLimit(limit) {
            const limitList = this.limitList;
            const index = Math.max(limitList.indexOf(limit), 0);
            return limitList[index];
        },
        getLocalList(requestDone) {
            const { originList } = this;
            if (requestDone && !originList) {
                throw new Error('originList is null or undefined');
            }
            const { pageNum, pageSize } = this.getPage();
            const end = pageNum * pageSize;
            this.list = originList.slice(end - pageSize, end);
        },
        wrap(source, params) {
            const req = this[source](params);
            if (req === true) {
                return false;
            }
            if (process.env.NODE_ENV === 'development') {
                if (!req || !req.then) {
                    console.error('必须返回 promise 或者 true');
                    return false;
                }
            }
            return req;
        },
        loadListWrap() {
            if (this.localPage && this.originList) {
                return this.getLocalList();
            }
            const req = this.wrap('loadListSource');
            if (req) {
                this.updateLoadStatus(() => {
                    if (!this.smoothLoad) {
                        this.list = undefined;
                    } else {
                        this.loading = false;
                    }
                    return req.then(() => {
                        if (this.localPage) {
                            this.getLocalList(true);
                        }
                        const { list, offset, limit } = this;
                        const length = list.length;
                        if (list) {
                            // 返回值为空，说明页码错误，跳到第一页
                            if (!length && offset !== 0) {
                                this.changePage({
                                    page: 1,
                                });
                            } else {
                                this.page = Math.ceil((length + offset) / limit) || 1;
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
                    if (this.totalAll) {
                        this.totalAll -= 1;
                    }
                    if (this.total) {
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
        getOffset(ops) {
            return Object.assign({
                offset: this.offset,
                limit: this.limit,
            }, ops);
        },
        getPage(ops) {
            const { limit } = this;
            return Object.assign({
                pageNum: this.page,
                pageSize: limit,
            }, ops);
        },
    },
};

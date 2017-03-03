var Pagination = {
    template: '\
    <ul class="pagination">\
        <li @click="goFirst" :class="disabledPage(!firstPageEnable)">\
            <a href="javascript:void 0" aria-label="首页" >\
                <span aria-hidden="true">首页</span>\
            </a>\
        </li>\
        <li @click="goPrevious" :class="disabledPage(!hasPreviousPage)"> \
            <a href="javascript:void 0" aria-label="上一页" >\
                <span aria-hidden="true">上一页</span>\
            </a>\
        </li>\
        <li v-for="page in showPageIndexRange()"\
               @click="goPage(startIndex() + page - 1)"\
               :class="currentPage(startIndex() + page - 1)"> \
            <a href="javascript:void 0"\>{{ startIndex() + page  - 1 }}</a>\
        </li>\
        <li @click="goNext" :class="disabledPage(!hasNextPage)">\
            <a href="javascript:void 0" \
               aria-label="下一页">\
                <span aria-hidden="true">下一页</span>\
            </a>\
        </li>\
        <li @click="goEnd" :class="disabledPage(!lastPageEnable)">\
            <a href="javascript:void 0"\
               aria-label="末页">\
                <span aria-hidden="true">末页</span>\
            </a>\
        </li>\
        <li>\
            <span class="total-count">总数：{{totalCount}}\</span>\
            <span class="warm" v-if="pageIndexOutOfRange">提示：数据发生变化，请重试！</span>\
        </li>\
    </ul>\ ',
    props: {
        // 总记录数
        totalCount: {
            type: Number,
            required: true
        },
        // 每页数据条数
        pageSize: {
            type: Number,
            required: true,
            validator: function (val) {
                return val > 0;
            }
        }
    },

    data: function () {
        return {
            // 显示的页码数
            showPageNumber: 10,
            // 当前页码
            pageIndex: 1,
            // 当前页是否超过最大页码（数据发生变化时可能发生）
            pageIndexOutOfRange: false
        }
    },

    computed: {
        // 总页数
        totalPage: function () {
            var totalPage = 0;
            var pages = parseInt(this.totalCount / this.pageSize);

            if (this.totalCount % this.pageSize > 0) {
                totalPage = ++pages;
            }
            else {
                totalPage = pages;
            }

            if (totalPage > 0
                && this.pageIndex > totalPage) {
                this.pageIndex = 1;
                this.pageIndexOutOfRange = true;
            }
            else {
                this.pageIndexOutOfRange = false;
            }

            return totalPage;
        },
        // 是否有上一页
        hasPreviousPage: function () {
            return this.pageIndex > 1;
        },
        // 是否有下一页
        hasNextPage: function () {
            return this.pageIndex < this.totalPage;
        },
        firstPageEnable: function () {
            return this.pageIndexOutOfRange || this.hasPreviousPage;
        },
        lastPageEnable: function () {
            return this.pageIndexOutOfRange || this.hasNextPage;
        },
        showMiddleNumber: function () {
            return this.showPageNumber / 2;
        }
    },

    methods: {
        innerStartIndex: function () {
            return this.pageIndex - this.showMiddleNumber;
        },

        innerEndIndex: function () {
            return this.pageIndex + this.showMiddleNumber;
        },

        startIndex: function () {
            var start = this.innerStartIndex();
            var end = this.innerEndIndex();

            if (end > this.totalPage) {
                start -= end - this.totalPage;
            }

            if (start < 1) {
                return 1;
            }

            return start + 1;
        },

        endIndex: function () {
            var start = this.innerStartIndex();
            var end = this.innerEndIndex();

            if (start < 0) {
                end += Math.abs(start);
            }

            if (end > this.totalPage) {
                end = this.totalPage;
            }

            return end;
        },

        // 获取显示页面范围
        showPageIndexRange: function () {
            return this.endIndex() - this.startIndex() + 1;
        },

        // 获取当前页css class
        currentPage: function (page) {
            return {
                "active": this.pageIndex === page
            }
        },

        // 禁用分页按钮点击
        disabledPage: function (val) {
            return {
                "disabled": val
            }
        },

        // 首页
        goFirst: function () {
            if (this.firstPageEnable) {
                this.goPage(1);
            }
        },

        // 上一页
        goPrevious: function () {
            if (this.hasPreviousPage) {
                this.goPage(this.pageIndex - 1);
            }
        },

        // 下一页
        goNext: function () {
            if (this.hasNextPage) {
                this.goPage(this.pageIndex + 1);
            }
        },

        // 最后一页
        goEnd: function () {
            if (this.lastPageEnable) {
                this.goPage(this.totalPage);
            }
        },

        // 跳转到指定页面
        goPage: function (page) {
            if (!this.pageIndexOutOfRange && page === this.pageIndex) {
                return;
            }

            this.pageIndex = page;
            this.$emit('page', page);
        }
    }
}
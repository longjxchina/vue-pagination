var Pagination = {
    template: '\
    <ul class="pagination">\
        <li>\
            <a href="#" aria-label="Previous">\
                <span aria-hidden="true">&laquo;</span>\
            </a>\
        </li>\
        <li><a href="#">1</a></li>\
        <li><a href="#">2</a></li>\
        <li><a href="#">3</a></li>\
        <li><a href="#">4</a></li>\
        <li><a href="#">5</a></li>\
        <li>\
            <a href="#" aria-label="Next">\
                <span aria-hidden="true">&raquo;</span>\
            </a>\
        </li>\
    </ul>\ ',
    props: {
        // 总记录数
        totalCount: {
            type: Number,
            required: true
        },
        // 当前页数
        pageIndex: {
            type: Number,
            default: 1,
            validator: function(val) {
                return val > 0;
            }
        },
        // 每页数据条数
        pageSize: {
            type: Number,
            required: true,
            validator: function(val){
                return val > 0;
            }
        }        
    },

    computed: {
        // 总页数
        totalPage: function(){
            var pages = this.totalCount / this.pageSize;

            if (this.totalCount % this.pageSize > 0) {
                return pages++;
            }
            else {
                return pages;
            }
        },
        // 是否有上一页
        hasPreviousPage: function(){
            return this.pageIndex > 1;
        },
        // 是否有下一页
        hasNextPage: function(){
            return this.pageIndex + 1 < this.totalPage;
        }
    }
}
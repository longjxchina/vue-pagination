# vue 分页 #

## 使用 ##
### vue注册分页组件 ###

### 使用vuejs版本： ###
> Vue.js v2.2.1

### 引用js ###
```js
<script src='../src/Pagination.js'></script>
```

```js
var app = new Vue({
    el: '#list',
    data: function(){
        return {
            paginationOption: {
                totalCount: 100,
                pageSize: 15,
            },
        }
    },
    methods: {
        goPage: function(page){                        
            // 重新设置数据总数
            this.paginationOption.totalCount = 101;
        }
    },
    components: {
        "pagination": Pagination
    }
})
```

### 页面html ###
``` html
<div id="list">
    <pagination :total-count="paginationOption.totalCount"
                :page-size="paginationOption.pageSize"                
                @page="goPage"></pagination>
</div>
```
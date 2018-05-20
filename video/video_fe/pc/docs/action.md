#点赞，收藏，订阅交互组件使用#
**author: fuzhengchun@gomeplus.com**

**目录位置**
src/js/widgets/action
基类：base.js
点赞：like.js
收藏：collect.js
订阅：subscribe.js

**使用方法**
在点赞，收藏，订阅按钮结构上，添加data属性：
e.g.
```
<div data-action="like" data-likeid="100" data-status="0">点赞<span data-node="count">100</span></div>
<div data-action="collect" data-collectid="100" data-status="0">收藏</div>
<div data-action="subscribe" data-subscribeid="100" data-status="0">订阅<span data-node="count">100</span></div>
```

js使用的时候，先引入对应需要操作的类文件，然后实例化的时候配置对应的参数或方法即可。
如点赞，like.js
```
import Like from 'widgets/action/like';

new Like({

    // 接口地址，组件有默认的，可不传
    api:'/',

    // 事件委托的节点。默认在body上，最好自己设置一个。
    delegate:'body', 

    // 点赞，收藏等具体的按钮节点，若不传，则默认用'[data-action=like]'。  
    selector: '[data-action=like]',

    // 发送请求前的操作，return false会阻止发送请求。
    // data参数包含了id，actionType，formData。
    beforeRequest: function(data){   
        if (data.actionType == 0) {
            return false; 
        }
    },

    // 点赞成功后的回调操作，data包含了id,$el,$delegate和接口返回的数据res
    afterDoSuccess: function(data){

        // 回调里根据各自实际业务情况做处理，此回调覆盖默认操作。
        console.log(data);
    },

    // 取消点赞成功后的回调操作，data包含了id,$el,$delegate和接口返回的数据res
    afterUndoSuccess:function(data){  

        // 回调里根据各自实际业务情况做处理，此回调覆盖默认操作。
        console.log(data);       
    },

    // 点赞失败的回调。
    afterDoFail:function(data){
        // 默认是toast提示。
    },

    // 取消点赞失败的回调。
    afterUndoFail:function(data){
        // 默认是toast提示。
    }
});
```

收藏，订阅和点赞同理，操作一样。
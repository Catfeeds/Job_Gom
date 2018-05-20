# GMP JS Framework使用文档

### 1. 起步
* hello world 
 
```html
<div id="container"></div>

 <script id="tmpl" type="text/html">
        <%=msg%>
 </script>

```

```javascript

new GMP({
            el: '#container',
            data: {
                msg: 'hello world'
            },
            template:GMP.template('tmpl'),
            init: function(){
                this.render();
            },
            render: function() {
                $('#container').html(this.template(this.data));
            }
  });

```

```
Hello GMP.js!
```

* 渲染列表

```html

<div id="container"></div>

<script id="tmpl" type="text/html">
    <ul>
        <% for (var i = 0, len = list.length; i < len; i++) {%>
            <li><%=list[i]%></li>
        <%}%>
    </ul>
</script>

```

```javascript
	new GMP({
        el: '#container',
        data: {
            list: ['快来玩国美+', '轻轻松松赚钱 , '快快乐乐分享']
        },
        template:GMP.template('tmpl'),
        init: function(){
            this.render();
        },
        render: function() {
            $('#container').html(this.template(this.data));
        }
    });

```

```
快来玩国美+  
轻轻松松赚钱  
快快乐乐分享  
```
综合
请参考TodoList
### GMP实例
每个 GMP.js 应用的起步都是通过构造函数 GMP 创建一个 GMP 的根实例：

```javascript
	var vm = new GMP({
  			// 选项
  })

```

在实例化 GMP 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。
### 属性
```
el: app的id
data: app数据
events: 事件注册
init: 初始化方法
els: 页面元素对象
template: 模板对象
destroy: 销毁app
$el: 组件的jquery/zepto对象
appName: app名称
```
### 生命周期
![QQ20161108-1_2x](/uploads/f56dd44a7200e3e46a252ba033671666/QQ20161108-1_2x.png)
### 事件绑定

```html
<div id="example">
  <button id="btn">Hello</button>
</div>

```
我们绑定了一个单击事件处理器到一个方法 hello。下面在 GMP 实例中定义这个方法
```javascript
var vm = new GMP({
  el: '#example',
  data: {
    name: 'GMP.js'
  },
  events:{
  		'click #btn': 'hello'
  },
  // 在 `methods` 对象中定义方法
	hello: function (event) {
	 // 方法内 `this` 指向 vm
	 alert('Hello ' + this.name + '!')
	 // `event` 是原生 DOM 事件
	 alert(event.target.tagName)
	}
})

// 也可以在 JavaScript 代码中调用方法
vm.hello() // -> 'Hello GMP.js!'
```
### 内部事件
内部事件  
注册on:  
`this.on("eventName", callback);`  
解绑off  
`this.off("eventName");`  
触发trigger  
`this.trigger("eventName", args);`  

以下例子是对data数据变化的监听，在内部使用`this.on("change:attr", callback);`方式注册，属性值变更后自动触发callback方法。在这里是修改输入框中的值，然后点击提交后，对应的值也进行了更改。

```html
<div id="container"></div>

<script id="tmpl" type="text/html">
    <ul>
        <% for (var i = 0, len = list.length; i < len; i++) {%>
        <li><%=list[i]%></li>
        <%}%>
    </ul>
    <div id="form"></div>
</script>
<script id="ftmpl" type="text/html">
    <p><%=name%></p>
    <input type="text" id="name" value="<%=name%>">
    <button id="sBtn">修改</button>
</script>
```


```javascript
new GMP({
        el: '#container',
        data: {
            name: 'zeromike',
            list: ['鸣人', '佐助', '我爱罗', '春野樱']
        },
        events: {
          'click #sBtn': 'submit'
        },
        submit: function() {
          this.data.name = $('#name').val();
        },
        template:{
            list: GMP.template('tmpl'),
            form: GMP.template('ftmpl')
        },
        init: function(){
            this.render();
            this.on("change:name", this.renderForm);
        },
        render: function() {
            $('#container').html(this.template.list(this.data));
            this.renderForm();
        },
        renderForm: function() {
            $('#form').html(this.template.form(this.data));
        }
    });
```
### 模板
模板解析使用最简单的方式，<%%>以上两种标记间写js代码即可
```
	<%js代码%>  
	<%=属性%>
```
### 统一数据中心
目前这个很简单，相当于只是个全局对象，使用时，此对象放入单独的js文件，其他模块require进来这个对象
```javascript
var g = new GMP.GMPX({
	//属性
	name: 'zeromike'
})
// 访问
g.name
// 设置
g.name = zhangzhao
```
### 事件Bus

```javascript
GMP.GMPEvents.on(eventsName,callback,context);// 注册
GMP.GMPEvents.trigger(eventsName,args);//触发
GMP.GMPEvents.off(eventsName,callback,context);//移除
```

```html
<div id="container">
        <div id="ca"></div>
        <div id="cb"></div>
    </div>

    <script id="catmpl" type="text/html">
        <%=name%>
    </script>
    <script id="cbtmpl" type="text/html">
            <input type="text" id="name" >
            <button id="btn">修改</button>
    </script>
```

```javascript
var ca = new GMP({
            el: '#ca',
            data: {
                name: 'zeromike'
            },
            template:GMP.template('catmpl'),
            init: function(){
                this.render();
                var that = this;
                GMP.GMPEvents.on('gmp_list', function(data) {
                    that.data.name = data;
                    that.render();
                })
            },
            render: function() {
                this.$el.html(this.template(this.data));
            }
        });

        var cb = new GMP({
            el: '#cb',
            template:GMP.template('cbtmpl'),
            events: {
              'click #btn': 'submit'
            },
            submit: function() {
                GMP.GMPEvents.trigger('gmp_list', $('#name').val());
            },
            init: function(){
                this.render();
            },
            render: function() {
                this.$el.html(this.template());
            }
        });

```



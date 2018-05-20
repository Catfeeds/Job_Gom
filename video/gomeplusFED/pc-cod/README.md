# 开发环境使用说明
=======

项目是基于webpack构建的，而webpack是依赖nodejs的；所以，在启动webpack之前，需要先安装node.js。

## nodejs的安装

nodeJS的安装，请参考[nodejs.org](https://nodejs.org/)官网！

安装完成之后，在终端上运行node -v，若正确显示版本号，则表示安装成功！

建议安装最新版本的node！

## 配置host

在host文件中增加如下配置：

```
127.0.0.1 js.dev.meixincdn.com
127.0.0.1 bi.dev.gomeplus.com
```

## 检出工程目录

git地址：

```
http://gitlab.intra.gomeplus.com/gomeplusFED/pc.git
```

svn地址：

```
https://svn.gomeo2o.cn:8443/gomeo2o_H5/dev/pc/trunk
```

## 安装依赖

检出工程后，进入_**工程所在目录**_，运行命令：


`npm install`

## 启动webpack

依赖安装完成之后，以管理员身份运行：

`npm run dev`

如果是mac：

`sudo npm run dev`

在linux或mac下，监听1024以下的端口，需要管理员权限！之所以监听80端口，只是为了方便配置host并调试；

启动之后，在浏览器中输入：`localhost` 或 `127.0.0.1` ，如果有端口，在地址后面添加端口，即可查看！


windows系统中，由于防火墙的存在，在弹出nodejs的网络请求后，请确认通过！

## 工程目录结构说明

dist 是编译之后的输出目录，开发过程，不用关注该目录，仅用于上线。

## src 是所有的源代码，分为:

```
--css
--images
--html
--sass
--demo 该目录为演示代码，方便自己实验功能，不需要提交到svn仓库
--dist 
--js
 |-- page    入口文件，以页面为单位
 |-- conf    经过webpack编译之后的入口文件存放目录，方便把代码推送到开发和测试服务器
 |-- module  公共模块
 |-- utils   工具函数
 |-- plugin  jQuery插件存放目录
 |-- vendor  第三方库，npm可以直接安装的，就不用放到这里啦
 |-- widget  和业务相关的页面组件
 |-- io      和数据交换相关的模块，包含ajax，pubsub，请求地址，广播通道申明等
```

## 开发约定

1.
模块化

模块语法是基于commonJS的，最常用的是require和exports，其他语法和js没有任何差异，使用方法如下：

```
// m1.js
module.exports = [1,2,3]; // 暴露模块的返回值

// index.js
var m1 = require('../m1'); // 使用require引用模块
console.log(m1);
```

2.
ajax请求

应用是基于jQuery的，为了方便增加统一的ajax回调，在jQuery ajax的基础上做了一层简单的封装，并在webpack中增加了别名配置；

另外，为了统一管理，所有的ajax请求地址，都在io/url模块中配置，在模块中使用，写法如下：

```
var url = require('io/url');
var fetch = require('io/fetch');
fetch.get(url.get('commentList'), {/* options,和jq ajax的options一致 */}).done().fail().always();
fetch.post('url').done().fail().always();
// 或者
fetch.get('url).then(function(){
  // success
}, function(){
  // error
}).always(function(){
  // execute always
});
```

除了以上用法，也可以和之前的用法一致，直接在options中传入success,error,complete回调等，不建议使用。

3.
模板引擎

为了减少拼装字符串，使用了artTemplate作为模板引擎；
使用方法如下：

```
// user.tpl
// 模板语法： http://aui.github.io/artTemplate/
{{if body}}
<div class="first-title">
    <h3>{{#body}}</h3>
</div>
{{/if}}
<ul class="chooses">
{{if type == 4}}
    <li class="clearFix" data-value="1">
        <div class="choose-mark">√</div>
        <div class="choose-content">正确</div>
    </li>
    <li class="clearFix" data-value="0">
        <div class="choose-mark">X</div>
        <div class="choose-content">错误</div>
    </li>
{{else}}
{{each subjectItems}}
<li class="clearFix" data-value="{{$value.value}}">
    <div class="choose-mark">{{$value.value}}</div>
<div class="choose-content">{{#$value.content}}</div>
</li>
{{/each}}
{{/if}}
</ul>

var tpl = require('./user.tpl');
var htmlStr = tpl(/* 模板需要的数据 */);
```

4.
工具函数

```
src
  --utils
    --byteLen.js     // 获取字符串的字节长度(1个汉字的长度为2)
    --decodeHtml.js  // 对字符串反转义
    --encodeHtml.js  // 对字符串转义
    --trim.js        // 移除字符串的收尾空白
    --truncate.js    // 按字节截取字符串
    --fecha.js       // 日期的解析和转换
```

使用方法：

```
require('utils/byteLen');
require('utils/trim');
...
```

5.
命名规范

jQuery实例，请在变量名前增加$，DOM节点不用增加$前缀，比如：

```
var $btn = $('button');
```

6.
jQuery选择器使用注意事项

由于jQuery的选择器太过于强大，导致乱用！除非特殊情况，请不要在模块中以如下的方式进行DOM节点的选择：

```
$('.input')
$('div')
$('div.test')
```

一个原则：请尽量在尽可能小的范围内查找节点，范围越小，效率越高，影响到其它模块的可能就越低！

```
// 假如节点id为 'foo',容器内有其它若干子元素
// 请先选择'[data-node=submit]'的子节点
var $foo = $('#foo'); // 确认选择范围
var $submit = $foo.find('[data-node=submit]'); // 在范围内进行子节点的选择
```

7.
host配置

和PHP联调的时候，需要配置host，分为开发环境，测试环境， 预生产环境和线上环境；对不同的环境进行调试时，需要配置不同的host；

开发环境host：
\`\`\`

\`\`\`

## Change Log

2016.5.22 增加目录结构说明；js目录下增加demo目录，存放代码片段；js目录下增加io文件夹，新增了ajax封装，pubsub封装，请求地址封装；
2016.5.17 增加readme.md
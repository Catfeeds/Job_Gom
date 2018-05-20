/* eslint-disable */
/**
 * 编辑器开发测试
 * @author Fu Xiaochun
 */

// var newEditor = require('editor');
// newEditor('editor');
// let fn = require('./es2015');
// console.log(fn(10));

// 针对jQuery的ajax做了封装,使用方法和jQ的使用方法一致
var fetch = require('io/fetch');
// 利用jQuery的callbacks对象封装的pubsub模块
var Pubsub = require('io/pubsub');

var url = require('io/url');

// 字符串截取
var truncate = require('utils/truncate');
var testStr = '喜欢你，abc受身蹲伏';
console.log(truncate(testStr, 10));

// 数字选择器
var spinner = require('spinner');


// 移除对话框时,记得清除对话框中绑定的事件
// dialog使用方法
// http://aui.github.io/artDialog/doc/index.html
// 编辑收货人地址弹窗
var deliveryAddrPop = require('module/popup/deliveryAddr');
/*var d = deliveryAddrPop.create({}, {
  ok: function(){
    console.log(this)
  }
});
d.show();*/
// d._$('header')
// d._$('content')
// d._$('footer');

// 上传图片弹窗
var uploadPop = require('module/popup/upload/dialog');
/*var d = uploadPop.create({}, {
  ok: function(){
    alert(1221)
  }
});
d.show();*/

var circlePop = require('module/popup/circle/dialog');
/*circlePop.create({

}).show();*/

// 
var alert = require('module/popup/alert');
// alert('你确定删除吗？');


var confirm = require('module/popup/confirm');
// confirm('你确定删除吗？');


// 分享
var share = require('module/share');
share.shareItem('[data-action=shareList]');

/**
 * 分享到 使用说明
 * 在[data-action=shareto]节点上输出要获取的数据 data-shareInfo=
 * {
 *  url:'http://www.gomeplus.com',
 *  title:'国美Plus',
 *  pic:'http://gomeplus.com/1.jpg||http://gomeplus.com/1.jpg'
 * }
 * pic是要分享的图片绝对地址，多张图片用||隔开。
 *
 * 页面中在分享按钮加 [data-action=shareto] 自定义属性；
 * 如果是分享当前页面的也要加shareInfo,值为当前页面对应的信息。格式都一样。
 *
 * 调用方法:
 * var share = require 
 * share.shareItem(要分享的区域父节点字符串e.g. 'data-node=shareList');
 *
 * shareto.weixin({shareInfo})
 * shareto.qq({shareInfo})
 * shareto.sina({shareInfo})
 * shareto.qzone({shareInfo})
 *
 *
 * share.share({shareInfo});这个shareInfo里要有type：[weixin,qq,sina,qzone]
 */



// 日期格式化,文档API
// https://github.com/taylorhakes/fecha
var dateFormat = require('utils/fecha');
console.log(dateFormat.format(Date.now(), 'YYYY-MM-DD'));

// 发送get请求
// 发送post请求,调用fetch.post即可
/*
fetch.get('test', {
	data: {
		a: 1,
		b: 2
	}
}).done(function(data, textStatus, jqXHR) {

}).fail(function(jqXHR, textStatus, errorThrown) {
	console.log(arguments);
}).always(function() {

});
*/

// Pubsub使用示例
var fn1 = function(data) {
    console.log(data.title);
  }
  // 订阅一个事件
Pubsub('mailArrived').sub(fn1);
// 发布消息
Pubsub('mailArrived').pub({
  title: 'value from publish uu '
});

// 数字选择器
console.log(window.jQuery);
$('[data-trigger=spinner]').spinner({
  delay: 200,
  min: 1,
  max: 3,
  beforeChange: function() {
    console.log(this);
    return false;
  },
  rangemin: function() {
    console.log('range min');
  },
  rangemax: function() {
    console.log('range max');
  },
  changed: function(e, newVal, oldVal) {
    console.log(arguments);
  }
});
// 获取实例,并设置最小值/最大值
// var spinerInstance = $('[data-trigger=spinner]').data('spinner');
// spinerInstance.spinning.value(3);
// spinerInstance.spinning.setMin(3);
// spinerInstance.spinning.setMax(3);

// 瀑布流
// var Tiles = require('tiles');
// var tiles = new Tiles({}, '[data-node=tiles]');
// console.log(tiles);

// placeholder插件
// require('placeholder');
// $('input').placeholder();

/*


var userWidget = require('../../widget/user/user');
require('../../plugin/jquery.unveil');


console.log('--图片懒加载插件--')
console.log($.fn.unveil);
console.log('--cookie插件--')
console.log($.cookie);


// userWidget();


// 对话框demo
// var d = dialog({
//     title: '消息',
//     content: '<input id="property-returnValue-demo" value="1" />',
//     ok: function () {
//         var value = $('#property-returnValue-demo').val();
//         this.close(value);
//         this.remove();
//     }
// });
d.addEventListener('close', function () {
    alert(this.returnValue);
});
d.show();


 */

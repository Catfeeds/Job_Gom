/**
 * 订单评价页面
 * @author zhaodonghong
 */
var discussText = require('./orderDiscuss');
var star = require('./star');
var upload = require('./upload');
var submit = require('./submit');











//评论textarea
discussText.init();

//评价星级
star.init();

//评论图片
upload.init();


//提交数据
submit.init();
var circleType = require('./circleType/index');
var circleName = require('./circleName/index');
var submit = require('./submit/index');
var cropper = require('module/cropper');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('createGroup');

//选择圈子类型
circleType.init();

//填写圈子名称
circleName.init();

//提交
submit.init();

//图片剪裁
cropper.init();

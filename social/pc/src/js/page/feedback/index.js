var chooseType = require('./chooseType');
var pictureUpload = require('./pictureUpload');
var messageInfo = require('./messageInfo');
var submit = require('./submit');

//选择留言类型
chooseType.init();
//留言内容
messageInfo.init();
//上传图片
pictureUpload.init();
//提交
submit.init();

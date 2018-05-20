var circleType = require('./circleType/index');
var circleName = require('./circleName/index');
var circleSelected = require('./circleSelected/index');
var circleIntroduce = require('./circleIntroduce/index');
var submit = require('./submit/index');
var cropper = require('module/cropper');
// 发送统计数据用
var buriedPoint = require('utils/buriedPoint');
buriedPoint.setPageData('createGroup');

//填写圈子名称
circleName.init();
//提交
submit.init();

//图片剪裁
cropper.init(function(){},{
	pick: {
        id: '[data-defaultAddFile=picker]',
        innerHTML: '修改',
        multiple: false
    }
});

//圈子分类(融合二期)
circleSelected.init();
//圈子介绍
circleIntroduce.init();
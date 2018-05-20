/**
 * 提交意见反馈信息
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');

var $typeList = $('[data-node=typeList]');
var $typeTip = $('[data-node=typeTip]');
var $messageTip = $('[data-node=messageTip]');
var $errorTip = $('[data-node=tipError]');
var $submit = $('[data-node=btnSubmit]');
var $message = $('[data-node=message]');

var hide = 'hide';

//隐藏意见反馈图标
$('[data-action=feedback]').parent().hide();

//验证留言类型
var validateType = function(option) {
    var ret = true;
    if (option.feedType === undefined) {
        $typeTip.removeClass(hide);
        ret = false;
    } else {
        $typeTip.addClass(hide);
    }
    return ret;
};

//验证留言内容
var validateMessage = function(option) {
    var ret = true;
    if (option.content === '' || option.content.length < 5) {
        ret = false;
        $messageTip.removeClass(hide);
    } else {
        $messageTip.addClass(hide);
    }
    return ret;
};

//验证上传截图
var validateImg = function() {
    var $imgList = $('[data-node=uploadList]').find('img');
    var json = {};
    for (var i = 0; i < $imgList.length; i++) {
        json[i] = $imgList.eq(i).attr('src');
    }
    var jsonData = JSON.stringify(json);
    var imgUrl = $imgList.length === 0 ? "" : jsonData;
    return imgUrl;
};

//获取参数
var getData = function() {
    var activeIndex = $typeList.find('a.active').attr('data-index');
    var imgUrl = validateImg();
    return {
        feedType: activeIndex,
        content: $message.val(),
        imgUrl: imgUrl
    };
};

//验证留言类型和留言内容
var validate = function(data) {
    var ret = true;
    if (!validateType(data)) {
        ret = false;
    } else if (!validateMessage(data)) {
        ret = false;
    }
    return ret;
};
//提交
var submit = function() {
    var info = getData();
    if (validate(info)) {
        fetch.post(url.get('feedback'), {
            validate: true,
            data: info,
            onLogin: function() {}
        }).done(function(data) {
            if (data.success === true) {
                $errorTip.addClass(hide);
                location.href = $_CONFIG.i_domain + 'feed/result?type=1';
            } else {
                $errorTip.removeClass(hide).text(data.message);
            }
        }).fail(function(data) {
            $errorTip.removeClass(hide).text(data.message);
        });
    }
};

var init = function() {
    //upload.init(3);
    $submit.on('click', submit);
};

module.exports = {
    init: init
};
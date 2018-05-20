var fetch = require("io/fetch");
var url = require('io/url');
var moduleTrim = require("utils/trim");
var tips = require('module/i18n');

var obj = require('../nickName/index');

var lgBox = $('[data-node=lg-main]');
var faceImg = lgBox.find('[data-node=faceImg]');
var nickName = lgBox.find('[data-node=nickname_input]');

var pubErrBox = lgBox.find('[data-node=publicErrBox]');
var pubErrTxt = lgBox.find('[data-node=publicErr]');

var subBtn = lgBox.find('[data-node=code_complete]');
var skipBtn = lgBox.find('[data-node=code_skip]');

var registOrNo = $GLOBAL_CONFIG['isRegist'];
var mainDomain = $GLOBAL_CONFIG['redirect'];
var passportDomain = $_CONFIG.passport_domain;

var noneCls = 'none';
var defaultImgSrc = faceImg.attr('src');
var nameFlag;

var jumpPage = function() {
    if (window.opener) {
        var date = new Date();
        date.setTime(date.getTime() + 10 * 1000); //10表示10秒钟
        $.cookie('temp_nick_name', 'true', {
            expires: date,
            path: '/',
            domain: '.gomeplus.com'
        });
    }
    if (registOrNo) {
        location.href = passportDomain + 'regist/indexover';
    } else {
        location.href = mainDomain;
    }
};

var handleSub = function(nameFlag) {
    var imgSrc = faceImg.attr('src');
    var name = nickName.val();
    var subData = {
        nickname: name
    };
    defaultImgSrc !== imgSrc ? subData.facePicUrl = imgSrc : void 0;
    if (nameFlag) {
        fetch.post(url.get('thirdstep'), {
            data: subData
        }).done(function(data) {
            if (!data.success) {
                pubErrBox.removeClass(noneCls);
                pubErrTxt.text(data.message);
            } else {
                pubErrBox.addClass(noneCls);
                jumpPage();
            }
        }).fail(function() {
            pubErrBox.removeClass(noneCls);
            pubErrTxt.text(tips.errLine.tip);
        });
    }
};
var subData = function() {
    obj.blur(handleSub);
};
var subEvent = function() {
    subBtn.on('click', subData);
    skipBtn.on('click', jumpPage);
};
module.exports = {
    init: subEvent
};
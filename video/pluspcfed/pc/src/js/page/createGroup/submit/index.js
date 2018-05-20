var Pubsub = require('io/pubsub');
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var inputTip = require("module/i18n");
var cropper = require('module/cropper');
var dialogAlert = require('module/popup/alert');
var popTpl = require('./submit.tpl');
var moduleTrim = require('utils/trim');

var option = {
    id: undefined, //圈子类型
    name: undefined, //圈子名称
    max_users: 1000, //圈子最大人数
    approval_type: 0, //圈子是否允许人加入 0:允许任何人加入	1:需要身份验证 2:不允许任何人加入
    introduction: undefined//圈子介绍
};
Pubsub('setItem').sub(function(Data) {
    option.id = Data;
});
Pubsub('circleName').sub(function(Data) {
    option.name = Data;
});
Pubsub('circleSelected').sub(function(Data) {
    option.introduction = Data;
});
function init() {
    $('[data-node=submit]').on('click', function() {
        var _this = this;
        cropper.getData() !== "" ? option.icon = cropper.getData() : option.icon = $_CONFIG.imgpath + '/images/public/circle-default.png';
        //"https://i6.meixincdn.com/v1/img/T12RCTBXCy1R4cSCrK.png"
        if (option.name === undefined || moduleTrim(option.name) === "") {
            alert(inputTip.createCircle.nameEmpty);
            return;
        }
        if (option.id === undefined) {
            alert(inputTip.createCircle.typeEmpty);
            return;
        }
        fetch.post(url.get("createCircle"), {
            data: option
        }).done(function(data) {
            if (data.code == 200) {
                $(_this).html('审核中').css('background', '#ccc').off();
                option.name = data.data.name;
                var Dialog = dialogAlert('', {
                    width: '600',
                    content: popTpl({
                        config: option
                    }),
                    close: function() {
                        Dialog.remove();
                        window.location.href = $_CONFIG.group_domain + 'circle/' + data.data.id + '.html';
                    },
                    ok: function(){
                        window.location.href = $_CONFIG.group_domain + 'circle/' + data.data.id + '.html';
                    }
                });
            } else {
                alert(data.message);
            }
        }).fail(function() {
            alert("数据请求失败 请稍后尝试");
        });
    });
};
module.exports = {
    init: init
};
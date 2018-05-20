var Pubsub = require('io/pubsub');
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var inputTip = require("module/i18n");
var cropper = require('module/cropper');
var dialogAlert = require('module/popup/alert');
var popTpl = require('./submit.tpl');
var moduleTrim = require('utils/trim');
var icon = $('[data-node=cropWrap] img').attr('src');
var option = {
    id: undefined, //圈子类型
    /*name: undefined, //圈子名称*/
    old_name:old_name,
    new_name:undefined,
    introduction: undefined,//圈子介绍
    group_id:group_id,
    icon : icon
};
Pubsub('setItem').sub(function(Data) {
    option.id = Data;
});
Pubsub('circleName').sub(function(Data) {
    option.new_name = Data;
});
Pubsub('circleSelected').sub(function(Data) {
    option.introduction = Data;
});
function init() {
    $('[data-node=submit]').on('click', function() {
        var _this = this;
        cropper.getData() !== "" ? option.icon = cropper.getData() : option.icon = option.icon;
        if (option.new_name === undefined || moduleTrim(option.new_name) === "") {
            alert(inputTip.createCircle.nameEmpty);
            return;
        }
        if (option.id === undefined) {
            alert(inputTip.createCircle.typeEmpty);
            return;
        }
        fetch.post(url.get("editCircle"), {
            data: option
        }).done(function(data) {
            if (data.code == 200) {
                window.location.href=$GLOBAL_CONFIG['group_domain']+'/circle/'+ group_id+'.html';            

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
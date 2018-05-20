var alert = require('module/popup/alert');

var unsuccessful = function(msg, relativePath) {
    /*alert(msg, {
        ok: function() {
            window.location.href = $_CONFIG.group_domain + relativePath;
        }
    });*/
    //页面强制跳转会对用户不友好，填写的数据可能会丢失！
    alert(msg);
}

var init = function(data) {
    var code;
    var msg = data.message;
    console.log(typeof data.code)
    switch (data.code) {
        case 101:
            code = 'group';
            msg = "图片超出限定数量";
            break;
        case 102:
            code = 'group';
            msg = "上传图片存在非法提交";
            break;
        case 103:
            code = 'group';
            msg = "商品超出限定数量";
            break;
        case 410:
            code = 'group_dissolve';
            break;
        case 403:
            code = 'group';
            msg = "抱歉，该圈子审核不通过！";
            break;
        case 404:
        case 422:
        case '911918':
            window.location.href = $_CONFIG.i_domain + 'expert/error_' + data.code + '.html';
            return;
        default:
            alert(data.message);
            return;
    }
    var relUrl = 'index/get_error?code=' + code;
    unsuccessful(msg, relUrl);
}
module.exports = {
    init: init
};

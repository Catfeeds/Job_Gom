var alert = require('module/popup/alert');

var unsuccessful = function(msg, code) {
    //页面强制跳转会对用户不友好，填写的数据可能会丢失！
    if(code == 403){
        alert(msg, {
            ok: function() {
                window.location.href = $EDITOR.GlobalVal.redirect;
            }
        });
    }else{
        alert(msg);
    }
    
    
}

var init = function(data) {
    var code;
    var msg = data.message;
    switch (data.code) {
        case 101:
            code = 'group';
            break;
        case 102:
            code = 'group';
            break;
        case 103:
            code = 'group';
            break;
        case 410:
            code = 'group_dissolve';
            break;
        case 403:
            code = 'group';
            break;
        case 404:
        case 422:
        case '911918':
            window.location.href = $EDITOR.GlobalVal.redirect || $EDITOR.GlobalVal.i_domain + 'expert/error_' + data.code + '.html';
            return;
        default:
            alert(data.message);
            return;
    }
    //var relUrl = 'index/get_error?code=' + code;
    unsuccessful(msg, data.code);
}
module.exports = {
    init: init
};

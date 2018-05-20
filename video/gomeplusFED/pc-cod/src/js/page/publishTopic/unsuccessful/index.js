var alert = require('module/popup/alert');

var unsuccessful = function(msg, relativePath) {
    alert(msg, {
        ok: function() {
            window.location.href = $_CONFIG.group_domain + relativePath;
        }
    });
}



var init = function(data) {
    var code;
    var msg = data.message;
    switch (data.code) {
        case 410:
            code = 'group_dissolve';
            break;
        case 403:
            code = 'group';
            msg = "抱歉，该圈子审核不通过！";
            break;
        case 404:
            code = '500';
            break;
        case 422:
            code = '500';
            break;
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
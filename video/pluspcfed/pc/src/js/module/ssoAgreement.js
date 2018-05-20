//一账通用户协议
//遮罩层添加 data-node="ssoMask"
//协议层添加 data-node="ssoMain"
//验证是否同意弹层协议  module.valid() - true/false

var ssoMask = $('[data-node=ssoMask]'),
    ssoMain = $('[data-node=ssoMain]'),
    btnClose = ssoMain.find('em.icon-btn'),
    btnAgree = ssoMain.find('a.pc-btnw300.pc-btn.pc-btnh45'),
    isAuthorized = false;

var init = function(url) {
    var _url = url || false;
    var agree = function() {
        ssoMask.addClass('hide');
        ssoMain.addClass('hide');
        isAuthorized = true;
    };
    var close = function() {
        if (_url) {
            location.href = _url;
            return false;
        }
        if (document.referrer == "") {
            location.href = $_CONFIG.group_domain;
        } else {
            location.href = document.referrer;
        }
    };
    btnAgree.on('click', agree);
    btnClose.on('click', close);
};

var valid = function() {
    return isAuthorized;
}

module.exports = {
    init: init,
    valid: valid
}

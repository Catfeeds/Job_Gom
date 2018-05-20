var loginPop = require('module/popup/login'); //登录弹窗
var checkLoginStatus = require('module/checkLoginStatus');
var alert = require('module/popup/alert');

var $node = $("[data-node=publishTopic]");

var gotoPage = function() {
    var href = $node.attr("href");
    location.href = href;
    return false;
}

var init = function() {
    $node.on("click", function() {
        if (!checkLoginStatus()) {
            loginPop(gotoPage);
            return false;
        }
    })
};

module.exports = {
    init: init
};

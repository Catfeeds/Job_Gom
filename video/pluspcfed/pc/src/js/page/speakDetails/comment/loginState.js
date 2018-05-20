// 判断登陆状态
var checkLoginStatus = require('module/checkLoginStatus'); // 登陆判断
var $comment_Msg = $("[data-node='comment_Msg']");
var $a_Submit = $("[data-node='a_Submit']");



//var getCommentList = require('./getCommentList'); //
var loginPop = require('module/popup/login'); //登录弹窗
//var checkLoginStatus = require('module/checkLoginStatus'); //登陆判断

//var $is_Login = checkLoginStatus() == true ? 1 : 0;


var getLoginState = function() {
    var ISLOGIN = null;
    if (!checkLoginStatus()) { //必须重新判断 别的无刷新事件修改了登录状态
        //没有登录
        ISLOGIN = "0";
        $comment_Msg.children("textarea").attr("readonly", "readonly").css("background", "#fff");
        $("[data-node='secondCom_Key']").css("display", "none");
    } else {
        $comment_Msg.children("textarea")
            .removeAttr("readonly").css("background", "transparent");

        $a_Submit.removeClass("pc-bj-fc8753").html("发布");

        $("[data-node='secondCom_Key']").css("display", "block");
        //添加事件
        ISLOGIN = "1";
    }
    return ISLOGIN;
}

// var loginCallback = function() {
//     $is_Login = 1;
//     getLoginState();
//     $(".topic-publish-content").children("textarea").removeAttr("readonly").css("background", "transparent");
//     $(".publish-face-bx").children("a").removeClass("pc-bj-fc8753").html("发布");
//     //$("[data-node=circleCom]").empty();
//     //getCommentList(1, 10, 2);
// }

var popUnion = function() {
    loginPop();
}

var commentCheck = function() {
    if (!checkLoginStatus()) {
        popUnion();
        return false;
    }
}

module.exports = {
    getLoginState : getLoginState,
    popUnion : popUnion,
    commentCheck :commentCheck
};




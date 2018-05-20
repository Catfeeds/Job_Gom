/*话题详情页 v2版本改造*/

require('lazyload');
var face = require('module/popup/face/face');
//var loginPop = require('module/popup/login'); //登录弹窗
//var checkLoginStatus = require('module/checkLoginStatus'); // 登陆判断

var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var identify = require('utils/IdentifyIE8-');

var getCommentList = require('./getCommentList'); //
var a_Submit = require('./a_submit'); //
var secondComBtn = require('./a_secondComBtn'); //
var showMoreList = require('./showMoreList'); //
var loginState = require('./loginState');
var Smiley = require('./Smiley');
var otherFn = require('./otherFn');

var $loadlist = $("[data-node='loadlist']");
var $comment_Msg = $("[data-node='comment_Msg']");
//var $a_Submit = $("[data-node=a_Submit]");
//var $circleCom = $("[data-node=circleCom]");
var clickTopicId = $_CONFIG['topicid'];

var DIVOBJ = $("[data-node='more-topic']");
var textareaTips = '[data-node="textareaTips"]';
var hide = 'hide';

$loadlist.css("display", "none");
$("[data-node='loading']").css("display", "none");
$("[data-node='noload']").css("display", "none");
$("[data-node='imgUl']").addClass("hide");

var commentDomInit = function() {
    $comment_Msg.on('click', loginState.commentCheck)

    DIVOBJ.on("click", "[data-node='a_Submit']", a_Submit);
    //$a_Submit.on("click", $); //一级话题回复 绑定事件
    DIVOBJ.on("click", "[data-node='secondCom_Key']", secondComBtn.secondCom_Key); //显示二级回复框
    DIVOBJ.on("click", "[data-node='hideComBox']", secondComBtn.hideComBox); //点击收起 按钮，隐藏二级输入框
    DIVOBJ.on("click", "[data-node='a_secondComBtn']", secondComBtn.a_secondComBtn); //二级话题回复
    DIVOBJ.on('click', '[data-node="smilies_Face"]', Smiley.showEmoji); //表情添加
    DIVOBJ.on("click", "[data-node='showMoreList']", showMoreList); // 二级列表
    if (identify()) {
        DIVOBJ.on('keydown', 'textarea', hideTextareaTips);
        DIVOBJ.on('blur', 'textarea', showTextareaTips);
    }

}

// placeholder显示隐藏
var hideTextareaTips = function() {
    var $this = $(this);
    $this.parent($comment_Msg).find(textareaTips).addClass(hide);
}
var showTextareaTips = function() {
    var $this = $(this);
    var textVal = $.trim($this.val());
    $this.val(textVal);
    if (textVal.length) {
        $this.parent($comment_Msg).find(textareaTips).addClass(hide);
    } else {
        $this.parent($comment_Msg).find(textareaTips).removeClass(hide);
    }
}

var init = function() {
    //登陆状态以及事件绑定
    if (loginState.getLoginState()) {
        face.insert(function(data) {
            Smiley.insertAtCursor(Smiley.curretTextAreaObj(), data.reg);
        });

    }
    getCommentList({
                    id: clickTopicId,
                    currPage: 1,
                    pageSize: 10,
                    listSize: 2
                }); //评论列表
    commentDomInit(); //事件绑定
    otherFn.lodingMore(); //一级评论列表加载更多
    otherFn.goComment(); // 点击评论图标页面滚动到评论区域
    face.init(); // 初始化表情
    $("img").lazyload({
        effect: "fadeIn"
    });
}

// 订阅
Pubsub(channel.comment.enableEditor).sub(function(data) {
    if (data.pid == "enable") {
        loginState.getLoginState();
    }
});

module.exports = {
    init: init,
    getLoginState: loginState.getLoginState
}

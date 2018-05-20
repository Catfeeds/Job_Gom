// 删除自己发布的话题
var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');
// //提交请求
//        fetch.post(url.get('commentFirstV2'), {
//            data: params
//        }).then(function(data) {

var init = function() {
    $("body").on("click", '[data-node="userTopic-del"]', deletTopic);

}

var deletTopic = function() {
    var $this = $(this);
    var id = $($this.parents().eq(2)).attr('data-left');
    confirm('', {
        content: "<p class='del-pop-p' data-node='gettopId' data-topicH=" + id + ">确定要删除该话题吗？</p>",
        title: '提示',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        ok: sendMsg,
        btnWrapCls: 'text-center'
    });
}
var sendMsg = function() {
    var groupid = $_CONFIG['groupid'];
    var idd = {
        id: $("[data-node='gettopId']").attr('data-topicH'),
        groupId:groupid
    };

    fetch.post(url.get('topicDel'), {
        data: idd
    }).then(function(data) {
        if (data.success) {
            location.replace($GLOBAL_CONFIG['group_domain'] + 'circle/' + groupid + '.html');
        } else {
            alert("删除失败！");
        }
    });
}
module.exports = {
    init: init
};

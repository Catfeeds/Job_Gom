// 删除话题
var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');

var deletTopic = function(options) {
    confirm('', {
        content: "<p class='del-pop-p'>" + options.content + "</p>",
        title: '提示',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        ok: function(){
            sendMsg(options.id,options.groupid,options.res)
        },
        btnWrapCls: 'text-center'
    });
}
var sendMsg = function(id,groupid,res) {
    fetch.post(url.get('topicDel'), {
        data: {
            id: id,
            groupId: groupid
        }
    }).done(function(data) {
        if (data.success === true) {
            res();
        } else {
            alert("删除失败！");
        }
    });
}
module.exports = deletTopic;

/**
 * 话题收藏/取消收藏
 */
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');

var login = function() {
    window.location.href = $_CONFIG.passport_domain + 'login/index';
};
var $collect = $("[data-node=collect]");
if ($collect.children("em").parent().hasClass("active")) {
    $collect.children("span").html("取消收藏");
   // $collect.attr("data-status","1");
}


var init = function() {
    var $body = $("body");
    $body.on('click',"[data-node=collect]", function() {
        var $CONF = $_CONFIG;
        if (window.BP) {
            BP.send({
                event_id: 'G000P008',
                group_id: $CONF.groupid,
                topic_id: $($(this).parents()[2]).attr("data-conter-ul"),
                circle_type: $CONF.s_c,
                channel_id: 'in-shoucang'
            });
        }

        var $this = $(this);
        var firing = $this.data('firing');
        if (firing) {
            return false;
        }
        $this.data('firing', 1);
        var iscollect = $this.data('status');
        // 1 收藏, 2 取消收藏
        var t = iscollect === 0 ? 1 : 2;

        //console.log($($this.parents()[2]).attr("data-conter-ul"));
        var objs = {
                    validate: true,
                    data: {
                        groupId: $_CONFIG['groupid'],
                        topicId: $($this.parents()[2]).attr("data-conter-ul"),
                        type: t
                    },
                    onLogin: noRefreshFetch,
                    refresh:true    // 目前登录和收藏需要刷新页面
                }

        //无刷新登录
        function noRefreshFetch (o) {
            fetch.post(url.get('collectTopic'), o).done(function(data) {
                //订阅评论区编辑状态
                Pubsub(channel.comment.enableEditor).pub({
                    pid: "enable"
                });
                if (data && data.code === 200 && data.success) {
                    if (t === 1) {
                        $this.data('status', 1);
                        $this.find('em').parent().addClass('active');
                        $this.find('span').text('取消收藏');
                    } else if (t === 2) {
                        $this.data('status', 0);
                        $this.find('em').parent().removeClass('active');
                        $this.find('span').text('收藏');
                    }
                } else if (data && data.code === 422) {
                    login();
                } else {
                    alert(data.message);
                }
            }).fail(function() {

            }).always(function() {
                $this.data('firing', 0);
            });
        }

        noRefreshFetch(objs);
        return false;
    });
};

module.exports = {
    init: init
};

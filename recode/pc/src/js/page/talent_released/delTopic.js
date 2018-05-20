var toast = require('module/hint').init;
var fetch = require('io/fetch');
var url = require("io/url");
var confirm = require('module/popup/confirm');

var $releasedList = $('[data-node=releasedList]');
var $noTopic = $('[data-node=noTopic]');

if ($.cookie('scroll_top')) {
    $(document).scrollTop($.cookie('scroll_top'));
}
//删除话题
$releasedList.on('click', '[data-action=delTopic]', function() {
    var $topicItem = $(this).parents('[data-node=topicItem]');
    var topicId = $topicItem.data('topicid');
    var groupId = $topicItem.data('groupid');
    var da = {
        "tid": topicId,
        "gid": groupId
    };
    confirm('确认删除此条话题吗？', {
        okCls: 'pc-btn pc-btnh35',
        title: '提示',
        ok: function() {
            fetch.get(url.get('delTopic'), {
                data: da
            }).done(function(result) {
                if (result.code == 200) {
                    var scrollTop = $(document).scrollTop();
                    $.cookie('scroll_top', scrollTop);
                    toast('话题已删除！', {
                        callback: function() {
                            window.location.href = window.location;
                        }
                    });
                } else if (result.code == 404) {
                    toast(result.message, {
                        callback: function() {
                            window.location.href = window.location;
                        }
                    });
                } else {
                    toast(result.message);
                }
            })
        }
    })
});

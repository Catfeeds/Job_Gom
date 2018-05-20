var toast = require('module/hint').init;
var fetch = require('io/fetch');
var url = require("io/url");
var confirm = require('module/popup/confirm');

var $releasedList = $('[data-node=releasedList]');



function listDel(fn){
    //删除话题
    $releasedList.on('click', '[data-action=delTopic]', function() {
        var t = typeof fn
       console.log(t == 'function', typeof t)
        var $topicItem = $(this).parents('[data-node=topicItem]');
        var topicId = $topicItem.data('topicid');
        var groupId = $topicItem.data('groupid');
        var da = {
            "tid": topicId,
            "gid": groupId
        };
        confirm('删除文章后将不可恢复，确认删除？', {
            okCls: 'pc-btn pc-btnh35 ok-btn',
            cancelCls:'cancel-btn',
            ok: function() {
                fetch.get(url.get('delTopic'), {
                    data: da
                }).done(function(result) {
                    if (result.code == 200) {
                         $topicItem.remove();
                        toast('话题已删除！', {
                            callback: function() {  
                                if(typeof fn == 'function'){
                                    fn();                                    
                                 }else{
                                    window.location.href = window.location;
                                 }

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
}

module.exports = listDel;

/*
 *@author:dongyukuan
 *@desc:删除草稿
 *@date:2017/6/12
 */

var fetch = require('io/fetch');
var url = require("io/url");
var toast = require('module/hint').init;
var confirm = require('module/popup/confirm');

var $draftListBox = $('[data-node=draftListBox]');

$draftListBox.on('click', '[data-action=delTopic]', function() {
    var $this = $(this);
    var topicId = $this.parents('li').attr('data-id');
    confirm('确认要删除该话题吗？', {
        title: '提示',
        okCls:'pc-btn pc-btnh35',
        cancelCls:'two-button cancelPop',
        ok: function() {
            fetch.get(url.get('delDraft'), {
                data: { tid: topicId }
            }).done(function(result) {
                if (result.code == 200) {
                    var scrollTop = $(document).scrollTop();
                    $.cookie('scrollTop', scrollTop);
                    toast('话题已删除！', {
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
})

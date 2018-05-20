var fetch = require('io/fetch');
var url = require("io/url");
var alert = require('module/popup/alert');

var $draftListBox = $('[data-node=draftListBox]');
$draftListBox.on('click', '[data-node=editorTopic]', function() {
    var tid = $(this).parents('li').attr('data-id');
    var _src = $(this).attr('data-src');
    fetch.get(url.get('draftsDetail'), {
        data: {
            tid: tid
        },
        async: false
    }).done(function(result) {
        if (result.code == 200) {
            window.open(_src, '_blank');
        } else if (result.code == 911918) {
            alert(result.message, {
                title: '提示',
                ok: function() {
                    window.location.href = window.location;
                }
            })
        }
    })
})

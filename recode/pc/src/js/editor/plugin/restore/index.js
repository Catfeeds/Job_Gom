var fetch = require('io/fetch');
var url = require('io/url');

var restoreContent = require('../../utils/restoreContent');

var editPath = $GLOBAL_CONFIG['from']; //0 新页面  1 编辑话题  2  草稿
var editKey = $GLOBAL_CONFIG['tid'];
var unsuccessful = require('page/publishTopic/unsuccessful');
var imgReplace = require('utils/imgReplace');

function restoreData(editor) {
    //加载草稿箱
    if (editPath == undefined) return;

    switch (editPath) {
        case '0':
            return;
        case '1':
            $("[data-action=save]").remove();
    }

    var datas;
    var _url;
    switch (editPath) {
        case '1':
            datas = {
                tid: editKey
            }
            _url = url.get('readTopicData');
            break;
        case '2':
            datas = {
                tid: editKey
            }
            _url = url.get('readTopicDraftsData');
    }

    fetch.get(_url, {
        data: datas
    }).done(function(data) {
        if (data.success === true) {
            var strs = restoreContent(data);
            editor.execCommand('inserthtml', strs);
            setTimeout(function() {
                imgReplace.changeSrc($(editor.body));
            }, 2000)

        } else {
            unsuccessful.init(data);
        }

    }).fail(function(data) {
        console.log(data, "err")
    })
}

module.exports = restoreData;

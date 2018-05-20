var fetch = require('io/fetch');
var url = require('io/url');

var restoreContent = require('../../utils/restoreContent');
var unsuccessful = require('./unsuccessful');
var imgReplace = require('utils/imgReplace');


/*var editPath = $EDITOR.GlobalVal.from; //0 新页面  1 编辑话题  2  草稿
var porject = $EDITOR.GlobalVal.channel || '';
var editKey = $EDITOR.GlobalVal.tid;


function restoreData1(editor) {
    //加载草稿箱
    if (!editPath ) return;

    switch (editPath) {
        case '1':
            $("[data-action=save]").remove();
    }

    var datas;
    var _url = $EDITOR.Urls.restoreTopicData;
    //使用pc端的配置
    function usePcPath(){
        switch (editPath) {
            case '1':
                if(porject == 'meihao'){//美号请求地址
                     _url = url.get('readMeihaoTopicData');
                }else{
                    _url = url.get('readTopicData');
                }
                
                break;
            case '2':
                _url = url.get('readTopicDraftsData');
        }
    }
    


    if(!_url){
        usePcPath();
    }

    datas = {
    //    tid: editKey
        article_id: article_id
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
*/


/**
 * 处理读取数据
 * 
 * @林飞
 */

UE.plugin.register('restoreData', function (){
    var me = this; 
    me.addListener('ready',function(){
        var data = $EDITOR.GlobalVal.restoreData
        if(data.length){
            var strs = restoreContent(data);
            me.execCommand('inserthtml', strs);
            //var $p = $(editor.body).find('p');
            //$p[$p.length -1].remove()
            setTimeout(function() {
                imgReplace.changeSrc($(me.body));
            }, 300)
        } 
    })
                         
})
//module.exports = restoreData;

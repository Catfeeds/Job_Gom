var opt = {};
var loadPlugins = null;
var goodsMask = null;
var filterTxtRules = null;
var restoreData=null;
var defaultOptions = require('./conf');

require('module/imgError');

var loadConfig = require('editor/loadConfig');

//绑定监听事件
var loadInstanceEvent = require('editor/event');
var init = function(id, options) {
    id = id || 'editor';

    var opts = loadConfig(id,options);
    //loadUserConfig($EDITOR.GlobalVal);
/******************编辑器之前的***********************/

    //没有ID 并且UE存在实例
    if(!document.getElementById(id) || !$.isEmptyObject(UE.instants)){
        return false;
    }

    var editor = UE.getEditor(id,opts);
    
    loadInstanceEvent(id);

    return editor;
};
/*
init("editor",{
        GlobalVal:{
            //imgpath:'aaa.com'
        },
        Buttons:{
            //使用视频
            video:{
                use:false
            }
        },
        Components:{
            //商品类型 1: 默认带搜索   2: tab
            goodsType:1
        },
        Urls:{
            //查询视频地址
            //getVideoPath:'/aaa.json'
            getCollectItem:''

        }
    });
*/
module.exports = init;

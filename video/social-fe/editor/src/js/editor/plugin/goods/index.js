/**
 * 插入商品
 * @author Fu Xiaochun
 */

var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var empty = require('module/empty');
var toast = require('module/hint').init;
var registGoodsPubsub  = require('./registGoodsPubsub');
//if($GLOBAL_CONFIG['channel'] == "meidian"){

if($EDITOR.Buttons.goodsType == 2 || $EDITOR.GlobalVal.channel == "meidian" ){
    var dialog = require('module/popup/addGoods/addMeidianGoods/index');
}else{
    var dialog = require('module/addGoods');
}

var goodsTpl = require('./goods.tpl');

var imgReplace = require('utils/imgReplace');
//var detectQr = require('../detectQr');
//var maxLen = 9;

var restoreData = $EDITOR.GlobalVal.restoreData;
var insertedGoods = {};

//插入草稿 延迟1s执行
if (restoreData) {
    setTimeout(function() {
        //insertedGoods = window.insertedGoods;

    }, 1000)
}


var getEditor = function(){
    return UE.getEditor($EDITOR.GlobalVal.editorId);
}

UE.registerUI('insertgoods', function(editor, uiName) {


    var restoreData = $EDITOR.GlobalVal.restoreData;
    var insertedGoods = $EDITOR.GlobalVal.insertedGoods || {};

    //插入草稿 延迟1s执行
    if (restoreData) {
        setTimeout(function() {
            insertedGoods = $EDITOR.GlobalVal.insertedGoods;

        }, 1000)
    }



    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            var $content = $(editor.body);
            var $goodsDoms = $content.find('[data-type=insertGoods]');
            var goodsLen = $goodsDoms.length;
            var goodsData = {};

            insertedGoods = $EDITOR.GlobalVal.insertedGoods || {};

            if (goodsLen) {
                if (empty(insertedGoods)) {
                    for(var i =0;i<goodsLen;i++){
                        (function(j){
                            goodsData = $($goodsDoms[j]).data('info');
                            insertedGoods[goodsData.skuId] = goodsData;
                        })(i)
                    }
                } else {
                    $.each(insertedGoods, function(k) {
                        var len = $content.find('[data-skuId=' + k + ']').length;
                        if (!len) {
                            delete insertedGoods[k];
                        }
                    });
                }

            } else {
                insertedGoods = {};
            }
            dialog(insertedGoods, 9);
        }
    });

    // 插入后激活光标
    editor.addListener('afterinserthtml', function() {
        editor.focus();
    });

    // 接收商品
    registGoodsPubsub()
    

    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertgoods',
        title: '插入商品',
        label: '',
        iconEle: '<em class="insert-merchant iconn-29"></em>',
        cssRules: '',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}, 0);

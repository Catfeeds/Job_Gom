/**
 * 插入商品
 * @author Fu Xiaochun
 */

var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var empty = require('module/empty');

var dialog = require('module/addGoods');
var goodsTpl = require('./goods.tpl');

//var maxLen = 9;
var insertedGoods = {};
//var tempChangeGoods = [];

UE.registerUI('insertgoods', function(editor, uiName) {

    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            var $content = $(editor.body);
            var $goodsDoms = $content.find('[data-type=insertGoods]');
            var goodsLen = $goodsDoms.length;
            var goodsData = {};

            if (goodsLen) {
                if (empty(insertedGoods)) {
                    goodsData = $goodsDoms.data('goodsinfo');
                    insertedGoods[goodsData.PId] = goodsData;
                } else {
                    $.each(insertedGoods, function(k) {
                        var len = $content.find('[data-pid=' + k + ']').length;
                        if (!len) {
                            delete insertedGoods[k];
                        }
                    });
                }

            } else {
                insertedGoods = {};
            }
            dialog(insertedGoods);
        }
    });

    // 插入后激活光标
    editor.addListener('afterinserthtml', function() {
        editor.focus();
    });

    // 接收商品
    Pubsub(channel.setPubliser.changedItem).sub(function(data) {
        insertedGoods = $.extend(true, {}, data);
        //var goodsData = [];
        var $content = $(editor.body);

        var $goodsCards = $content.find('[data-type=insertGoods]');
        $.each($goodsCards, function(i, e) {
            var pid = $(e).data('pid');
            var $eParent = $(e).parent('div');
            var $preDom = $eParent.prev('p');
            var preDomTxt = $.trim($preDom.text());

            if (typeof data[pid] === 'undefined') {
                if (!preDomTxt.length) {
                    $preDom.remove();
                }
                $eParent.remove();
            }
        });

        $.each(data, function(k) {
            var $goodsCard = $content.find('[data-pid=' + k + ']');
            if ($goodsCard.length) {
                delete data[k];
            }
        });
        var goodsHTML = goodsTpl({
            list: data
        });
        editor.focus();
        editor.execCommand('insertgoodshtml', goodsHTML, true);
    });

    //创建一个button
    var btn = new UE.ui.Button({
        name: 'insertgoods',
        title: '插入商品',
        label: '商品',
        iconEle: '<em class="insert-merchant iconn-29"></em>',
        cssRules: '',
        onclick: function() {
            editor.execCommand(uiName);
        }
    });

    //因为你是添加button,所以需要返回这个button
    return btn;
}, 2);
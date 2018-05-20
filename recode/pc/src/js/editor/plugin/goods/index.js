/**
 * 插入商品
 * @author Fu Xiaochun
 */

var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var empty = require('module/empty');
var toast = require('module/hint').init;

var dialog = require('module/addGoods');
var goodsTpl = require('./goods.tpl');

var imgReplace = require('utils/imgReplace');
//var detectQr = require('../detectQr');
//var maxLen = 9;

var from = $GLOBAL_CONFIG['from'];
var insertedGoods = {};

//插入草稿 延迟2s执行
if (from) {
    setTimeout(function() {
        insertedGoods = window.insertedGoods;
    }, 2000)
}

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
                    insertedGoods[goodsData.skuId] = goodsData;
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
    Pubsub(channel.setPubliser.changedItem).sub(function(data) {
        var range = editor.selection.getRange();
        var DomArr = editor.selection.getStartElementPath();
        var startDom = DomArr[DomArr.length - 2];
        var creatNewP = 0;
        var nextNode = startDom.nextElementSibling;
        if (startDom.nodeName == "OL" || startDom.nodeName == "UL") {
            toast('列表状态下不能插入商品', {
                duration: 2000
            });
            return false;
        }

        if (nextNode && nextNode.nodeName == 'DIV') {
            creatNewP = 1;
        }

        insertedGoods = $.extend(true, {}, data);
        var $content = $(editor.body);
        var $goodsCards = $content.find('[data-type=insertGoods]');
        $.each($goodsCards, function(i, e) {
            var skuId = $(e).data('skuid');
            var $eParent = $(e).parent('div');
            var $preDom = $eParent.prev('p');
            var preDomTxt = $.trim($preDom.text());
            if (typeof data[skuId] === 'undefined') {
                $content.find('[data-skuId=' + skuId + ']').parent().remove();
            }
        });
        $.each(data, function(k) {
            var $goodsCard = $content.find('[data-skuId=' + k + ']');
            if ($goodsCard.length) {
                delete data[k];
            }
        });

        var goodsHTML = goodsTpl({
            list: data
        });
        editor.focus();

        if (creatNewP) {
            goodsHTML = $.trim(goodsHTML) + '<p>&#8203<br/></p>' //编辑器bug 必须用trim
        }
        goodsHTML = imgReplace.imgReplace(goodsHTML);
        editor.execCommand('insertgoodshtml', goodsHTML, true);

        setTimeout(function() {
            var $body = $(editor.body); //节点已经变化，重新获取
            var $el = $body.find('[data-node="gmp-ebox"]').last();
            var $li = $el.parent('li');
            var $parent = $li.parent();
            var $next = $parent.next();
            if (!$next.length) {
                $parent.append("<li><p>&#8203<p></li>");
                editor.focus();
            }

        }, 200)
    });

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

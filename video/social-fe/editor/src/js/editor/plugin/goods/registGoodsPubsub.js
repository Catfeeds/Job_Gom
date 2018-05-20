
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var empty = require('module/empty');
var toast = require('module/hint').init;
var alert = require('module/popup/alert');
var goodsTpl = require('./goods.tpl');

var imgReplace = require('utils/imgReplace');

var getEditor = function(){
    return UE.getEditor($EDITOR.GlobalVal.editorId);
}


var registGoodsPubsub = function(){
    /*if(!UE.registPubsub){
        UE.registPubsub = {};
    }

    if(UE.registPubsub.insertGoodsPubSub == 1) return;
    UE.registPubsub.insertGoodsPubSub = 1; */

    Pubsub(channel.setPubliser.changedItem).sub(function(data) {
        var range = getEditor().selection.getRange();
        var DomArr = getEditor().selection.getStartElementPath();
        var startDom = DomArr[DomArr.length - 2];
        var creatNewP = 0;
        var nextNode = startDom.nextElementSibling;

        if (startDom.nodeName == "OL" || startDom.nodeName == "UL") {
            if(!UE.browser.ie){
                toast('列表状态下不能插入商品', {
                    duration: 2000
                });
            }else{
                alert('列表状态下不能插入商品');
            }
            
            return false;
        }

        if (nextNode && nextNode.nodeName == 'DIV') {
            creatNewP = 1;
        }
        
        $EDITOR.GlobalVal.insertedGoods = $.extend(true, {}, data);

        var $content = $(getEditor().body);
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

        getEditor().focus();

        if (creatNewP) {
            goodsHTML = $.trim(goodsHTML) + '<p>&#8203<br/></p>' //编辑器bug 必须用trim
        }

        goodsHTML = imgReplace.imgReplace(goodsHTML);
        //editor.execCommand('insertgoodshtml', goodsHTML, true);
        getEditor().execCommand('insertgoodshtml', goodsHTML, true);

        setTimeout(function() {
            var $body = $(getEditor().body); //节点已经变化，重新获取
            var $el = $body.find('[data-node="gmp-ebox"]').last();
            var $li = $el.parent('li');
            var $parent = $li.parent();
            var $next = $parent.next();
            if (!$next.length) {
                $parent.append("<li><p>&#8203<p></li>");
                getEditor().focus();
            }

        }, 200)
    });
}

module.exports = registGoodsPubsub;
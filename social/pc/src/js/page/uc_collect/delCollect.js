/**
 * 删除收藏的商品、店铺、话题
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var confirm = require('module/popup/confirm');
var checkLoginStatus = require('module/checkLoginStatus');

var $collectList = $('[data-node=collectList]');
var dataListBox = '[data-node=dataListBox]';
var $tabListA = $('[data-node=tabList] a.active');
var $delAll = $('[data-action=delAll]');
var delPopUp = '[data-node=delPopUp]';
var showDelLayer = '[data-action=showDelLayer]';
var hideDelLayer = '[data-action=cancelDel]';
var delOne = '[data-action=delOne]';
var selectOne = '[data-action=selectOne]';

var type = $tabListA.data('type');
var active = 'active';
var hide = 'hide';
var removeDel = 'remove-del';

var param = {
    url: {
        goods: url.get('delCollectGoods'),
        shop: url.get('delCollectShop'),
        topic: url.get('delCollectTopic')
    },
    tipsMsg: {
        goods: '您确定要删除收藏商品吗',
        shop: '您确定要删除收藏店铺吗',
        topic: '您确定要删除收藏话题吗'
    },
    notChoose: {
        goods: '请选择要删除的商品',
        shop: '请选择要删除的店铺',
        topic: '请选择要删除的话题'
    }
};

//显示/隐藏删除层
var delLayer = function() {
    var $this = $(this);
    var $item = $this.parents(dataListBox);
    $collectList.find(delPopUp).addClass(hide);
    if (!$item.hasClass(removeDel)) {
        $collectList.find(dataListBox).removeClass(removeDel);
        $item.addClass(removeDel);
        $item.find(delPopUp).removeClass(hide);
    } else {
        $item.removeClass(removeDel);
        $item.find(delPopUp).addClass(hide);
    }
};

//单个商品删除
var delSingle = function() {
    var $this = $(this);
    var $item = $this.parents(dataListBox);
    var delId = $item.attr('id');
    fetch.post(param.url[type], {
        validate: true,
        data: {
            ids: delId
        }
    }).done(function(data) {
        if (data.success === true) {
            $item.remove();
            window.location.reload();
        } else {
            alert(data.message);
        }
    }).fail(function(data) {
        if (checkLoginStatus()) alert(data.message);
    });
    return false;
};

//全选商品删除
var getIds = function() {
    var del = [];
    var selectList = $('[data-action=selectOne].active').parents(dataListBox);
    $.each(selectList, function() {
        del.push($(this).attr('id'));
    });
    var delIDs = del.join(',');
    return delIDs;
};

var confirmDel = function(options) {
    confirm('', {
        content: '<p class="pay-pop-p del-pop-p"><em class="iconn-25"></em>' + options.content + '</p>',
        title: '删除',
        okCls: '',
        ok: function() {
            fetch.post(param.url[type], {
                validate: true,
                data: {
                    ids: options.ids
                }
            }).done(function(data) {
                if (data.success === true) {
                    $('[data-action=selectOne].active').parents(dataListBox).remove();
                    window.location.reload();
                } else {
                    alert(data.message);
                }
            }).fail(function(data) {
                if (checkLoginStatus()) alert(data.message);
            });
        }
    });
};

var delMultiple = function() {
    var ids = getIds();
    var options = {
        content: param.tipsMsg[type],
        notChoose: param.notChoose[type],
        ids: ids
    };
    if (!$(selectOne).hasClass(active)) {
        alert(options.notChoose);
        return;
    }
    confirmDel(options);
    return false;
};

var init = function() {
    $collectList.on('click', showDelLayer, delLayer);
    $collectList.on('click', hideDelLayer, delLayer);
    $collectList.on('click', delOne, delSingle);
    $delAll.on('click', delMultiple);
};

module.exports = {
    init: init
};
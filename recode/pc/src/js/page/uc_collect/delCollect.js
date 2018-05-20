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
if (type == undefined) {
    type = 'collect';
}

var param = {
    url: {
        goods: url.get('delCollectGoods'),
        published: url.get('delPublishedTopic'),
        collect: url.get('delCollectTopic')
    },
    tipsMsg: {
        goods: '您确定要删除收藏商品吗',
        shop: '您确定要删除收藏店铺吗',
        collect: '确定要删除选中的话题吗'
    },
    notChoose: {
        goods: '请选择要删除的商品',
        shop: '请选择要删除的店铺',
        collect: '请选择要删除的话题'
    }
};

//显示/隐藏删除层
var delLayer = function() {
    var $this = $(this);
    var $item = $this.parents(dataListBox);
    $collectList.find($(delPopUp)).addClass(hide);
    if (!$item.hasClass(removeDel)) {
        $collectList.find(dataListBox).removeClass(removeDel);
        $item.addClass(removeDel);
        $item.find($(delPopUp)).removeClass(hide);
    } else {
        $item.removeClass(removeDel);
        $item.find($(delPopUp)).addClass(hide);
    }
};

//单个删除
var delSingle = function() {
    var $this = $(this);
    var $item = $this.parents(dataListBox);
    var delId = $item.attr('delId');
    var id = $item.attr('id');
    var groupId = $item.attr('groupId');
    fetch.post(param.url[type], {
        validate: true,
        data: {
            ids: delId,
            tid: id,
            gid: groupId
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

//批量删除
var getIds = function() {
    var delId = [];
    var id = [];
    var groupId = [];
    var selectList = $('[data-action=selectOne].active').parents(dataListBox);
    $.each(selectList, function(i, v) {
        delId.push($(this).attr('delId'));
        id.push($(this).attr('id'));
        groupId.push($(this).attr('groupId'));
    });
    var delIDs = delId.join(',');
    var ids = id.join(',');
    var groupIds = groupId.join(',');
    return {
        delIDs: delIDs,
        ids: ids,
        groupIds: groupIds
    };
};

var confirmDel = function(options) {
    confirm('', {
        content: '<p class="del-pop-p">' + options.content + '</p>',
        okCls: 'two-button two-button-red',
        cancelCls: 'two-button',
        btnWrapCls: 'text-center',
        ok: function() {
            fetch.post(param.url[type], {
                validate: true,
                data: {
                    ids: options.ids,
                    tid: options.tid,
                    gid: options.gid
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
    var idAll = getIds();
    var options = {
        content: param.tipsMsg[type],
        notChoose: param.notChoose[type],
        ids: idAll.delIDs,
        tid: idAll.ids,
        gid: idAll.groupIds
    };
    if (!$(selectOne).hasClass(active)) {
        alert(options.notChoose);
        return;
    }
    confirmDel(options);
    return false;
};

var init = function() {
    $collectList.on('click', showDelLayer, delLayer); //显示/隐藏删除层
    $collectList.on('click', hideDelLayer, delLayer); //取消删除
    $collectList.on('click', delOne, delSingle); //单个删除
    $delAll.on('click', delMultiple); //批量删除
};

module.exports = {
    init: init
};

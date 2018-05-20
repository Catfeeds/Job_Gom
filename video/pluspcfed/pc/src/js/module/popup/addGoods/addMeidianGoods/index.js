/*
    create by linfei
    2017/12/10
*/

var dialog = require('module/popup/addGoods/dialog');
var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var tpl = require('module/popup/addGoods/content.tpl');
var itemlist = require('module/popup/addGoods/itemContent.tpl');
var defaultItemlist = require('module/popup/addGoods/defaultItemContent.tpl');
var addTpl = require('module/popup/addGoods/addToMeidian.tpl');
var pubName = require('io/channel');
var indexof = require('lodash/indexOf');
var alert = require('module/popup/alert');

var commFunc = require('./commFunc');
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

//构造函数
var CollTab = require('./CollTab');
var RecTab = require('./RecTab');

//公共
var maxlength = 9;
var changedList = [];
var options = {};
var addDialog;
var selectedGoods = {};

var $title = null,
    $listBox = null,
    $changeList = null,
    $changeNum = null,
    $tabTitleGoods = null,
    $tabBodyGoods = null,
    $tabRec = null,
    $addMeidian = null;


//是否展示美店的节点
var $showShopBtn = $('[data-node="show-meidian"]').find('span');

function getGlobalNode(){
    $title = $('[data-node="title"]');
    $listBox = $('[data-node="changedBox"]');
    $changeList = $listBox.find('[data-node="searchChangeList"]');
    $changeNum = $('[data-node="searchChangeNum"]');
    $tabTitleGoods = $('[data-node="tab-title-goods"]');
    $tabBodyGoods = $('[data-node="tab-body-goods"]');
    $tabRec = $('[data-node="tab-rec"]');
    $addMeidian = $("[data-node='add-to-meidian']");
}


var init = function(changedGoods, max  ) {
    var returnList = [];
    selectedGoods = {};
    for (var i in changedGoods) {
        changedList.push(i);
        returnList.push(changedGoods[i]);
    }
    
    maxlength = max || 9;
    selectedGoods = $.extend(true, selectedGoods, changedGoods);
    if (maxlength - returnList.length !== 0) {
        options = {
            title: ' ',
            modal: true,
            fixed: true,
            width: 712,
            content: tpl({
                imgSrc: $_CONFIG.imgpath,
                returnList: returnList,
                maxlength: maxlength,
                changeNum: maxlength - returnList.length,
                useMeidian:true
            }),
            className: 'pop-box',
            okValue: '插入商品',
            okCls: 'pc-btn pc-btnh35 circle-pop-btn btn-default',
            btnWrapCls: 'insert-cancel',
            ok: function() {
                if ($(this.node).find('[i-id=ok]').hasClass('btn-default')) {
                    return false;
                }
                Pubsub(pubName.setPubliser.changedItem).pub(selectedGoods);

                var $span = $("[data-node='add-to-meidian']").find('span');
                if($span.hasClass('add-checkbox-checked')){
                    $GLOBAL_CONFIG['addToMeidian'] = 1;
                }else{
                    $GLOBAL_CONFIG['addToMeidian'] = 0;
                }

                dialogClosed();
            },
            cancel: function() {
                dialogClosed();
            },
            onshow: function() {

                $('[i="title"]').hide();
                $(this.node).addClass("no-border-line meidian-pop");
                
                var $popBox = $('.meidian-pop');
                var _html = addTpl();
                $popBox.find('.insert-cancel').append(_html);
                getGlobalNode();
                $addMeidian.hide();
                
                var args = {
                    changedList:changedList,
                    selectedGoods:selectedGoods,
                    $tabTitleGoods:$tabTitleGoods,
                    $listBox :$listBox,
                    $changeList:$changeList,
                    $changeNum:$changeNum, 
                    $tabTitleGoods:$tabTitleGoods,
                    $tabBodyGoods:$tabBodyGoods,
                    $tabRec:$tabRec,
                    $addMeidian:$addMeidian,
                    maxlength:maxlength,
                    addDialog:addDialog
                };

                //var obj_coll  = new CollTab($('[data-node="tab-coll"]'),args);
                //var obj_rec  = new RecTab($('[data-node="tab-rec"]'),args);
                new CollTab($('[data-node="tab-coll"]'),args);
                new RecTab($('[data-node="tab-rec"]'),args);
                //obj_coll.init();
                //obj_rec.init();

                $('body').css({
                    height: '100%',
                    overflowY: 'hidden'
                });
                
                $addMeidian.on('click',function(){
                    var $this = $(this);
                    var $span = $this.find('span');

                    if($span.hasClass('add-checkbox-checked')){
                        $span.removeClass('add-checkbox-checked').addClass('add-checkbox');
                    }else{
                        $span.addClass('add-checkbox-checked');                   
                    }
                    return false;
                })
            }
        };

    } else {
        options = {};
    }

    addDialog = dialog.create(options);
    setTimeout(function() {
        addDialog.show();
    }, 100)

};

//弹窗关闭
var dialogClosed = function() {
    $('body').css({
        height: 'auto',
        overflowY: 'auto'
    });

    changedList = [];
    $addMeidian = null;
};

module.exports = init;

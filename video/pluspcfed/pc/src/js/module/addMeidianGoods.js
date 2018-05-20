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


//公共
var maxlength = 9;
var changedList = [];
var options = {};
var degree = 1;
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
}

//判断对象非空
function isEmptyObject(obj) {
     for (var key in obj) {
        return false;
     }
     return true;
}
//封装数据，以兼容
function reWrap(result){
    var resultItems= result.items;  
    //空为好货推荐           
    var itemZero =  resultItems[0];
    var flag = isEmptyObject(itemZero && itemZero.item); 

    for(var i=0;i<resultItems.length;i++){
        var arr = resultItems[i];
        // skuId、pId、sUrl、name、salePrice
        //我的美店 商品
        if(!flag){
            //1skuId 有了
            //3sUrl 无
            var item = arr.item;
            arr.pId = item.id;
            arr.name = item.name;
            arr.salePrice = item.salePrice;
            arr.skuPrice = item.salePrice;
            arr.mainImage = item.mainImage;

        }else{
            arr.pId = arr.id;
            arr.skuId = arr.skuID;
            //2pId 无
            //3sUrl 无
            //4 name 有
            arr.salePrice = arr.price;  
            arr.skuPrice = arr.price;
            arr.mainImage = arr.imageUrl;                         
        }    
    }

    return result;
}

    function Card(){
        this.$obj = null;
       // this.$obj = $obj;
        this.pageNum = 1;
        this.$searchNormal = null;
        this.$searchLoading = null;
        this.$searchFail = null;
        this.$searchResult = null;
        this.$searchList = null;
        this.$getMore = null;
        this.isDefault = true;
        this.isGetMore = false;
        this.nodeName=null;
        this.link=null;
    }

    Card.prototype={
        constructor:Card,
        
        //获取节点
        /*
        getLink:function(){
            var obj = this.$obj;
            this.nodeName = obj.attr('data-node');
            switch(this.nodeName){
                case 'tab-coll':
                    this.link = url.get('myMshop');
                    break;
                case 'tab-rec':
                    this.link = url.get('recomment');
                    break;
            }
        },
        */
        getNode:function(){
            var obj = this.$obj;
            //提示信息
            this.$searchNormal = obj.find('[data-node="searchNormal"]');
            this.$searchLoading = obj.find('[data-node="searchLoading"]');
            this.$searchFail = obj.find('[data-node="searchFail"]');
            //盒子内容
            this.$searchResult = obj.find('[data-node="searchResultBox"]');
            this.$searchList = obj.find('[data-node="searchResultList"]');
            this.$searchListBox = this.$searchList.parent();
            //更多按钮
            this.$getMore = obj.find('[data-action="moreItem"]');
            this.nodeName = obj.attr('data-node');
        },

        //初始化进弹窗获取数据
        defaultItem:function(pagenum,link){
            var _this = this;
            pagenum = pagenum ? pagenum : 1;
            link = link?link : _this.link;
            _this.getItems(link,{
            //getItems(url.get('getCollectItem'), {
                data: {
                    pageNum: pagenum,
                    pagesize: 10
                },
                done: function(result) {
                    result =  reWrap(result);
                    
                    if(!result.items.length){
                        _this.$searchNormal.show();
                    }else{
                        _this.$searchNormal.hide();
                    }
                    var html = defaultItemlist({
                        itemlist: result.items,
                        changedList: changedList,
                        indexof: indexof
                    });

                    if (pagenum === 1) {
                        _this.$searchList.html(html);
                    } else {
                        _this.$searchList.append(html);
                    }
                }
            });
        },
        //ajax 
        getItems:function(link,options){
            var _this = this;
            if(this.pageNum === 1){
                this.$searchList.hide();
                this.$searchFail.hide();
                this.$searchLoading.show();
                this.$searchNormal.hide();
            }else{
                this.$getMore.show();
            }

            fetch.get(link, {
                data: options.data
            }).done(function(result) {
                var items = result.items;
                if(!items || (items.length < 10 && _this.pageNum !== 1) ){
                    _this.isGetMore = true;
                    _this.$getMore.show().find('span').text('没有可加载内容');
                    return false;
                }else{
                    result = reWrap(result);
                    _this.$searchResult.show().children().eq(0).show();
                    _this.$searchList.show();
                    options.done.call(this, result);
                    _this.$getMore.hide();
                    if(_this.nodeName.indexOf('rec') == -1){
                        _this.isGetMore = false;
                    }
                }

                
                

                /*if (result.items.length < 10 && _this.pageNum !== 1) {

                    _this.isGetMore = true;
                    _this.$getMore.show().find('span').text('没有可加载内容');
                }*/

                return false;
                /*if (result.code === 200) {
                    var resultItem = result.data.collections === undefined ? result.data.items : result.data.collections;
                    if ((!resultItem || resultItem.length === 0) && isDefault) {
                        if (_this.pageNum === 1) {
                            _this.$searchNormal.show().text('暂无收藏的商品，可以搜索查找！');
                        } else {
                            _this.$getMore.show().find('span').text('没有可加载内容');
                        }
                    } else if (!resultItem || resultItem.length === 0) {
                        if (_this.pageNum === 1) {
                            _this.$searchNormal.show().text('没有找到相关产品');
                            _this.$searchResult.children().eq(0).hide();
                        } else {
                            _this.$getMore.show().find('span').text('没有可加载内容');
                        }
                    } else {
                        _this.$searchResult.show().children().eq(0).show();
                        _this.$searchList.show();
                        options.done.call(this, result);
                        _this.$getMore.hide();
                        _this.isGetMore = false;

                        if (resultItem.length < 10 && _this.pageNum !== 1) {

                            _this.isGetMore = true;
                            _this.$getMore.show().find('span').text('没有可加载内容');
                        }
                    }

                    // 重新定位弹窗位置
                    // addDialog.reset();

                } else if (result.code === 881001) {
                    if (_this.pageNum === 1) {
                       _this.$searchNormal.show().text('没有找到相关产品');
                        _this.$searchResult.children().eq(0).hide();
                    } else {
                        _this.$getMore.show().find('span').text('没有可加载内容');
                    }
                } else {
                    if (_this.pageNum === 1) {
                        _this.$searchFail.show();
                    } else {
                        _this.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
                    }
                }*/
            }).fail(function() {
                if (_this.pageNum === 1) {
                    _this.$searchFail.show();
                } else {
                    _this.$getMore.show().find('span').html('数据获取失败，点击<a href="javascript:;" node-action="reget" class="reload">重新加载</a>！');
                }
            }).always(function() {

                _this.$searchLoading.hide();
            });
        },
        
        //获取更多商品
        moreItem:function(pageNum){
            var _this = this;
            getItems(_this.link, {
                data: {
                    pageNum: _this.pageNum,
                    pagesize: 10
                   // word: txt
                },
                done: function(result) {
                    var html = itemlist({
                        itemlist: result.data.items,
                        changedList: changedList,
                        indexof: indexof
                    });
                    if (result.pageCount != "1") {
                        _this.$getMore.hide();
                    }
                    if (_this.pageNum === 1) {
                        _this.$searchList.html(html);
                    } else {
                        _this.$searchList.append(html);
                    }
                }
            });
        },

        //重新获取
        reGet: function() {
            var _this = this;
            _this.$searchFail.on('click', function() {
                if (pageNum === 1) {
                    _this.$searchLoading.show();
                    _this.$searchFail.hide();
                    if (_this.isDefault) {
                        _this.defaultItem(_this.pageNum);
                    } else {
                        _this.moreItem(_this.pageNum);
                    }
                }
            });
            _this.$getMore.on('click', '[node-action="reget"]', function() {
                $(this).parent().html('<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...');
                if (_this.isDefault) {
                    _this.defaultItem(_this.pageNum);
                } else {
                    _this.moreItem(_this.pageNum);
                }
            });
        },

        //更新?
        changeItem : function() {
            var _this = this;
            if ($changeList.children().length) {
                $('[i-id=ok]').removeClass('btn-default');
            }
            _this.$searchResult.on('click', '[data-action="item"]', function() {

                var $this = $(this);
                var imgSrc = $this.find('img').attr('src'),
                    pId = $this.attr('data-pId'),
                    shopId = $this.attr('data-shopid'),
                    itemLink = $this.attr('data-link'),
                    skuId = $this.attr('data-skuId'),
                    html = '',
                    shopTag = $this.attr('data-rec-shoptag'),   //推荐商品标识
                    identification = $this.attr('data-identification');
                if (maxlength == 1) {
                    if ($changeList.children().length) {
                        $changeList.empty();
                        _this.$searchList.children("dl").removeClass("chosed-mer-true");

                    }
                    $this.addClass("chosed-mer-true");
                    if ($changeList.children().length === 0) {
                        $listBox.show();
                    }
                    changedList = [];
                    changedList.push(skuId);
                    selectedGoods = {};
                    selectedGoods[skuId] = {
                        shopId: shopId,
                        skuId: skuId,
                        PId: pId,
                        title: $(this).find('[node-data="itemTitle"]').text(),
                        img: imgSrc,
                        price: $(this).find('[node-data="itemPrice"]').text(),
                        // link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'\
                        // 融合后的新商品链接
                        link: itemLink
                        //rebate: $(this).attr('data-rebate')
                    };
                    html = '<li data-skuId="' + skuId + '" data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

                    $changeList.append(html);
                    $changeNum.text(maxlength - $changeList.children().length);
                } else {

                    if (!$(this).hasClass('chosed-mer-true')) {
                        if ($changeList.children().length >= maxlength) {
                            console.log("css error")
                            alert('最多可选取' + maxlength + '个商品');
                            return false;
                        }

                        changedList.push(skuId);
                        selectedGoods[skuId] = {
                            shopId: shopId,
                            skuId: skuId,
                            PId: pId,
                            title: $(this).find('[node-data="itemTitle"]').text(),
                            img: imgSrc,
                            price: $(this).find('[node-data="itemPrice"]').text(),
                            // link: $_CONFIG.mall_domain + 'product/' + $(this).attr('data-shopId') + '-' + pId + '.html'\
                            // 融合后的新商品链接
                            link: $(this).attr('data-link'),
                            shopTag:shopTag,
                            identification:identification
                            //rebate: $(this).attr('data-rebate')
                        };
                        $(this).addClass('chosed-mer-true');
                        html = '<li data-skuId="' + skuId + '" data-pId="' + pId + '" data-degree="' + degree + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

                        if ($changeList.children().length === 0) {
                            $listBox.show();
                        }

                        $changeList.append(html);
                        $changeNum.text(maxlength - $changeList.children().length);
                    } else {
                        var del = $changeList.find('[data-skuId="' + skuId + '"]');
                        $(this).removeClass('chosed-mer-true');
                        del.remove();

                        var id = $(this).attr('data-skuId');
                        var index = changedList.indexOf(id);
                        if (index !== -1) {
                            changedList.splice(index, 1)
                        }
                        delete selectedGoods[id];
                        if ($changeList.children().length === 0) {
                            $listBox.hide();
                        }
                        $changeNum.text(maxlength - $changeList.children().length);
                    }

                }

                if ($changeList.children().length) {
                    $('[i-id=ok]').removeClass('btn-default');
                } else {
                    $('[i-id=ok]').addClass('btn-default');
                }

                addDialog.reset();

            })
            $listBox.on('click', '[data-action="delChanged"]', function() {
                var id = $(this).closest('li').attr('data-skuId');
                var index = changedList.indexOf(id);
                if (index !== -1) {
                    changedList.splice(index, 1)
                }
                //var _this = this;
                var $node = $('[data-skuId="' + $(this).parent().attr('data-skuId') + '"]');
                $node.removeClass('chosed-mer-true');

                //$searchList.find('[data-skuId="' + $(_this).parent().attr('data-skuId') + '"]').removeClass('chosed-mer-true');
                $(this).parents('li').remove();


                delete selectedGoods[id];
                if ($changeList.children().length === 0) {
                    $listBox.hide();
                }
                $changeNum.text(maxlength - $changeList.children().length);
                if (!$changeList.children().length) {
                    $('[i-id=ok]').addClass('btn-default');
                }
            });
        },
        //加载更多
        getMoreItem : function() {
            var _this = this;
            _this.$searchListBox.on('scroll', function() {
                if (!_this.isGetMore && _this.$searchListBox.scrollTop() >= (_this.$searchList.height() - _this.$searchListBox.height())) {
                    _this.isGetMore = true;
                    _this.pageNum++;
                    if (_this.isDefault) {
                        _this.defaultItem(_this.pageNum);
                    } else {
                        _this.moreItem(_this.pageNum);
                    }
                }
            });
        }
    }


    //----------------------------------子类  我的美店选项卡------//
    function CollTab($obj){
        Card.call(this);
        this.$obj = $obj;
        this.link = url.get('myMshop');
        this.nodeStr = '[data-node="coll"]';
    }

    CollTab.prototype = new Card();
    CollTab.prototype.constructor = CollTab;
    
    CollTab.prototype.init = function(){
            this.getNode();
            this.defaultItem(1);
            this.isGetMore = true;
            this.tab();
            this.reGet();
            this.changeItem();
            this.getMoreItem();        
    }

    CollTab.prototype.tab = function(){
        var _this = this;
        $tabTitleGoods.on('click',_this.nodeStr,function(){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass();
            _this.pageNum  = 1;
            $addMeidian.hide();
            _this.getItems(_this.link,{
                data: {
                    pageNum: 1,
                    pagesize: 10
                },
                done: function(result) {
                    result = reWrap(result);
                    var html = itemlist({
                        itemlist: result.items,
                        changedList: changedList,
                        indexof: indexof
                    });
                    if (result.pageCount != "1") {
                        _this.$getMore.hide();
                    }
                    _this.$searchList.html(html);
                }
            });
            $tabBodyGoods.children("li").eq(index).show().siblings().hide();
        })
        
    }


    //----------------------------------子类  推荐商品选项卡------//
    function RecTab($obj){
        Card.call(this);
        this.$obj = $obj;
        this.link = url.get('recomment');
        this.nodeStr = '[data-node="rec"]';
    }

    RecTab.prototype = new Card();
    RecTab.prototype.constructor = RecTab;
    RecTab.prototype.init = function(){
        this.getNode();
        this.isGetMore = true;
        this.tab();
        this.reGet();
        this.changeItem();
        this.getMoreItem();      
    }
    RecTab.prototype.tab = function(){
        var _this = this;
        $tabTitleGoods.on('click',_this.nodeStr,function(){
            var index = $(this).index();
            $(this).addClass("active").siblings().removeClass();
            _this.pageNum  = 1;
            $addMeidian.hide();
            _this.getItems(_this.link,{
                done: function(result) {
                    result = reWrap(result);
                    var html = itemlist({
                        itemlist: result.items,
                        changedList: changedList,
                        indexof: indexof,
                        shopTag:1
                    });

                    if (result.pageCount != "1") {
                        _this.$getMore.hide();
                    }
                    _this.$searchList.html(html);
                }
            });
            $tabBodyGoods.children("li").eq(index).show().siblings().hide();
        })    
    }










var init = function(changedGoods, max  ) {
    var returnList = [];
    selectedGoods = {};
    // var selectedGoodsBak = {};
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
                getGlobalNode();

                var obj_coll  = new CollTab($('[data-node="tab-coll"]'));
                var obj_rec  = new RecTab($('[data-node="tab-rec"]'));
                var $popBox = $('.meidian-pop');
                obj_coll.init();
                obj_rec.init();

                $('body').css({
                    height: '100%',
                    overflowY: 'hidden'
                });
                var _html = addTpl();

                $popBox.find('.insert-cancel').append(_html);

                $addMeidian = $("[data-node='add-to-meidian']");
                $addMeidian.hide();
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
    degree++;
    $('body').css({
        height: 'auto',
        overflowY: 'auto'
    });

    changedList = [];
    $addMeidian = null;
};

module.exports = init;

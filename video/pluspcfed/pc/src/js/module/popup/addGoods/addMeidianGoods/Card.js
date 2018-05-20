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

var selectedGoods = null;
var changedList = null;
var maxlength = null;
var $listBox = null,
    $changeList = null,
    $changeNum = null,
    $tabBodyGoods = null,
    $tabRec = null,
    addDialog = null;

var usePageNum = $GLOBAL_CONFIG['trId']?1:0;    //推荐商品   门店账户 需要分页
var loadString = '<img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...';
var noMoreContent = '没有可加载内容';

function Card(args){
    this.args = args;
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
    this.useShopId = usePageNum;
    this.loadString = loadString;
    this.noMoreContent = noMoreContent;
}

Card.prototype={
    constructor:Card,
    initGlobal:function(){
        selectedGoods = this.args.selectedGoods || '';
        changedList = this.args.changedList || [];
        $listBox = this.args.$listBox;
        $changeList = this.args.$changeList;
        $changeNum = this.args.$changeNum;
        $tabBodyGoods = this.args.$tabBodyGoods;
        $tabRec = this.args.$tabRec;
        maxlength = this.args.maxlength;
        addDialog = this.args.addDialog;
    },

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
       throw error("请在在子类中覆盖");
    },
    
    //获取更多商品
    moreItem:function(pageNum){
        var _this = this;
        this.getItems(_this.link, {
            data: {
                pageNum: _this.pageNum,
                pagesize: 10
               // word: txt
            },
            done: function(result) {
                result =  reWrap(result);
                var html = itemlist({
                    itemlist: result.items,
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
            if (_this.pageNum === 1) {
                _this.$searchLoading.show();
                _this.$searchFail.hide();
                if (_this.isDefault) {
                    _this.defaultItem(_this.pageNum);
                    _this.isDefault = false;
                } else {
                    _this.moreItem(_this.pageNum);
                }
            }
        });
        _this.$getMore.on('click', '[node-action="reget"]', function() {
            $(this).parent().html(_this.loadString);
            if (_this.isDefault) {
                _this.defaultItem(_this.pageNum);
                _this.isDefault = false;
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
                html = '<li data-skuId="' + skuId + '" data-pId="' + pId + '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

                $changeList.append(html);
                $changeNum.text(maxlength - $changeList.children().length);
            } else {

                if (!$(this).hasClass('chosed-mer-true')) {
                    if ($changeList.children().length >= maxlength) {
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
                    html = '<li data-skuId="' + skuId + '" data-pId="' + pId +  '"><img src="' + imgSrc + '" alt=""><a href="javascript:;" data-action="delChanged"><em class="icon-del-pic"></em></a></li>';

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
                console.log(212)
                if (_this.isDefault) {
                    _this.defaultItem(_this.pageNum);
                    _this.isDefault = false;
                } else {
                    _this.moreItem(_this.pageNum);
                }
            }
        });
    },
    tab:function(){
        throw error("请在在子类中覆盖");
    }
}

module.exports = Card;
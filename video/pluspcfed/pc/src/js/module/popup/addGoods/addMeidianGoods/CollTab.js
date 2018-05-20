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
var addTpl = require('module/popup/addGoods/addToMeidian.tpl');
var indexof = require('lodash/indexOf');
var alert = require('module/popup/alert');

var commFunc = require('./commFunc');
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var Card = require('./Card');

//----------------------------------子类  我的美店选项卡------//
function CollTab($obj,args){
    Card.apply(this,args);
    this.args = args;
    this.$obj = $obj;
    this.link = url.get('myMshop');
    this.$nodeTab = $('[data-node="coll"]');
    this.noItemsContent = "美店中暂无商品，可在好货推荐中添加！";
    this.init();
}

(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  CollTab.prototype = new Super();
})();

CollTab.prototype.constructor = CollTab;

CollTab.prototype.init = function(){
    this.initGlobal();
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
    _this.$nodeTab.on('click',function(){
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass();
        _this.pageNum  = 1;
        _this.args.$addMeidian.hide();
        _this.$getMore.hide();
        _this.getItems(_this.link,{
            data: {
                pageNum: 1,
                pagesize: 10
            },
            done: function(result) {
                result = reWrap(result);
                var html = itemlist({
                    itemlist: result.items,
                    changedList: _this.args.changedList,
                    indexof: indexof
                });
                if (result.pageCount != "1") {
                    _this.$getMore.hide();
                }
                _this.$searchList.html(html);
            }
        });
        _this.args.$tabBodyGoods.children("li").eq(index).show().siblings().hide();
    })
    
}

//ajax 
CollTab.prototype.getItems=function(link,options){
    var _this = this;
    if(this.pageNum === 1){
        this.$searchList.hide();
        this.$searchFail.hide();
        this.$searchLoading.show();
        this.$searchNormal.hide();
    }else{
        this.$getMore.show().find('span').html(this.loadString);
    }

    fetch.get(link, {
        data: options.data
    }).done(function(result) {
        var items = result.items;

        if(!items){
            if (_this.pageNum !== 1){
                _this.$getMore.show().find('span').text(_this.noMoreContent);
            }else{
                _this.$searchNormal.text(_this.noItemsContent).show();
            }
            _this.isGetMore = true;
            return false;
        }else{
            
            result = reWrap(result);
            _this.$searchResult.show().children().eq(0).show();
            _this.$searchList.show();
            options.done.call(this, result);
            _this.$getMore.hide();
            _this.isGetMore = false;

            if(items.length < 10 ){
                _this.$getMore.show().find('span').text(_this.noMoreContent);
                _this.isGetMore = true;
                return false;
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
}

module.exports = CollTab;
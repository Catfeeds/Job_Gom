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

var pubName = require('io/channel');
var indexof = require('lodash/indexOf');
var alert = require('module/popup/alert');

var commFunc = require('./commFunc');
var isEmptyObject = commFunc.isEmptyObject;
var reWrap = commFunc.reWrap;

var Card = require('./Card');

//----------------------------------子类  推荐商品选项卡------//
function RecTab($obj,args){
	Card.apply(this,args);
	this.args = args;
	this.$obj = $obj;
	this.link = url.get('recomment');
	this.$nodeTab = $('[data-node="rec"]');
	this.noItemsContent = '暂无推荐商品';
	this.init();
}

(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Card.prototype;
  //将实例作为子类的原型
  RecTab.prototype = new Super();
})();

RecTab.prototype.constructor = RecTab;
RecTab.prototype.init = function(){
	this.initGlobal();
	this.getNode();
	this.isGetMore = true;
	this.tab();
	this.reGet();
	this.changeItem();
	this.getMoreItem();      
}
RecTab.prototype.tab = function(){
	var _this = this;
	_this.$nodeTab.on('click',function(){
		var fetchArg;
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass();
		_this.pageNum  = 1;
		_this.args.$addMeidian.show();

		if(_this.useShopId){
			fetchArg = {
				type : 1,
				pageNum: 1,
                pagesize: 10
			}
		}else{
			fetchArg={
				type:0
			}
		}
		
		_this.getItems(_this.link,{
			data: fetchArg,
			done: function(result) {
				result = reWrap(result);
				var html = itemlist({
					itemlist: result.items,
					changedList: _this.args.changedList,
					indexof: indexof,
					shopTag:1
				});

				if(!_this.useShopId){
					_this.$getMore.hide();
				}
				if(result.items.length < 10){
					_this.$getMore.show().find('span').text(_this.noMoreContent);
	                _this.isGetMore = true;
	                return false;
				}
				/*if (result.pageCount != "1") {
					_this.$getMore.hide();
				}*/
				_this.$searchList.html(html);
			}
		});
		_this.args.$tabBodyGoods.children("li").eq(index).show().siblings().hide();
	})    
}

//ajax 
RecTab.prototype.getItems=function(link,options){
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
           

            if(items.length < 10 ){
                _this.$getMore.show().find('span').text(_this.noMoreContent);
                _this.isGetMore = true;
                return false;
            }

            if(!_this.useShopId ){
                _this.isGetMore = true;
            }else{
            	 _this.isGetMore = false;
            }
        
        }
        return false;
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

module.exports = RecTab;
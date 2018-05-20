
var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint');
var pageNum = 2;
var featuredList = null;
//添加html
function appendHtml(data, type, callback){
	var html = '';
    for( var i = 0, len = data.length; i < len; i++ ){

      var url = 'https://item.gome.com.cn/'+ data[i].id +'-' + data[i].skuID +'.html?'+ (data[i].trId ? 'stid='+ data[i].trId : '' ) + '&mid='+ $_CONFIG.shopId;
    	html += `<li>
                  	<div class="clearfix user-goods-good">
                  		<a href="`+ url +`" target="_blank">
                  			<img src="`+ data[i].imageUrl  +`">
                  		</a>
                  	</div>
                  	<div class="clearfix user-goods-goods">`;
        if( data[i].flag === 1 ){
        	html += '<span class="user-goods-main">自营</span>';
        }else if( data[i].flag === 2 ){
        	html += '<span class="user-goods-rival">海外购</span>';
        }else if( data[i].flag === 3 ){
          html += '<span class="user-goods-shop">门店</span>';
        }
        html +=     `<a href="`+ url +`" target="_blank" title="`+ data[i].name +`">`+ data[i].name  +`</a>
                  	</div>
                  	<div class="user-goods-priceBox clearfix">
                  		<span class="user-goods-price">￥`+ /*(type === '0' ? Number(data[i].price, 10).toFixed(2) : data[i].price)*/ data[i].price+` </span>
                  	</div>
                  	<div class="user-goods-info clearfix">
                      	<span class="user-goods-ret">
                      		<span>佣金</span>
                      		<span class="user-goods-rnum">最高￥`+ (parseInt(data[i].commission) / 100).toFixed(2) +`</span>
                      	</span>
                    </div>
                    <div class="up-btn">
                      <a class="user-goods-`+ (data[i].onShelf ? 'down': 'up') +` J-good-sold" href="javascript:;" data-itemid="`+ data[i].id  +`" data-skuid="`+ data[i].skuID  +`" data-identification="`+ data[i].identification  +`" data-status="`+ Number(data[i].onShelf) +`"> `+(data[i].onShelf ? "已" : "") + `上架</a>
                    </div>
                </li>`;
    }
    $('.J-goods-list').append(html);
    //图片加载
    require('./imgError').init();
    callback.call();
}

module.exports = {
	init: function(){
		$('.J-goods-getMore').on('click', function(){
			var _this = $(this);
			if( !_this.find('.user-goods-moreLoding').length && !_this.hasClass('user-goods-normal') ){
				_this.addClass('more-loading');
				_this.html('<span class="user-goods-moreLoding">加载中...</span>');
                if( !featuredList && $_CONFIG.type !== 0 ){
                    fetch.get( url.get('hotGoods') + $_CONFIG.type + '&pageNum=' + pageNum, {}).then(function(result){
                        if(result){
                            if( $_CONFIG.type !== '0' ){
                                appendHtml(result.items, $_CONFIG.type, function(){
                                    var loadHtml = result.items.length == 0 ? '没有更多商品了' : '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
                                    var normal = result.items.length == 0 ? 'user-goods-normal' : '';
                                    _this.html(loadHtml).addClass(normal);
                                    pageNum ++;
                                });
                            }else{

                                featuredList = result;
                                featuredList.items.splice(0, 18);
                                appendHtml(featuredList.items.splice(0, 18), $_CONFIG.type, function(){
                                    var loadHtml = '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
                                    _this.html(loadHtml);
                                });
                            }
                        }
                    }, function(result){
                        hint.init('数据获取失败，请重试');
                        _this.html('<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>');
                    });
                }else{
                	console.log("2")
                    appendHtml(featuredList.items.splice(0, 18), $_CONFIG.type, function(){
                        var loadHtml = featuredList.items.length == 0 ? '没有更多商品了' : '<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';
                        var normal = featuredList.items.length == 0 ? 'user-goods-normal' : '';
                        _this.html(loadHtml).addClass(normal);
                    });
                }
			}
		});
	}
}

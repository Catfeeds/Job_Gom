
var fetch = require('io/fetch');
var url = require('io/url');
var shareTimer = null;
var $shareBox = $('.J-share-sWrap');
var $rightContent = $('.J-right-content');
var shopName = $('.J-shopSetting-shopName').text();
var shopInfo = $_CONFIG.shopDescription || '我发现了前所未有的好店，不如，你也来逛逛？';
var $shopList = $('.J-shopSetting-list');
var sharePic = [$('.J-shopSetting-shopLogo').attr('src')];
var kid = '';
//分享弹层显示
function showShare(obj,callback){
	//显示分享弹窗
	shareTimer&&clearTimeout(shareTimer);
	var _this = $(obj);
	var boxLeft = $rightContent.offset().left;
	var boxTop = $rightContent.offset().top;
	var iconLeft = _this.offset().left;
	var iconTop = _this.offset().top;
	var iconWidth = _this.width();
	var iconHeight = _this.height();
	$shareBox.css({
		top: iconTop - boxTop + iconHeight + 10,
		left: iconLeft - boxLeft + iconWidth/2 - 118
	});
	if(_this.hasClass('J-shopSetting-share')){
		$shareBox.css('display') === 'none' && $shareBox.show();
		callback.call(obj, getShareContent($(obj)));
	}else{
		if( !_this.attr('data-kid') ){
			fetch.get( url.get('getKid'), {
				itemId: _this.attr('data-itemId'),
				skuId: _this.attr('data-skuId'),
				shopId: $_CONFIG.shopId
			}).then(function(result) {
				if(result){
					_this.attr('data-kid', result.kid);
				}

				$shareBox.css('display') === 'none' && $shareBox.show();
				callback.call(obj, getShareContent($(obj)));
			}, function(){

				$shareBox.css('display') === 'none' && $shareBox.show();
			})

		}else{

			$shareBox.css('display') === 'none' && $shareBox.show();
			callback.call(obj, getShareContent($(obj)));
		}
	}

}
//获取分享数据
function getShareContent(obj){
	var shareContent = {};
	if(obj.hasClass('J-shopSetting-share')){
		var $shopItems = $shopList.children();
		if( $shopItems.length > 0 ){
			var len = $shopItems.length > 3 ? 3 : $shopItems.length;
			for( var i = 0; i < len; i++ ){
				sharePic.push( (/^http/.test($shopItems.eq(i).find('.J-shopSetting-goodsImg').attr('src')) ? "" : "http:") + $shopItems.eq(i).find('.J-shopSetting-goodsImg').attr('src') );
			}
		}
		shareContent = {
			title: shopName,
			info:  shopInfo,
			wurl: obj.attr('share-url'),
			url: obj.attr('data-url'),
			pic: sharePic
		}
	}else{
		var $list = obj.parents('li').eq(0);
		shareContent = {
			title: $list.find('.J-shopSetting-goodName').text(),
			wurl: obj.attr('share-url') + '&kid=' + obj.attr('data-kid'),
			pic: [$list.find('.J-shopSetting-goodsImg').attr('src')],
			url: $list.find('.J-shopSetting-goodName').attr('href') + '&kid=' + obj.attr('data-kid')
		}
	}
	return shareContent;
}
module.exports = {
	init: function(callback){
		$rightContent.on('mouseenter', '.J-shopSetting-share,.J-shopSetting-shareBtn', function(){
			showShare(this,callback);
			// callback.call(this, getShareContent($(this)));
		}).on('mouseleave', '.J-shopSetting-share,.J-shopSetting-shareBtn', function(){
			shareTimer = setTimeout(function(){
				$shareBox.hide();
			}, 200);
		});
		$shareBox.hover(function(){
			clearTimeout(shareTimer);
		},function(){
			$shareBox.hide();
		});
	}
}

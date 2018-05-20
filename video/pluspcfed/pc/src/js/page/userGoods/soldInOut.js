
var fetch = require('io/fetch');
var hint = require('module/hint');
var url = require('io/url');
var checkLoginStatus = require('module/checkLoginStatus');
var loginPop = require('module/popup/login');

var $goodsList = $('[data-node=goodsList]');
var $putWay = $('[data-node="rapid-putaway"]');

function allSold(){//判断商品是否全部上架
	var allSold = true;
	var $goodSolds = $goodsList.find('[data-node="good-sold"]');
	$goodSolds.each(function(idx,item){
		if($(item).attr('data-status') == 0){//有未上架商品
			allSold = false;
			return false;
		}
	})
	return allSold;
}
function soldFn(_this,isReload){
	if( !_this.hasClass('solding') ){
		_this.addClass('solding');
		var status =  _this.attr('data-status');
		status === '0' ? _this.text('上架中...') : _this.text('下架中...');
		fetch.get( url.get('soldInOut'), {
            data: {
            	shopId: $_CONFIG.shopId,
            	itemId: _this.attr('data-itemId'),
            	skuId: _this.attr('data-skuId'),
            	identification: _this.attr('data-identification'),
            	status: status
            }
        }).then(function(result) {
        	if(isReload){//是否需要刷新页面，未登录状态点上架情况
        		window.location.reload();
        		return;
        	}
        	if( result&&result.code === 200 ){
        		var notcie =  status === '0' ? '已上架' : '上架';
        		var className =  status === '0' ? 'user-goods-down J-good-sold' : 'user-goods-up J-good-sold';
        		var _status =  status === '0' ? '1' : '0';	
        		$('[data-itemId="'+ _this.attr('data-itemId') +'"]').text(notcie).attr('class', className).attr('data-status', _status);
        	}else if(result.code == 881011){//未登录
                loginPop(function(){
                    soldFn(_this,1);
                })
            }else if(result.code == 713001 ){//没有开通美店
                window.location.href = $GLOBAL_CONFIG['meidian_domain']+'admin';
            }else{
				hint.init('抱歉，操作失败，请重试');
				status === '0' ? _this.text('上架') : _this.text('已上架');
        	}
			_this.removeClass('solding');
			if(allSold()){//判断是否全部上架
				$putWay.addClass('putaway');
			}else{
				$putWay.removeClass('putaway');
			}
        }, function(){
			hint.init('抱歉，操作失败，请重试');
			_this.removeClass('solding');
        });
	}
}
module.exports = {
	init: function(){
		$('.J-goods-list').on('click', '.J-good-sold', function(){
			var _this = $(this);
			var loginFlag = checkLoginStatus();
			if(!loginFlag){
				loginPop(function(){
					soldFn(_this,1);
				});
			}else{
				soldFn($(this));
			}
		});
	}
}
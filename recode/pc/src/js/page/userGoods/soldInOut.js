
var fetch = require('io/fetch');
var hint = require('module/hint');
var url = require('io/url');
module.exports = {
	init: function(){
		$('.J-goods-list').on('click', '.J-good-sold', function(){
			var _this = $(this);
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
		        	if( result&&result.code === 200 ){
		        		var notcie =  status === '0' ? '已上架' : '上架';
		        		var className =  status === '0' ? 'user-goods-down J-good-sold' : 'user-goods-up J-good-sold';
		        		var _status =  status === '0' ? '1' : '0';		        		
		        		$('[data-itemId="'+ _this.attr('data-itemId') +'"]').text(notcie).attr('class', className).attr('data-status', _status);
		        	}else{
						hint.init('抱歉，操作失败，请重试');
						status === '0' ? _this.text('上架') : _this.text('已上架');
		        	}
					_this.removeClass('solding');
		        }, function(){
					hint.init('抱歉，操作失败，请重试');
					_this.removeClass('solding');
		        });
			}
			
		});
	}
}
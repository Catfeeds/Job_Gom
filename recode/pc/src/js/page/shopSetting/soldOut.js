//删除确认弹窗
var Dialog = require('dialog');
var fetch = require('io/fetch');
var url = require('io/url');
var pager = require('./pager');
var hint = require('module/hint');

module.exports = {
	init: function(){
		$('body').on('click', '.J-shopSetting-delBtn', function(){
			var _this = $(this);
			var delDialog = Dialog({
				title: '删除商品？',
		        modal: true,
		        fixed: true,
		        content: '<div class="del-pop-p">下架商品后，可进入添加商品中重新上架</div>',
		        className: 'pop-box',
		        okValue: '确认',
		        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
		        cancalValue : '取消',
		        btnWrapCls: 'insert-cancel',
		        cancel: function(){},
		        ok: function() {
		        	fetch.get( url.get('soldInOut'), {
			            data: {
			            	shopId: $_CONFIG.shopId,
			            	itemId: _this.attr('data-itemId'),
			            	skuId: _this.attr('data-skuId'),
			            	identification: _this.attr('data-identification'),
			            	status: _this.attr('data-status')
			            }
			        }).then(function(result) {
			        	if( result&&result.code === 200 ){
			        		var num = parseInt($('.J-shopSetting-number').text(), 10);
			        		_this.parents('li').eq(0).remove();
			        		$('.J-shopSetting-number').text( num - 1 );
			        		pager.getItems(window.currentPage);
			        	}else{

    						hint.init('抱歉，操作失败，请重试');
			        	}
			        }, function(){
    					hint.init('抱歉，操作失败，请重试');
			        });
		        }
			});
			delDialog.show();
		});
	}
}
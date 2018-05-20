
var	fetch = require('io/fetch'),
	url = require('io/url'),
	dateFormat = require('utils/fecha'),
	moreDiscuss = require('../../widget/goodInfo/moreDiscuss.tpl');

var $discussBox = $( '[data-node="discussBox"]' );	
var	$moreBtn = $( '[data-action="moreDiscuss"]' );
var	$discussTitle = $( '[data-node="discussTitle"]' );

var	pageNum = 1;

var getDiscuss = function( obj ){
		var proId = $GLOBAL_CONFIG.productId;
		fetch.get( url.get( 'getMoreDiscuss' ), {
					data : {
						itemId : proId,//$GLOBAL_CONFIG.productId,
						pageNum : pageNum
					}
				}).done(function( result ){
					if( result.code === 200 ){
						var data = result.data.itemComments;
						if( data.length === 0 ){
							//$GLOBAL_CONFIG['pcImage']
							obj.html( '<span>没有可加载内容</span>' );
							if( pageNum === 1 ){
								$discussTitle.hide();
								$discussBox.hide()
								obj.parent().hide();
							} 
						}else{
							obj.parent().show();
							for( var i = 0, len = data.length; i < len; i++ ){
								
								data[i].createTime  = dateFormat.format(new Date( data[i].createTime ), 'YYYY年MM月DD日');
								data[i].replyTime  = data[i].replyTime !==undefined && dateFormat.format(new Date( data[i].replyTime ), 'YYYY年MM月DD日');
							}
							if( data.length < 10  ){
								if( pageNum !== 1 ){
									obj.html( '<span>没有可加载内容</span>' ).addClass( 'disabled' );
								}else{
									obj.hide();
								}
								

							} else{
								obj.html( '<span><img src="' + $_CONFIG.imgpath + '/images/circle/small-logo.png">点击加载更多<em class="icon icon-right"></em></span>' );
								obj.removeClass( 'disabled' );
								pageNum++;
							}
							discussList = moreDiscuss({
								data : data
							})
							$discussBox.append( discussList );
							
						}
					}
				})
	}
var init = function( ){

	var offTop =  $discussBox.offset().top;
	var sT = $(window).scrollTop();
	var isFirst = true;
	var wH = $(window).height();

	if( sT + wH > offTop - 50 ){
		getDiscuss( $moreBtn );
	}else{
		$(window).on('scroll',function(){
			sT = $(window).scrollTop();
			if( sT + wH > offTop - 50 && isFirst){
				isFirst = false;
				getDiscuss( $moreBtn );
			}
		});
	}

	
	$moreBtn.on( 'click', function(){
		var _this = this,
			discussList;
		if( !$( _this ).hasClass( 'disabled' ) ){
			$( _this ).addClass( 'disabled' ).html( '<span><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif">正在加载...</span>' );
			getDiscuss( $(this) );
		}
	});


	




}
module.exports = init;
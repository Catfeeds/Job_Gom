
var fetch = require('io/fetch'),
	url = require('io/url');
var init = function( productId ){
	var $goodInfoBox = $( 'div[data-node="topGoodInfo"]' ),
		$getAddressTopBox = $goodInfoBox.find( '[data-action="setAddress"]' ),
		$getAddress = $getAddressTopBox.find( '[data-action="setAddressTopBox"]' ),
		$getAddressTops = $getAddress.find( '[data-node="addressTop"]' ),
		$getAddTopHas = $getAddress.find( '[data-aid]' ),
		$setAddressBox = $goodInfoBox.find( '[data-node="setAddressbox"]' ),
		$setAddressTab = $setAddressBox.find( '[data-action="setAddressTab"]' ),
		$setAddressList = $setAddressBox.find( '[data-node="setAddressList"]' ),
		$cargo = $goodInfoBox.find( '[data-node="iscargo"]' );
	var $repert = $goodInfoBox.find( '[data-node="repert"]' );
	var isShow = false;
	var defaultList = [],
		changeList = [],
		index = $getAddTopHas.length-1,
		isClick = true,
		checked = true;
 	//遍历插入数据
 	for( var i = 0, len = $getAddTopHas.length; i < len; i++){
 		defaultList[i]={};
		defaultList[ i ].levelId = $getAddTopHas.eq( i ).attr( 'data-aid' );
		defaultList[ i ].levelName = $getAddTopHas.eq( i ).text();
	}
	//配送地址
	$getAddressTopBox.on( 'click', function( e ){
		e.stopPropagation();
		var _this = this;
		if( !isShow  ){

			isShow = true;
			$getAddTopHas = $getAddress.find( '[data-aid]' );
			var pId = $getAddTopHas.eq( $getAddTopHas.length-2 ).attr( 'data-aid' );
			addAjax( pId, function( result ){
				var _index = ( ($getAddTopHas.length-1 < 0 ) ? 0 : $getAddTopHas.length-1 );
				$setAddressTab.removeClass( 'selected-span' )
				.eq( _index ).addClass( 'selected-span' ).nextAll().remove();
				$setAddressBox.css( 'display' ) === 'none' && $setAddressBox.show();
				setAddressList( result, _index );  
			});
		}
	})
	
	

	//弹窗组织默认事件
	$setAddressBox.on( 'click', function( e ){
		e.stopPropagation();
	})
	//市区切换
	.on( 'click', '[data-action="setAddressTab"]', function( e ){
		e.stopPropagation();
		index = $getAddressTopBox.find( '[data-action="setAddressTab"]' ).index( $( this ) );
		var pId;
		if( $(this).children().eq(0).text() !== '请选择' ){
			$setAddressTab.removeClass( 'selected-span' ).eq( index )
			.addClass( 'selected-span' );
			pId = $( this ).prev().attr( 'data-aid' ) || 0;
			if( index === 0 ){
				if( $setAddressList.eq(index).children().length === 0 ){


					addAjax( pId, function( result ){
						setAddressList( result, index );
					});
					
				}else{
					$setAddressList.hide().eq( index ).show();
				}
			}else{
				addAjax( pId, function( result ){
					setAddressList( result, index );
				});
			}
		}
	})
	//市区列表切换
	.on( 'click', 'li', function( e ){
		e.stopPropagation();
		if( isClick ){
			isClick = false;
			var pId = $( this ).attr( 'data-id' ),
				addressName = $(this).text(),
				listIndex = $setAddressList.index( $( this ).parents( 'ul' ) );
			checked = listIndex === 0 ? false : true;
			$setAddressTab.removeClass( 'selected-span' ).eq( listIndex ).nextAll().remove();
			$setAddressTab.eq( listIndex ).children().eq( 0 ).text( addressName );
			$setAddressTab.eq( listIndex ).attr( 'data-aid',  $( this ).attr( 'data-id' ));

			addAjax( pId, function( result ){
				$setAddressTab.removeClass( 'selected-span' ).eq( listIndex + 1 ).addClass( 'selected-span' );
				if( listIndex !== $setAddressList.length - 1 ){

					setAddressList( result , listIndex + 1);
					$setAddressTab.eq(0).parent().append( '<a href="javascript:;" data-action="setAddressTab" class="selected-span">'
					                          +'<span data-node="tabName">请选择</span>'
					                          +'<em class="icon icon-down"></em>'
					                        +'</a>' );
					$setAddressTab = $setAddressBox.find( '[data-action="setAddressTab"]' );
					changeList[ listIndex ] = {};
					changeList[ listIndex ].levelId = pId;
					changeList[ listIndex ].levelName = addressName;
				}else{
					changeList[ listIndex ] = {};
					changeList[ listIndex ].levelId = pId;
					changeList[ listIndex ].levelName = addressName;
					getProductStock( listIndex );
				}

				
			});
			
		}
	})
	//关闭按钮
	.on( 'click', '[data-action="addressClose"]', function( e ){
		e.stopPropagation();
		if( $setAddressBox.css( 'display' ) !== 'none' ){

			getProductStock();

			$setAddressBox.hide();
		}
	});
	//设置地址列表
	function setAddressList( data, index ){
		isClick = true;
		var html = '';
		for( var i = 0, len = data.nodes.length; i < len; i++ ){
			html += '<li data-id="' + data.nodes[i].id + '">' + data.nodes[i].name + '</li>'
		}
		$setAddressList.hide().eq(index).show().html( html );
	}

	//请求数据，判断是否有货

	function getProductStock(){
		if( changeList.length  > 2 && checked ){
			for( var i = 0, len = changeList.length; i < len; i++ ){
	            if( changeList[i] !== undefined )defaultList[ i ] = changeList[ i ];
			}		
			var len = defaultList.length,delNum = 0,changeIndex = 0;
			defaultList.splice( changeList.length , defaultList.length - changeList.length);
			
			/*if( changeList[2] !== undefined ){

				fetch.get( $_CONFIG.mall_domain + url.get( 'getProduct' ), {
					data : {
						itemId : productId,
						regionId : defaultList[2].levelId

					}
				}).done(function( result ){
					var stock = $repert.text() > 0
					if( result && result.success ){
						if( result.data.result ){
							if( stock ){
								$cargo.text( '有货' );
							}else{
								$cargo.text( '无货' );
							}
						}else{
							$cargo.text( '不可配送' );
						}
						
					}else if( result.code === 881012 ){
						$cargo.text( result.message )
					}
				});

			}*/
			changeList = [];
		}
		
		var  html = '',htmlTab = '';
		for( var i = 0, len = defaultList.length; i < len; i++ ){
            html += '<span data-aid="'+ defaultList[i].levelId +'" data-node="addressTop">'+ defaultList[i].levelName +'</span>'
			htmlTab += '<a href="javascript:;" class="" data-aid="'+ defaultList[i].levelId +'" data-action="setAddressTab">'
                      +'<span data-node="tabName">'+ defaultList[i].levelName +'</span>'
                      +'<em class="icon icon-down"></em>'
                    +'</a>';
		}	
		$getAddress.html( html );
		$getAddressTops =  $getAddress.find( '[data-aid]' );
		$setAddressBox.children().eq(1).html(htmlTab);
		$setAddressTab = $setAddressBox.find( '[data-action="setAddressTab"]' );
			
		isClick = true;
		$setAddressBox.hide();
		
		
	}
	function addAjax(id, callback, failCallback) {
        if( window.localStorage ){
            var local = JSON.parse( localStorage.getItem( 'address' + id ) );
            var isLose;
            if( local !== null ){
            	if( local.hasOwnProperty( 'time' ) ){
            		isLose = local.time < +new Date();
            	}
            }else{
            	isLose = true;
            }
            if( isLose ){
                fetch.get(url.get('getAddress') + id, {}).done(function(result) {
                    if (result.code === 200) {
                        callback.call(null, result.data);
                        var addressLocal = {
                            data : result.data,
                            time : +new Date() + 604800000
                        }
                        localStorage.removeItem( 'address' + id );
                        localStorage.setItem( 'address' + id, JSON.stringify( addressLocal ) );
                    }
                }).fail(function(xhr, error) {
                    console.log(xhr, error);
                }).always(function(){
                	if( isShow ){
                		isShow = false;
                	}
                });
            }else{
                callback.call(null, local.data );
            	if( isShow ){
            		isShow = false;
            	}
            }
        }else{
            fetch.get(url.get('getAddress') + id, {}).done(function(result) {
                if (result.code === 200) {
                    callback.call(null, result.data);
                }
            }).fail(function(xhr, error) {
                console.log(xhr, error);
            }).always(function(){
            	if( isShow ){
            		isShow = false;
            	}
            });
        }
    }

	$( document ).on( 'click', function( e ){
		e.stopPropagation();
		if( $setAddressBox.css( 'display' ) !== 'none' ){

			getProductStock();

			$setAddressBox.hide();
		}
	});
}


module.exports = init;
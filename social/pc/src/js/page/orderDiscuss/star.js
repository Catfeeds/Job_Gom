/**
 * 评价星级
 * @author zhaodonghong
 */



var $disTable = $('[data-node="orderDisTable"]'); //table
var $starBox = $disTable.find('[data-node="orderStar"]');


var index = 4;
var oldIndex = 4;
var $stars = null;
var timer = null;


var setStar = function( index, obj ){

	$stars.removeClass( 'active' );
	$stars.eq( index ).addClass('active').prevAll().addClass( 'active' );
	obj.nextAll().find( 'span' ).text( index + 1 );

};
var init = function(){
	$starBox.on('mouseenter', '[data-node="star"]', function(){
		clearTimeout( timer );
		$stars = $(this).parent().find( '[data-node="star"]' );
		index = $stars.index( $(this) );
		setStar( index, $(this) );

	}).on( 'mouseleave', '[data-node="star"]', function(){

		var _this = $( this );
		$stars = $(this).parent().find( '[data-node="star"]' );

		timer = setTimeout(function(){

			setStar( oldIndex, _this );
			
		},200);
	}).on( 'click', '[data-node="star"]', function(){
		$stars = $(this).parent().find( '[data-node="star"]' );
		oldIndex = $stars.index( $(this) );
		index = oldIndex;
		setStar( oldIndex, $(this) );
	});
};

module.exports = {
	init : init
}